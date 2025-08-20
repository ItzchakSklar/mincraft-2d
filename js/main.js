// ===== יצירת עולם רנדומלי סביר =====
// טילים אפשריים: "sky", "grass", "dirt", "rock", "tree"
// תלווה לוגיקת המשחק/כלים שהגדרת

export function createRandomWorld(
  width = 50,
  height = 100,
  opts = {}
) {
  // ---- פרמטרים עם ברירות מחדל ----
  const {
    seed = null,          // מחרוזת/מספר ליציבות רנדום
    groundBase = Math.floor(height * 0.75), // גובה קרקע ממוצע
    groundVar = 2,        // תנודות בגובה הקרקע (random walk)
    rockChance = 0.18,    // סיכוי לסלעים בשכבות עמוקות
    rockDepthStart = 3,   // כמה בלוקים מתחת ל-top grass להתחיל לשים סלעים
    treeChance = 0.14,    // סיכוי להצבת עץ על grass
    treeMinGap = 2,       // רווח מינימלי בין עצים
    treeMinH = 2,         // גובה עץ מינימלי
    treeMaxH = 4          // גובה עץ מקסימלי
  } = opts;

  // ---- RNG עם seed (פשוט ומהיר) ----
  const rng = makeRng(seed);

  // ---- 1) גובה הקרקע לכל עמודה (random walk) ----
  const groundHeights = new Array(width);
  let h = clamp(groundBase, 2, height - 1);
  for (let x = 0; x < width; x++) {
    // צעד למעלה/למטה/ללא שינוי, אבל מוגבל ב-groundVar ובגבולות מפה
    const step = (rng() < 0.5 ? -1 : 1) * (rng() < 0.5 ? 0 : 1);
    h = clamp(h + clamp(step, -groundVar, groundVar), 2, height - 1);
    groundHeights[x] = h;
  }

  // ---- 2) בניית מפה: sky מעל, grass עליונה, dirt מתחת ----
  const world = Array.from({ length: height }, () => Array(width).fill("sky"));

  for (let x = 0; x < width; x++) {
    const gh = groundHeights[x];         // y של פני הקרקע (0 למעלה)
    // תא ה-top של הקרקע: grass
    world[gh][x] = "grass";
    // מתחתיו עד תחתית המפה: dirt (אח"כ נוסיף rock חלקית)
    for (let y = gh + 1; y < height; y++) {
      world[y][x] = "dirt";
    }
  }

  // ---- 3) הזרקת "עורקי" סלעים בתוך ה-dirt ----
  // נשתמש ברעיון קל: סיכוי גבוה יותר לעומק, ומעט דביקות (שכנים ממשיכים)
  for (let x = 0; x < width; x++) {
    const gh = groundHeights[x];
    for (let y = gh + rockDepthStart; y < height; y++) {
      if (world[y][x] !== "dirt") continue;
      // הסתברות לסלע, מעט מושפעת משכנים כדי ליצור “ורידים”
      const neighborRock =
        isRock(world, x - 1, y) || isRock(world, x + 1, y) ||
        isRock(world, x, y - 1) || isRock(world, x, y + 1);
      const chance = neighborRock ? rockChance * 1.8 : rockChance;
      if (rng() < chance) world[y][x] = "rock";
    }
  }

  // ---- 4) שתילת עצים על grass עם רווח מינימלי ----
  // נשמור את העמודה האחרונה שבה שתלנו עץ למניעת צפיפות
  let lastTreeX = -Infinity;
  for (let x = 1; x < width - 1; x++) {
    const gh = groundHeights[x];
    // תנאים: התא על פני הקרקע grass, התא מעל sky, עומדים במרחק מינימלי
    if (
      world[gh][x] === "grass" &&
      world[gh - 1]?.[x] === "sky" &&
      x - lastTreeX > treeMinGap &&
      rng() < treeChance
    ) {
      const treeH = randInt(rng, treeMinH, treeMaxH);
      // בניית גזע אנכי מעלה: תמיד מעל ground, לא לצאת מתחום
      for (let i = 1; i <= treeH; i++) {
        const y = gh - i;
        if (y < 0) break;
        world[y][x] = "tree";
      }
      lastTreeX = x;
    }
  }
  return world;

  // ---------- עזרי RNG/בדיקות ----------
  function makeRng(seed) {
    if (seed == null) return Math.random;
    // המרה למספר
    let s = typeof seed === "number" ? seed : hashStr(seed);
    // LCG בסיסי וקצר
    return function () {
      s = (s * 1664525 + 1013904223) % 0x100000000;
      return (s >>> 0) / 0x100000000;
    };
  }

  function hashStr(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < String(str).length; i++) {
      h ^= String(str).charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function randInt(rng, min, max) {
    // כולל שני הקצוות [min, max]
    return Math.floor(rng() * (max - min + 1)) + min;
  }

  function isRock(world, x, y) {
    return world[y]?.[x] === "rock";
  }
}
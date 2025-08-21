let activeTool;



const ToolsContainer = document.getElementById("tools_container")
ToolsContainer.addEventListener("click", (event) => {
    /* TODO - should verify some other details? */

    activeTool = event.target.name;                                // save the name of the chosen tool
    console.log(activeTool)
    document.body.style.cursor = `url('assets/tools/${activeTool}.png') 16 16, auto`;  // transform cursor to chosen tool icon 
})

// assets/tools/${activeTool}.png
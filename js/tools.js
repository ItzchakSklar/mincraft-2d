let activeTool;



const ToolsContainer = document.getElementById("tools_container")
ToolsContainer.addEventListener("click", (event) => {
    /* TODO - should verify some other details? */

    activeTool = event.target.name;                                // save the name of the chosen tool

    document.body.style.cursor = `url('${activeTool}.png')`;        // pin the tool icon to cursor

})

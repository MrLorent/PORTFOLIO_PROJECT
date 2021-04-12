"use strict";

// EXEMPLE :
async function getCategoryProjects(idCategory){
    const response = await fetch('php/galleryRouter.php/category/'+idCategory);
    const projects = await response.json();
    
    console.log(projects);
    return projects;
}
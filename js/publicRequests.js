"use strict";

// EXEMPLE :
// async function getPlanetDetails(planetId){
//     const response = await fetch('./SERVER/router.php/planet/'+planetId);
//     const planets = await response.json();
    
//     console.log(planets);
//     return planets;
// }

// Fonction de test de getAllProjects
async function getAllCategories(){
    const response = await fetch('php/categoriesRouter.php/categories/');
    const Allcategories = await response.json();
    
    console.log(Allcategories);
    return Allcategories;
}

async function getAllProjects(){
    const response = await fetch('php/galleryRouter.php/projects/');
    const projects = await response.json();
    
    console.log(projects);
    return projects;
}

async function getAllProjectsCategories(){
    const response = await fetch('php/galleryRouter.php/categories/');
    const categories = await response.json();
    
    console.log(categories);
    return categories;
}

async function getProject($idProject){
    const response = await fetch('php/galleryRouter.php/project/'+$idProject);
    const projet = await response.json();
    
    console.log(projet);
    return projet;
}
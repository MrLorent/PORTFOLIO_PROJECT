"use strict";

/*---------------------------------------*/
/*--------------- REQUESTS --------------*/
/*---------------------------------------*/

// EXEMPLE :
// async function getPlanetDetails(planetId){
//     const response = await fetch('./SERVER/router.php/planet/'+planetId);
//     const planets = await response.json();
    
//     console.log(planets);
//     return planets;
// }

// CATEGORY
async function getAllCategories(){
    const response = await fetch('php/categoriesRouter.php/categories/');
    const Allcategories = await response.json();
    
    console.log(Allcategories);
    return Allcategories;
}

// SKILLS
async function getAllSkillsByCategory(){
    const response = await fetch('php/skillsRouter.php/skills/');
    const skills = await response.json();
    
    console.log(skills);
    return skills;
}

async function getSkill(idSkill){
    const response = await fetch('php/skillsRouter.php/skill/'+idSkill);
    const skills = await response.json();
    
    console.log(skills);
    return skills;
}

// GALLERY
async function getCategoryProjects(idCategory){
    const response = await fetch('php/galleryRouter.php/category/'+idCategory);
    const projects = await response.json();
    
    console.log(projects);
    return projects;
}

async function getAllProjects(){
    const response = await fetch('php/galleryRouter.php/projects/');
    const projects = await response.json();
    
    console.log(projects);
    return projects;
}

async function getAllProjectCategories(){
    const response = await fetch('php/galleryRouter.php/categories/');
    const categories = await response.json();
    
    console.log(categories);
    return categories;
}

async function getProject(idProject){
    const response = await fetch('php/galleryRouter.php/project/'+idProject);
    const projet = await response.json();
    
    console.log(projet);
    return projet;
}
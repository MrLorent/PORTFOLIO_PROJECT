"use strict";

// EXEMPLE :
async function getCategoryProjects(idCategory){
    const response = await fetch('php/galleryRouter.php/category/'+idCategory);
    const projects = await response.json();
    
    console.log(projects);
    return projects;
}
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

//fonctions de test getAllSkills()
async function getAllSkillsByCategory(){
    const response = await fetch('php/skillsRouter.php/skills/');
    const skills = await response.json();
    
     console.log(skills);
     return skills;
}

async function deleteSkillandRefresh($idSkill){
    const response = await fetch('php/skillsRouter.php/skill/' +$idSkill,  { method: 'DELETE' });
    const skills = await response.json();
    
     console.log(skills);
     return skills;
}

async function deleteACategoryAndRefresh(idCategory){
    const response = await fetch('php/categoriesRouter.php/category/' +idCategory,  { method: 'DELETE' });
    const category = await response.json();
    
     console.log(category);
     return category;
}

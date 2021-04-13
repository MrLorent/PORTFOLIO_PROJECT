"use strict";

// MODELS
// EXEMPLE :

// Fonction de test de getAllProjects
async function getCategoryProjects(idCategory){
    const response = await fetch('php/galleryRouter.php/category/'+idCategory);
    const projects = await response.json();
    
    console.log(projects);
    return projects;
}

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

async function getProject(idProject){
    const response = await fetch('php/galleryRouter.php/project/'+idProject);
    const projet = await response.json();
    
    console.log(projet);
    return projet;
}

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

async function deleteSkillandRefresh($idSkill){
    const response = await fetch('php/skillsRouter.php/skill/' +$idSkill, {
         method: 'DELETE'
        });
    const skills = await response.json();
    
    console.log(skills);
    return skills;
}

async function deleteACategoryAndRefresh(idCategory){
    const response = await fetch('php/categoriesRouter.php/category/' +idCategory, {
        method: 'DELETE'
    });
    const category = await response.json();
    
     console.log(category);
     return category;
}


async function addSkillandRefresh(){
    var skillForm = {};
	/*skillForm.outil = document.getElementById('input-outil').value;
	skillForm.description = document.getElementById('input-description').value;
	skillForm.icone = document.getElementById('input-icone').value;
	skillForm.categories = document.getElementById('input-categories').value;*/
    skillForm.outil = "coucou";
	skillForm.description = "communication";
	skillForm.icone = "src";
	skillForm.categorie = "langues";

    const response = await fetch('php/skillsRouter.php/skill/',  {method: 'POST', body: JSON.stringify(skillForm)});
    const skills = await response.json();
    
    console.log(skills);
    return skills;
}
"use strict";

/*###################################################*/
/*##################### REQUESTS ####################*/
/*###################################################*/

// EXAMPLE :
// async function getPlanetDetails(planetId){
//     const response = await fetch('./SERVER/router.php/planet/'+planetId);
//     const planets = await response.json();
    
//     console.log(planets);
//     return planets;
// }

/*###################################################*/
/*#################### CATEGORIES ###################*/
/*###################################################*/
async function addCategoryAndRefresh(){
    const form = {};
    form.nom = document.querySelector('.categoryForm .name').value;

    const send = await fetch('php/categoriesRouter.php/category/', {
        method: 'POST',
        body: JSON.stringify(form)
    });

    const allCategories = await send.json();

    console.log(allCategories);
    return allCategories;
}

async function deleteACategoryAndRefresh(idCategory){
    const response = await fetch('php/categoriesRouter.php/category/' +idCategory, {
        method: 'DELETE'
    });
    const category = await response.json();
    
     console.log(category);
     return category;
}

async function getAllCategories(){
    const response = await fetch('php/categoriesRouter.php/categories/');
    const allCategories = await response.json();
    
    console.log(allCategories);
    return allCategories;
}

/*###################################################*/
/*################## SKILL SECTIONS #################*/
/*###################################################*/

/*--------------------- SKILLS ---------------------*/
async function deleteSkillandRefresh(idSkill){
    const response = await fetch('php/skillsRouter.php/skill/' +idSkill, {
         method: 'DELETE'
        });
    const skills = await response.json();
    
    console.log(skills);
    return skills;
}

/*------------------ SKILL FORM ---------------------*/
async function addSkillAndRefresh(){
    var skillForm = new FormData();

	skillForm.append('outil', document.querySelector('.skillForm .name').value);
	skillForm.append('description', document.querySelector('.skillForm .description').value);
	skillForm.append('icone',document.querySelector('.skillForm .icone').files[0]);
	skillForm.append('categorie', document.querySelector('.skillForm .categorySelector').value);

    console.log(skillForm);
    const response = await fetch('php/skillsRouter.php/skill/',  {
        method: 'POST',
        body: skillForm
    });
    const skills = await response.json();
    
    console.log(skills);
    return skills;
}

async function updateSkillAndRefresh(idSkill){
    var skillForm = {};
    var categorySelector = document.querySelector("#skillForm .categorySelector");
    
    skillForm.outil = document.querySelector("#skillForm .name").value;
	skillForm.description = document.querySelector("#skillForm .description").value;
	skillForm.icone = document.querySelector("#skillForm .icone").value;
	skillForm.categorie = categorySelector.options[categorySelector.selectedIndex].value;

    const response = await fetch('php/skillsRouter.php/skill/' +idSkill,  {method: 'PUT', body: JSON.stringify(skillForm)});
    const skills = await response.json();
    
    console.log(skills);
    return skills;
}

/*###################################################*/
/*################# GALLERY SECTIONS ################*/
/*###################################################*/

/*--------------------- GALLERY ---------------------*/
async function deleteProjectAndRefresh(idProject){
    const response = await fetch('php/galleryRouter.php/project/' + idProject, { method: 'DELETE'});
    const projects = await response.json();
    
    console.log(projects);
    return projects;
}

/*------------------ PROJECT FORM -------------------*/
async function addProjectAndRefresh(){
    const formCategory={};
    var formProject = new FormData();

    formProject.append('date', document.querySelector('.projectForm .date').value);
    formProject.append('titre', document.querySelector('.projectForm .title').value);
    formProject.append('technique', document.querySelector('.projectForm .technique').value);
    formProject.append('description', document.querySelector('.projectForm .description').value);
    formProject.append('miniature', document.querySelector('.projectForm .miniature').files[0]);
    formProject.append('ordre', 2);

    console.log(formProject);

    let categories = document.querySelectorAll('.categoriesList .category');
    categories.forEach((categorie, index) => {
        formCategory[index] = categorie.dataset.idCategory;
    });
    formProject.append('categorie',formCategory);
    console.log(formProject);
   
    const response = await fetch('php/galleryRouter.php/project/', {
        method: 'POST',
        body: formProject
    });
    const allProjects = await response.json();
    
    console.log(allProjects);
    return allProjects;	
}

async function updateProjectAndRefresh(idProject,dataform){
    var object = {};
    object["id"] = idProject;
    dataform.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);
    /*for (var value of dataform.values()) {
        console.log(idProject + " " + value);
     }*/
     console.log(json);
     fetch('php/galleryRouter.php/project/', { mode: "no-cors",
     method: 'POST',  
     headers: {
       "content-type": "application/json"
     }, body: json})
     .then(response => console.log(response));
     
     //console.log(projetUpdated);
     //return projetUpdated;	
}

async function getAllCategoriesOfAProject(idProject){
    const response = await fetch('php/galleryRouter.php/ProjectCategories/'+idProject);
    const projects = await response.json();
    
    console.log(projects);
    return projects;
}
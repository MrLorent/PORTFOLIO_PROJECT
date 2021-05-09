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
    let formCategories = JSON.stringify(formCategory);
    formProject.append('categorie',formCategories);
    console.log(formProject);
   
    const response = await fetch('php/galleryRouter.php/project/', {
        method: 'POST',
        body: formProject
    });
    const allProjects = await response.json();
    
    console.log(allProjects);
    return allProjects;	
}

async function updateProjectAndRefresh(idProject){
    var projectForm = {};
    var categorySelector = document.querySelector("#projectForm .categorySelector");
    
    projectForm.titre = document.querySelector("#projectForm .title").value;
    projectForm.date = document.querySelector("#projectForm .date").value;
	projectForm.description = document.querySelector("#projectForm .description").value;
    projectForm.technique = document.querySelector("#projectForm .technique").value;
	projectForm.categorie = categorySelector.options[categorySelector.selectedIndex].value;
    const response = await fetch('php/galleryRouter.php/project/'+ idProject, {
        method: 'PUT',
        body: JSON.stringify(projectForm)
    });
    const projetUpdated = await response.json();
    
    console.log(projetUpdated);
    return projetUpdated;	
}

async function getAllCategoriesOfAProject(idProject){
    const response = await fetch('php/galleryRouter.php/ProjectCategories/'+idProject);
    const projects = await response.json();
    
    console.log(projects);
    return projects;
}

/*------------------ MEDIA -------------------*/

async function getMediabyProject(idProject){
    const response = await fetch('php/mediaRouter.php/media/'+idProject);
    const media = await response.json();
    console.log(media);
    return media;
}

async function getMediumByID(idMedium){
    const response = await fetch('php/mediaRouter.php/medium/'+idMedium);
    const medium = await response.json();
    console.log(medium);
    return medium;
}

async function addMediumAndRefresh(idProject){
    var mediaForm = new FormData();

    mediaForm.append('medium',document.querySelector('.mediaForm .media').files[0]);
	mediaForm.append('legende', document.querySelector('.mediaForm .legende').value);
	mediaForm.append('idProjet', idProject);

    console.log(mediaForm);
    const response = await fetch('php/mediaRouter.php/medium/',  {
        method: 'POST',
        body: mediaForm
    });
    const media = await response.json();
    
    console.log(media);
    return media;
}

async function deleteMedium(idMedium) {
    const response = await fetch('php/mediaRouter.php/medium/' + idMedium, { method: 'DELETE'});
    const media = await response.json();
    
    console.log(media);
    return media;
}
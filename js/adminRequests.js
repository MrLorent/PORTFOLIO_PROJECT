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
async function addCategoryAndRefresh(form){
    /*const form = {};
    form.nom = document.getElementById('input-name').value;*/
    const send = await fetch('php/categoriesRouter.php/category/', { method: 'POST', body: JSON.stringify(form)});
    const AllcategoriesAgain = await send.json();

    console.log(AllcategoriesAgain);
    return AllcategoriesAgain;
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

// SKILLS
async function addSkillAndRefresh(){
    var skillForm = {};
	skillForm.outil = document.querySelector('.skillForm .name').value;
	skillForm.description = document.querySelector('.skillForm .description').value;
	skillForm.icone = document.querySelector('.skillForm .icone').value;
	skillForm.categorie = document.querySelector('.skillForm .categorySelector').value;

    const response = await fetch('php/skillsRouter.php/skill/',  {method: 'POST', body: JSON.stringify(skillForm)});
    const skills = await response.json();
    
    console.log(skills);
    return skills;
}

async function deleteSkillandRefresh(idSkill){
    const response = await fetch('php/skillsRouter.php/skill/' +idSkill, {
         method: 'DELETE'
        });
    const skills = await response.json();
    
    console.log(skills);
    return skills;
}

// GALLERY
async function addProjectAndRefresh(){
    const form={};
    const formCategory={};
    const formMedia={};

    form.titre = document.querySelector('.projectForm .title').value;
    form.date = document.querySelector('.projectForm .date').value;
    form.technique = document.querySelector('.projectForm .technique').value;
    form.description = document.querySelector('.projectForm .description').value;
    form.miniature = "miniatureTest";
    form.ordre = 2;

    const firstMedia={};
    firstMedia.source = "FIRSTsourceTest";
    firstMedia.legende = "FIRSTlegendeTest";
    firstMedia.type = "FIRSTtypeTest";
    formMedia['0']=firstMedia;

    const secondMedia={};
    secondMedia.source = "SECONDsourceTest";
    secondMedia.legende = "SECONDlegendeTest";
    secondMedia.type = "SECONDtypeTest";
    formMedia['2']=secondMedia;

    form.media=formMedia;

    formCategory['0'] ="audiovisuel";
    formCategory['1'] ="programmation";
    formCategory['2'] ="Installation";
    formCategory['3'] ="Vidéo";
    form.categorie=formCategory;
    //form.categorie =document.querySelector('.projectForm .categorySelector').value; 

    const response = await fetch('php/galleryRouter.php/project/', {
        method: 'POST',
        body: JSON.stringify(form)
    });
    const projet = await response.json();
    
    console.log(projet);
    return projet;	
}

async function deleteProjectAndRefresh(idProject){
    const response = await fetch('php/galleryRouter.php/project/' + idProject, { method: 'DELETE'});
    const projects = await response.json();
    
    console.log(projects);
    return projects;
}

async function updateSkillAndRefresh(idProject){
    
}

async function updateProjectAndRefresh(idProject){
    
}
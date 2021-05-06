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
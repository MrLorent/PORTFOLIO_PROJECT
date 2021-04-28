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
	skillForm.icone = document.querySelector('.skillForm .icone').files[0];
	skillForm.categorie = document.querySelector('.skillForm .categorySelector').value;

    console.log(skillForm);
    
    const response = await fetch('php/skillsRouter.php/skill/',  {
        method: 'POST',
        body: JSON.stringify(skillForm)
    });
    const skills = await response.json();
    
    console.log(skills);
    return skills;
}

async function updateSkillAndRefresh(idSkill){
    //console.log(idSkill);
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


    //?categorySelector.options[categorySelector.selectedIndex].value;
    formCategory['0'] =1;
    //formCategory['1'] =2;
    //formCategory['2'] =3;
    //formCategory['3'] =4;
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

async function updateProjectAndRefresh(idProject){
    var projectForm = {};
    var categorySelector = document.querySelector("#projectForm .categorySelector");
    
    projectForm.titre = document.querySelector("#projectForm .title").value;
    projectForm.date = document.querySelector("#projectForm .date").value;
	projectForm.description = document.querySelector("#projectForm .description").value;
    projectForm.technique = document.querySelector("#projectForm .technique").value;
	projectForm.categorie = categorySelector.options[categorySelector.selectedIndex].value;
    projectForm.media = document.querySelector("#projectForm .media").value;
    projectForm.mediaId = document.querySelector("#projectForm .media").dataset.id;
     const response = await fetch('php/galleryRouter.php/project/'+ idProject, { method: 'PUT', body: JSON.stringify(projectForm)});
     const projetUpdated = await response.json();
     
     console.log(projetUpdated);
     return projetUpdated;	
}
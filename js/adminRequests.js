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

async function deleteSkillandRefresh($idSkill){
    const response = await fetch('php/skillsRouter.php/skill/' +$idSkill, {
         method: 'DELETE'
        });
    const skills = await response.json();
    
    console.log(skills);
    return skills;
}

// GALLERY
async function addProjectAndRefresh(){
    const form={};

    form.titre = "titreTest";
    form.date = "dateTest";
    form.technique = "techniqueTest";
    form.description = "desciptionTest";
    form.miniature = "miniatureTest";
    form.ordre = 2;
    form.source = "sourceTest";
    form.legende = "legendeTest";
    form.type = "typeTest";
    form.categorie = "audiovisuel";

    const response = await fetch('php/galleryRouter.php/project/', { method: 'POST', body: JSON.stringify(form)});
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
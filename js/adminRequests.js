"use strict";

// EXEMPLE :
// async function getPlanetDetails(planetId){
//     const response = await fetch('./SERVER/router.php/planet/'+planetId);
//     const planets = await response.json();
    
//     console.log(planets);
//     return planets;
// }


async function deleteProjectAndRefresh($idProject){
    const response = await fetch('php/galleryRouter.php/project/'+$idProject, { method: 'DELETE'});
    const projet = await response.json();
    
    console.log(projet);
    return projet;
}

async function addCategoryAndRefresh(form){
    /*const form = {};
    form.nom = document.getElementById('input-name').value;*/
    const send = await fetch('php/categoriesRouter.php/category/', { method: 'POST', body: JSON.stringify(form)});
    const AllcategoriesAgain = await send.json();

    console.log(AllcategoriesAgain);
    return AllcategoriesAgain;
}
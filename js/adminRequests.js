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

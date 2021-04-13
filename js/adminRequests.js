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
    // form.titre = document.getElementById('titre').value;
    // form.date = document.getElementById('date').value;
    // form.technique = document.getElementById('technique').value;
    // form.description = document.getElementById('description').value;
    // form.miniature = document.getElementById('miniature').value;
    // form.ordre = document.getElementById('ordre').value;
    // form.source = document.getElementById('source').value;
    // form.legende = document.getElementById('legende').value;
    // form.type = document.getElementById('type').value;
    // form.categorie = document.getElementById('categorie').value;

    form.titre = "testBIS";
    form.date = "test";
    form.technique = "test";
    form.description = "test";
    form.miniature = "test";
    form.ordre = 2;
    form.source = "test";
    form.legende = "test";
    form.type = "test";
    form.categorie = "audiovisuel";

    const response = await fetch('php/galleryRouter.php/project/', { method: 'POST', body: JSON.stringify(form)});
    const projet = await response.json();
    
    console.log(projet);
    return projet;	

}

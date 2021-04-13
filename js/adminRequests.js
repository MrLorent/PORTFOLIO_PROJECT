"use strict";

// EXEMPLE :
// async function getPlanetDetails(planetId){
//     const response = await fetch('./SERVER/router.php/planet/'+planetId);
//     const planets = await response.json();
    
//     console.log(planets);
//     return planets;
// }

/*
async function deleteProjectAndRefresh($idProject){
    const response = await fetch('php/galleryRouter.php/project/'+$idProject, { method: 'DELETE'});
    const projet = await response.json();
    
    console.log(projet);
    return projet;
}*/

async function addProjectAndRefresh(){

    document.getElementById('adding').onclick = event =>{
    event.preventDefault();
    document.getElementById('formProject').style.display = 'none';
    const form={};
    form.titre = document.getElementById('titre').value;
    form.date = document.getElementById('date').value;
    form.technique = document.getElementById('technique').value;
    form.description = document.getElementById('description').value;
    form.miniature = document.getElementById('miniature').value;
    form.ordre = document.getElementById('ordre').value;
    form.source = document.getElementById('source').value;
    form.legende = document.getElementById('legende').value;
    form.type = document.getElementById('type').value;
    form.categorie = document.getElementById('categorie').value;

    fetch('php/galleryRouter.php/project/', { method: 'POST'})
	.then(response => response.json())
	.then (data =>{
			//once again, we need to display the data. The function 'displayPlanets' is for that purpose
			displayMovies(data);
	})
	.catch(error => { console.log(error) });	

}
}
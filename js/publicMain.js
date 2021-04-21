"use strict";

/**
 * FONCTION MAIN
 * Fonction lancer dès que la page HTML est chargée
 */
document.addEventListener('DOMContentLoaded', function(){
    SKILLS_SECTION = document.getElementById('skills');
    SKILL_SECTION = document.getElementById('skill');
    GALLERY_SECTION = document.getElementById('gallery');
    PROJECT_SECTION = document.getElementById('project');

    // NAV
    let navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', () => {
            let modalDisplayed = document.querySelector('.modal.displayed');
    
            if(modalDisplayed){
                displayOrHideSection(modalDisplayed);
            }
        });
    })

    // SKILLS_SECTION
    getAllSkillsByCategory().then(skillsByCategories => {
        SKILLS_SECTION.append(generateSkillsAsList(skillsByCategories));
    });

    // GALLERY_SECTION
    getAllProjectCategories()
    .then(projectCategories => generateGalleryFilters(projectCategories))
    .then(galleryFilters => {
        GALLERY_SECTION.append(galleryFilters);

        let filters = document.querySelectorAll('.filter');
        filters.forEach(filter => {
            filter.addEventListener('click', updateGallery);
        });
        document.querySelector('#gallery .filter:last-child').classList.add('selected');

        getAllProjects().then(projects => {
            displayGallery(projects);
        });
    });
});

// GALLERY
function displayGallery(projects){
    let divGallery = document.getElementById('projectList');

    if(divGallery){
        divGallery.remove();
    }

    GALLERY_SECTION.append(generateGallery(projects));
    
}

function generateGallery(projects){
    let divGallery = document.createElement('div');
    divGallery.id = 'projectList';

    for(let current in projects){
        let project = projects[current];

        let divProject = document.createElement('div');
        divProject.classList.add('project');
        divProject.dataset.idProject = project['idProjet'];
        divProject.addEventListener('click', displayProject);
        
        let miniature = document.createElement('img');
        miniature.src = project['miniature'];
        miniature.alt = "Miniature du projet " + project['titre'];
        miniature.classList.add('miniature');
        divProject.append(miniature);

        let projectTitle = document.createElement('span');
        projectTitle.classList.add('projectTitle');
        projectTitle.innerHTML = project['titre'];

        divProject.append(projectTitle);
        divGallery.append(divProject);
    }

    return divGallery;
}

function updateGallery(evt){
    if(!this.classList.contains('selected')){
        document.querySelector('#gallery .filter.selected').classList.remove('selected');
        this.classList.add('selected');

        if(this.dataset.idCategory == "all"){
            getAllProjects().then(projects => {
                displayGallery(projects);
            });
        }else{
            getAllProjectsFromACategory(this.dataset.idCategory).then(projects => {
                displayGallery(projects);
            });
        }
    }
}


"use strict";

/**
 * FONCTION MAIN
 * Fonction lancer dès que la page HTML est chargée
 */
document.addEventListener('DOMContentLoaded', function(){
    SKILL_SECTION = document.getElementById('skill');
    SKILL_CONTAINER = document.querySelector('#skill .content');
    SKILLS_CONTAINER = document.querySelector('#skills .content');
    GALLERY_CONTAINER = document.querySelector('#gallery .content');
    PROJECT_SECTION = document.getElementById('project');
    PROJECT_CONTAINER = document.querySelector('#project .content');

    // NAV
    let navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', () => {
            let modalsDisplayed = document.querySelectorAll('.modal.displayed');
    
            if(modalsDisplayed){
                modalsDisplayed.forEach(modal => {
                    hideSection(modal);
                });
            }
        });
    });

    // BACK BUTTONS
    let backButtons = document.querySelectorAll('.back.button');
    backButtons.forEach(backButton => {
        backButton.addEventListener('click', function(){
            hideSection(document.getElementById(this.dataset.idSection));
        });
    });

    /*###################################################*/
    /*################## SKILLS SECTION #################*/
    /*###################################################*/
    getAllSkillsByCategory()
    .then(skillsByCategories => generateSkillsAsList(skillsByCategories))
    .then(skillList => {
        SKILLS_CONTAINER.append(skillList);
    });

    /*###################################################*/
    /*################# GALLERY SECTION #################*/
    /*###################################################*/
    getAllProjectsCategories()
    .then(projectCategories => generateGalleryFilters(projectCategories))
    .then(galleryFilters => {
        GALLERY_CONTAINER.append(galleryFilters);

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

/*###################################################*/
/*################ GALLERY SECTIONS #################*/
/*###################################################*/

/*----------------- GALLERY SECTION ----------------*/
function displayGallery(projects){
    let divGallery = document.getElementById('projectList');

    if(divGallery){
        divGallery.remove();
    }

    GALLERY_CONTAINER.append(generateGallery(projects));
    
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

function updateGallery(){
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


"use strict";

// CONSTANTES
var SKILLS_SECTION;
var SKILL_SECTION;
var GALLERY_SECTION;

/**
 * FONCTION MAIN
 * Fonction lancer dès que la page HTML est chargée
 */
document.addEventListener('DOMContentLoaded', function(){
    SKILLS_SECTION = document.getElementById('skills');
    SKILL_SECTION = document.getElementById('skill');
    GALLERY_SECTION = document.getElementById('gallery');

    getAllSkillsByCategory().then(skillsByCategories => {
        SKILLS_SECTION.append(generateSkillsAsList(skillsByCategories));
    });

    getAllProjectCategories().then(projectCategories => {
        GALLERY_SECTION.append(generateGalleryFilters(projectCategories));
    });


    //getAllCategories();
    //getAllProjects();
    //getAllProjectsCategories();
    //getProject("1");
    //deleteSkillandRefresh("15");
    //deleteACategoryAndRefresh("15");

});

// CONTROLEURS
function generateSkillsAsList(skillsByCategories){
    // On créer la liste principale
    let ulCategories = document.createElement('ul');
    ulCategories.classList.add('skillCategoryList');

    // On créer les sous listes
    for(let category in skillsByCategories){
        let tabCategory = skillsByCategories[category];
        let liCategory = document.createElement('li');
        liCategory.classList.add('skillCategory');
        liCategory.dataset.idCategory = tabCategory['idCategory'];
        liCategory.innerHTML = category;

        let ulSkills = document.createElement('ul');
        ulSkills.classList.add('skillList');
        for(let skill in tabCategory['skills']){
            let tabSkill = tabCategory['skills'][skill];
            let liSkill = document.createElement('li');
            liSkill.classList.add('skill');
            liSkill.dataset.idSkill = tabSkill['idSkill'];
            liSkill.addEventListener('click', displaySkill);
            liSkill.innerHTML = tabSkill['name'];
            ulSkills.append(liSkill);
        }
        liCategory.append(ulSkills);
        ulCategories.append(liCategory);
    }

    return ulCategories;
}

function displaySkill(){
    getSkill(this.dataset.idSkill).then(skillDetails => {
        // SUPPRESSION DES ÉLÉMENTS PRÉEXISTANTS
        removeAllChildren(SKILL_SECTION);

        // CRÉATION ET AJOUT DES NOUVEAUX ÉLÉMENTS
        let skillTitle = document.createElement('h3');
        skillTitle.classList.add('skillTitle');
        skillTitle.innerHTML = skillDetails['nom'];
        SKILL_SECTION.append(skillTitle);

        let skillDescription = document.createElement('p');
        skillDescription.classList.add('skillDescription');
        skillDescription.innerHTML = skillDetails['description'];
        SKILL_SECTION.append(skillDescription);

        let skillIcone = document.createElement('img');
        skillIcone.src = skillDetails['icone'];
        skillIcone.alt = "Logo " + skillDetails['nom'];
        SKILL_SECTION.append(skillIcone);

        generateBackButton(SKILL_SECTION);

        // AFFICHAGE
        SKILL_SECTION.classList.toggle('displayed');
    });
}

function generateGalleryFilters(categories){
    let filterBar = document.createElement('filterBar');
    filterBar.classList.add('filterBar');

    for(let current in categories){
        let categorie = categories[current];
        let filter = document.createElement('span');
        filter.classList.add('filter');
        filter.dataset.idCategory = categorie['idCategorie'];
        filter.addEventListener('click', filterProjects);
        filter.innerHTML = categorie['nom'];

        filterBar.append(filter);
    }

    let filterAll = document.createElement('span');
    filterAll.classList.add('filter');
    filterAll.dataset.idCategory = "all";
    filterAll.addEventListener('click', filterProjects);
    filterAll.innerHTML = "All";

    filterBar.append(filterAll);
    
    return filterBar;
}

function filterProjects(evt){
    if(!this.classList.contains('selected')){
        let previous = document.querySelector('#gallery .filter.selected');

        if(previous){
            previous.classList.remove('selected');
        }

        this.classList.add('selected');

        if(this.dataset.idCategory == "all"){
            getAllProjects().then(projects => {
                generateGallery(projects);
            });
        }else{
            getCategoryProjects(this.dataset.idCategory).then(projects => {
                generateGallery(projects);
            });
        }
    }
}

function generateGallery(projects){
    let divGallery = document.getElementById('projectList');

    if(divGallery){
        removeAllChildren(divGallery);
    }else{
        divGallery = document.createElement('div');
        divGallery.id = 'projectList';
    }

    for(let current in projects){
        let project = projects[current];

        let divProject = document.createElement('div');
        divProject.classList.add('project');
        divProject.dataset.idProject = project['idProjet'];
        
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

    GALLERY_SECTION.append(divGallery);
}

function removeAllChildren(parent){
    if(parent.firstElementChild){
        do{
            parent.removeChild(parent.firstElementChild);
        }while(parent.firstElementChild);
    }
}

function generateBackButton(currentSection){
    var backButton = document.createElement('span');
    backButton.classList.add('back_button');
    backButton.innerHTML = '< BACK';
    backButton.addEventListener('click',()=>{
        currentSection.classList.toggle('displayed');
    });
    currentSection.append(backButton);
}


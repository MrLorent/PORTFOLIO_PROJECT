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
    getAllProjectCategories().then(projectCategories => {
        GALLERY_SECTION.append(generateGalleryFilters(projectCategories));
        document.querySelector('#gallery .filter:last-child').click();
    });
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
        let categroyName = document.createElement('span');
        categroyName.classList.add('categoryName');
        categroyName.innerHTML = category;
        liCategory.append(categroyName);

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
        displayOrHideSection(SKILL_SECTION);
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
            getAllProjectsFromACategory(this.dataset.idCategory).then(projects => {
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

    GALLERY_SECTION.append(divGallery);
}

function displayProject(){
    getProject(this.dataset.idProject).then(projectDetails => {
        // SUPPRESSION DES ANCIENS CONTENUS
        removeAllChildren(PROJECT_SECTION);

        // MEDIA
        let projectMedia = projectDetails['media'];

        let divMedia = document.createElement('div');
        divMedia.classList.add('media');

        for(let index in projectMedia){
            let projectMedium = projectMedia[index];
            switch(projectMedium['type']){
                case 'photo':
                    let picture = document.createElement('img');
                    picture.src = projectMedium['source'];
                    picture.alt = projectMedium['legende'];
                    picture.classList.add('projectPicture');
                    divMedia.append(picture);
                    break;
                case 'video':
                    let video = document.createElement('iframe');
                    video.src = projectMedium['source'];
                    divMedia.append(video);
                    break;
                default:
                    console.log("Le type de media " + projectMedia['type'] + "n'est pas géré");
                    break;
            }
        }

        PROJECT_SECTION.append(divMedia);

        // TEXTUAL INFORMATIONS
        let projectInfos = projectDetails['infos'];

        let divText = document.createElement('div');
        divText.classList.add('infos');
        
        let title = document.createElement('h3');
        title.classList.add('title');
        title.innerHTML = projectInfos['titre'];
        divText.append(title);

        let date = document.createElement('span');
        date.classList.add('date');
        date.innerHTML = projectInfos['date'];
        divText.append(date);

        let technique = document.createElement('span');
        technique.classList.add('technique');
        technique.innerHTML = projectInfos['technique'];
        divText.append(technique);

        let description = document.createElement('p');
        description.classList.add('description');
        description.innerHTML = projectInfos['description'];
        divText.append(description);

        PROJECT_SECTION.append(divText);

        generateBackButton(PROJECT_SECTION);

        // AFFICHAGE
        displayOrHideSection(PROJECT_SECTION);
    });
}


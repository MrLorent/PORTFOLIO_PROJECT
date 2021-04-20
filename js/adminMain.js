"use strict";

/**
 * FONCTION MAIN
 * Fonction lancer dès que la page HTML est chargées
 */
document.addEventListener('DOMContentLoaded', function(){
    SKILLS_SECTION = document.getElementById('skills');
    SKILL_SECTION = document.getElementById('skill');
    SKILL_FORM_SECTION = document.getElementById('skillForm');
    GALLERY_SECTION = document.getElementById('gallery');
    PROJECT_SECTION = document.getElementById('project');
    PROJECT_FORM_SECTION = document.getElementById('projectForm');

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
        generateSkillsDashBoard(skillsByCategories);
    });

    // GALLERY_SECTION
    getAllProjectCategories().then(projectCategories => {
        GALLERY_SECTION.append(generateGalleryFilters(projectCategories));
        document.querySelector('#gallery .filter:last-child').classList.add('selected');
        getAllProjects().then(projects => {
            generateGalleryDashboard(projects);
        });
    });

});

// CONTROLEURS
// SKILLS
function generateSkillsDashBoard(skillsByCategories) {
    SKILLS_SECTION.append(generateSkillsAsList(skillsByCategories));

    let addSkillButton = document.createElement('span');
    addSkillButton.classList.add('button');
    addSkillButton.classList.add('add');
    addSkillButton.addEventListener('click', () => {
        getAllCategories().then(categories => {
            displaySkillForm(categories);
        });
    });
    addSkillButton.innerHTML = "Ajouter une nouvelle compétence"
    SKILLS_SECTION.append(addSkillButton);


    let skills = document.querySelectorAll('li.skill');

    skills.forEach(skill => {
        skill.append(generateModifySkillButton(skill.dataset.idSkill));
        skill.append(generateDeleteSkillButton(skill.dataset.idSkill));
    });
}

function generateSkillForm(categories){
    // CRÉATION DU FORM
    let form = document.createElement('form');

    // CRÉATION D'UN INPUT
    // Initialisation du label
    let nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'nom';
    nameLabel.innerHTML = "Nom de la compétence :";
    // Initialisation de l'input
    let nameInput = document.createElement('input');
    nameInput.id = 'skillName';
    nameInput.type = 'text';
    nameInput.name = 'nom';
    // Ajout au form
    form.append(nameLabel);
    form.append(nameInput);

    // CRÉATION D'UN INPUT
    // Initialisation du label
    let iconeLabel = document.createElement('label');
    iconeLabel.htmlFor = 'icone';
    iconeLabel.innerHTML = "[TEMPORAIRE] Chemin vers l'icone :";
    // Initialisation de l'input
    let iconeInput = document.createElement('input');
    iconeInput.id = 'skillIcone';
    iconeInput.type = 'text';
    iconeInput.name = 'icone';
    // Ajout au form
    form.append(iconeLabel);
    form.append(iconeInput);

    // CRÉATION D'UN SELECT
    // Initialisation du label
    let selectLabel = document.createElement('label');
    selectLabel.htmlFor = 'category';
    selectLabel.innerHTML = "Choissisez le champ de la compétence :";
    // Initialisation de l'input
    let categorySelector = document.createElement('select');
    categorySelector.id = 'categorySelector';
    categorySelector.name = 'category';
    
    for(let current in categories){
        let category = categories[current];
        let option = document.createElement('option');
        option.classList.add(category['idCategorie']);
        option.value = category['idCategorie'];
        option.innerHTML = category['nom'];
        categorySelector.append(option);
    }

    // Ajout au form
    form.append(selectLabel);
    form.append(categorySelector);

    // CRÉATION D'UN INPUT
    // Initialisation du label
    let descriptionLabel = document.createElement('label');
    descriptionLabel.htmlFor = 'description';
    descriptionLabel.innerHTML = "Description de la compétence :";
    // Initialisation de l'input
    let textarea = document.createElement('textarea');
    textarea.id = 'skillDescription';
    textarea.name = 'description';
    // Ajout au form
    form.append(descriptionLabel);
    form.append(textarea);

    //CRÉATION DU SUBMIT BUTTON
    let submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.classList.add('button');
    submitButton.classList.add('submit');
    submitButton.innerHTML = "Envoyer";
    form.append(submitButton);

    return form;
}

function displaySkillForm(categories){
    removeAllChildren(SKILL_FORM_SECTION);
    
    let skillform = generateSkillForm(categories);
    skillForm.addEventListener('submit', () => {
        addSkillandRefresh(idSkill);
    });
    SKILL_FORM_SECTION.append(skillform);

    generateBackButton(SKILL_FORM_SECTION);
    displayOrHideSection(SKILL_FORM_SECTION);
}

function displayFilledSkillForm(idSkill){
    getAllCategories().then(categories => {
        removeAllChildren(SKILL_FORM_SECTION);

        let skillForm = generateSkillForm(categories);
        skillForm.addEventListener('submit', () => {
            updateSkill(idSkill);
        });

        SKILL_FORM_SECTION.append(skillForm);

        getSkill(idSkill).then(skillDetails => {

            let skillName = document.querySelector('form #skillName');
            skillName.value = skillDetails['nom'];
    
            let skillIcone = document.querySelector('form #skillIcone');
            skillIcone.value = skillDetails['icone'];
    
            let categorySelector = document.getElementById('categorySelector');
            let count = 0;
            let optionSelected = false;
            while(!optionSelected){
                if(categorySelector.options[count].value == skillDetails['idCategorie']){
                    categorySelector.options[count].selected = true;
                    optionSelected = true;
                }
                count++;
            }

            let description = document.getElementById('skillDescription');
            description.value = skillDetails['description'];

            generateBackButton(SKIL_FORM_SECTION);
            displayOrHideSection(SKILL_FORM_SECTION);
        });
    });
}

// GALLERY
function generateGalleryDashboard(projects){
    let projectList = document.getElementById('projectList');

    if(projectList){
        projectList.remove();
    }

    projectList = document.createElement('ul');
    projectList.id = "projectList";

    for(let current in projects){
        let project = projects[current];

        let liProject = document.createElement('li');
        liProject.classList.add('project');
        liProject.dataset.idProject = project['idProjet'];

        let idProject = document.createElement('span');
        idProject.classList.add('idProject');
        idProject.innerHTML = project['idProjet'];
        liProject.append(idProject);

        let projectTitle = document.createElement('span');
        projectTitle.classList.add('projectTitle');
        projectTitle.dataset.idProject = project['idProjet'];
        projectTitle.innerHTML = project['titre'];
        projectTitle.addEventListener('click', displayProject);
        liProject.append(projectTitle);

        liProject.append(generateModifyProjectButton(project['idProjet']));

        liProject.append(generateDeleteProjectButton(project['idProjet']));

        projectList.append(liProject);
    }

    GALLERY_SECTION.append(projectList);
}

function displayFilledProjectForm(idProject){
    getAllCategories().then(categories => {
        removeAllChildren(PROJECT_FORM_SECTION);

        getProject(idProject).then(projectDetails => {
            let projectForm = generateProjectForm(categories);

            projectForm.addEventListener('submit', () => {
                updateProject(idProject);
            });

            PROJECT_FORM_SECTION.append(projectForm);

            let projectInfos = projectDetails['infos'];
            
            document.querySelector('input#projectTitle').value = projectInfos['titre'];

            document.querySelector('input#projectDate').value = projectInfos['date'];

            document.querySelector('input#projectTechnique').value = projectInfos['technique'];

            document.querySelector('textarea#projectDescription').value = projectInfos['description'];

            let projectMedia = projectDetails['media'][0];

            document.querySelector('input#projectMedia').value = projectMedia['source'];

            generateBackButton(PROJECT_FORM_SECTION);
            displayOrHideSection(PROJECT_FORM_SECTION);
        });
    });
    
}

function generateProjectForm(categories){
    let form = document.createElement('form');

    // CRÉATION D'UN INPUT
    // Initialisation du label
    let titleLabel = document.createElement('label');
    titleLabel.htmlFor = 'title';
    titleLabel.innerHTML = "Nom du projet :";
    // Initialisation de l'input
    let titleInput = document.createElement('input');
    titleInput.id = 'projectTitle';
    titleInput.type = 'text';
    titleInput.name = 'title';
    // Ajout au form
    form.append(titleLabel);
    form.append(titleInput);

    // CRÉATION D'UN SELECT
    // Initialisation du label
    let selectLabel = document.createElement('label');
    selectLabel.htmlFor = 'category';
    selectLabel.innerHTML = "Choissisez la categorie du projet :";
    // Initialisation de l'input
    let categorySelector = document.createElement('select');
    categorySelector.id = 'categorySelector';
    categorySelector.name = 'category';
    for(let current in categories){
        let category = categories[current];
        let option = document.createElement('option');
        option.classList.add(category['idCategorie']);
        option.value = category['idCategorie'];
        option.innerHTML = category['nom'];
        categorySelector.append(option);
    }
    // Ajout au form
    form.append(selectLabel);
    form.append(categorySelector);

    // CRÉATION D'UN INPUT
    // Initialisation du label
    let dateLabel = document.createElement('label');
    dateLabel.htmlFor = 'date';
    dateLabel.innerHTML = "Date de réalisation :";
    // Initialisation de l'input
    let dateInput = document.createElement('input');
    dateInput.id = 'projectDate';
    dateInput.type = 'text';
    dateInput.name = 'date';
    // Ajout au form
    form.append(dateLabel);
    form.append(dateInput);

    // CRÉATION D'UN INPUT
    // Initialisation du label
    let techniqueLabel = document.createElement('label');
    techniqueLabel.htmlFor = 'technique';
    techniqueLabel.innerHTML = "techniques utilisées :";
    // Initialisation de l'input
    let techniqueInput = document.createElement('input');
    techniqueInput.id = 'projectTechnique';
    techniqueInput.type = 'text';
    techniqueInput.name = 'technique';
    // Ajout au form
    form.append(techniqueLabel);
    form.append(techniqueInput);

    // CRÉATION D'UN INPUT
    // Initialisation du label
    let descriptionLabel = document.createElement('label');
    descriptionLabel.htmlFor = 'description';
    descriptionLabel.innerHTML = "Description du projet :";
    // Initialisation de l'input
    let textarea = document.createElement('textarea');
    textarea.id = 'projectDescription';
    textarea.name = 'description';
    // Ajout au form
    form.append(descriptionLabel);
    form.append(textarea);

    // CRÉATION D'UN INPUT
    // Initialisation du label
    let mediaLabel = document.createElement('label');
    mediaLabel.htmlFor = 'media';
    mediaLabel.innerHTML = "[TEMPORAIRE] Chemin vers un media :";
    // Initialisation de l'input
    let mediaInput = document.createElement('input');
    mediaInput.id = 'projectMedia';
    mediaInput.type = 'text';
    mediaInput.name = 'media';
    // Ajout au form
    form.append(mediaLabel);
    form.append(mediaInput);

    //CRÉATION DU SUBMIT BUTTON
    let submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.classList.add('button');
    submitButton.classList.add('submit');
    submitButton.innerHTML = "Envoyer";
    form.append(submitButton);

    return form;
}

// GENERAL
function generateModifySkillButton(idSkill){
    let modifyButton = document.createElement('span');
    modifyButton.classList.add('button');
    modifyButton.classList.add('modify');
    modifyButton.dataset.idSkill = idSkill;
    modifyButton.innerHTML = "Modifier";
    modifyButton.addEventListener('click', function(){
        displayFilledSkillForm(this.dataset.idSkill);
    });

    return modifyButton;
}

function generateDeleteSkillButton(idSkill){
    let deleteButton = document.createElement('span');
    deleteButton.classList.add('button');
    deleteButton.classList.add('delete');
    deleteButton.dataset.idSkill = idSkill;
    deleteButton.innerHTML = "Supprimer";
    deleteButton.addEventListener('click', function(){
        deleteSkillandRefresh(this.dataset.idSkill).then(skillsByCategories => {
           generateSkillsDashBoard(skillsByCategories);
        });
    });

    return deleteButton;
}

function generateModifyProjectButton(idProject){
    let modifyButton = document.createElement('span');
    modifyButton.classList.add('button');
    modifyButton.classList.add('modify');
    modifyButton.dataset.idProject = idProject;
    modifyButton.innerHTML = "Modifier";
    modifyButton.addEventListener('click', function(){
        displayFilledProjectForm(this.dataset.idProject);
    });

    return modifyButton;
}

function generateDeleteProjectButton(idProject){
    let deleteButton = document.createElement('span');
    deleteButton.classList.add('button');
    deleteButton.classList.add('delete');
    deleteButton.dataset.idProject = idProject;
    deleteButton.innerHTML = "Supprimer";
    deleteButton.addEventListener('click', function(){
        deleteProjectAndRefresh(this.dataset.idProject).then(projects => {
           generateGalleryDashboard(projects);
        });
    });

    return deleteButton;
}
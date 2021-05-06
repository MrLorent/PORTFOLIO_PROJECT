"use strict";

/**
 * MAIN
 * Fonction lancer dès que la page HTML est chargées
 */
document.addEventListener('DOMContentLoaded', function(){
    SKILLS_CONTAINER = document.querySelector('#skills .content');
    SKILL_SECTION = document.getElementById('skill');
    SKILL_CONTAINER = document.querySelector('#skill .content');
    SKILL_FORM_SECTION = document.getElementById('skillForm');
    GALLERY_CONTAINER = document.querySelector('#gallery .content');
    PROJECT_SECTION = document.getElementById('project');
    PROJECT_CONTAINER = document.querySelector('#project .content');
    PROJECT_FORM_SECTION = document.getElementById('projectForm');

    // NAV
    let navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', () => {
            let modalDisplayed = document.querySelector('.modal.displayed');
    
            if(modalDisplayed){
                hideSection(modalDisplayed);
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
    getAllSkillsByCategory().then(skillsByCategories => {
        let addSkillButton = document.querySelector('#skills .add.button');
        addSkillButton.addEventListener('click', () => {
            getAllCategories().then(categories => {
                displaySkillForm(categories);
            });
        });
        displaySkillsDashboard(skillsByCategories);
    });

    /*###################################################*/
    /*################# GALLERY SECTION #################*/
    /*###################################################*/
    getAllProjectCategories()
    .then(projectCategories => generateGalleryFilters(projectCategories))
    .then(galleryFilters => {
        GALLERY_CONTAINER.append(galleryFilters);

        let filters = document.querySelectorAll('.filter');
        filters.forEach(filter => {
            filter.addEventListener('click', updateGalleryDashboard);
        });
        document.querySelector('#gallery .filter:last-child').classList.add('selected');
        
        getAllProjects().then(projects => {
            let addProjectButton = document.querySelector('#gallery .add.button');
            addProjectButton.addEventListener('click', displayProjectForm);
            displayGalleryDashboard(projects);
        });
    });
});

/*###################################################*/
/*################## SKILL SECTIONS #################*/
/*###################################################*/

/*---------------- SKILLS DASHBOARD -----------------*/
function displaySkillsDashboard(skillsByCategories) {
    // SUPPRESSION DES ÉLÉMENTS PRÉCÉDENTS
    removeAllChildren(SKILLS_CONTAINER);

    SKILLS_CONTAINER.append(generateSkillsAsList(skillsByCategories));

    let skills = document.querySelectorAll('li.skill');

    skills.forEach(skill => {
        skill.append(generateModifySkillButton(skill.dataset.idSkill));
        skill.append(generateDeleteSkillButton(skill.dataset.idSkill));
    });
}

/*-------------------- SKILL FORM -------------------*/
function displaySkillForm(categories){
    // RÉINITIALISATION DU FORM
    let skillForm = document.querySelector('form.skillForm');
    skillForm.reset();
    skillForm.removeEventListener('submit', modifySkillFormSubmitted);
    skillForm.removeEventListener('submit', addSkillFormSubmitted);
    skillForm.addEventListener('submit', addSkillFormSubmitted);

    // AJOUT DES DIFFÉRENTES CATÉGORIES DISPONIBLES AU FORM
    let categorySelector = document.querySelector('#skillForm select.categorySelector');
    for(let current in categories){
        let category = categories[current];
        let option = document.createElement('option');
        option.classList.add(category['idCategorie']);
        option.value = category['idCategorie'];
        option.innerHTML = category['nom'];
        categorySelector.append(option);
    }

    displaySection(SKILL_FORM_SECTION);
}

function addSkillFormSubmitted(evt){
    evt.preventDefault();
    document.querySelector('form.skillForm .submit.button').disabled = true;
    addSkillAndRefresh()
    .then(skills => {
        displaySkillsDashboard(skills);
        hideSection(SKILL_FORM_SECTION);
        document.querySelector('form.skillForm .submit.button').disabled = false;
    });
}

function displayFilledSkillForm(idSkill){
    getAllCategories()
    .then(categories => {
        // RÉINITIALISATION DU FORM
        let skillForm = document.querySelector('form.skillForm');
        skillForm.reset();
        skillForm.removeEventListener('submit', modifySkillFormSubmitted);
        skillForm.removeEventListener('submit', addSkillFormSubmitted);
        skillForm.addEventListener('submit', function(evt){
            evt.preventDefault();
            modifySkillFormSubmitted(idSkill);
        });

        // AJOUT DES DIFFÉRENTES CATÉGORIES DISPONIBLES AU FORM
        let categorySelector = document.querySelector('#skillForm select.categorySelector');
        for(let current in categories){
            let category = categories[current];
            let option = document.createElement('option');
            option.classList.add(category['idCategorie']);
            option.value = category['idCategorie'];
            option.innerHTML = category['nom'];
            categorySelector.append(option);
        }

        getSkill(idSkill).then(skillDetails => {
            document.querySelector('.skillForm .name').value = skillDetails['nom'];
    
            //document.querySelector('.skillForm .icone').value = skillDetails['icone'];
    
            let categorySelector = document.querySelector('.skillForm .categorySelector');
            let count = 0;
            let optionSelected = false;
            while(!optionSelected){
                if(categorySelector.options[count].value == skillDetails['idCategorie']){
                    categorySelector.options[count].selected = true;
                    optionSelected = true;
                }
                count++;
            }

            document.querySelector('.skillForm .description').value = skillDetails['description'];

            displaySection(SKILL_FORM_SECTION);
        });
    });
}

function modifySkillFormSubmitted(idSkill){
    //evt.preventDefault();
    console.log(idSkill);
    document.querySelector('form.skillForm .submit.button').disabled = true;
    updateSkillAndRefresh(idSkill)
    .then(skills => {
        displaySkillsDashboard(skills);
        hideSection(SKILL_FORM_SECTION);
        document.querySelector('form.skillForm .submit.button').disabled = false;
    });
}

/*###################################################*/
/*################# GALLERY SECTIONS ################*/
/*###################################################*/

/*---------------- GALLERY DASHBOARD ----------------*/
function displayGalleryDashboard(projects){
    let projectList = document.getElementById('projectList');
    if(projectList){
        projectList.remove();
    }

    GALLERY_CONTAINER.append(generateGalleryDashboard(projects));
}

function updateGalleryDashboard(evt){
    if(!this.classList.contains('selected')){
        document.querySelector('#gallery .filter.selected').classList.remove('selected');
        this.classList.add('selected');

        if(this.dataset.idCategory == "all"){
            getAllProjects().then(projects => {
                displayGalleryDashboard(projects);
            });
        }else{
            getAllProjectsFromACategory(this.dataset.idCategory).then(projects => {
                displayGalleryDashboard(projects);
            });
        }
    }
}

function generateGalleryDashboard(projects){
    let projectList = document.createElement('ul');
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

    return projectList;
}

/*------------------ PROJECT FORM ------------------*/
function displayProjectForm(){
    getAllCategories()
    .then(categories => {
        // RÉINITIALISATION DU FORM
        let projectForm = document.querySelector('form.projectForm');
        projectForm.reset();
        projectForm.removeEventListener('submit', modifyProjectFormSubmitted);
        projectForm.removeEventListener('submit', addProjectFormSubmitted);
        projectForm.addEventListener('submit', addProjectFormSubmitted);

        // AJOUT DES DIFFÉRENTES CATÉGORIES DISPONIBLES AU FORM
        let categorySelector = document.querySelector('#projectForm select.categorySelector');
        for(let current in categories){
            let category = categories[current];
            let option = document.createElement('option');
            option.classList.add(category['idCategorie']);
            option.value = category['idCategorie'];
            option.innerHTML = category['nom'];
            categorySelector.append(option);
        }

        displaySection(PROJECT_FORM_SECTION);
    });
}

function addProjectFormSubmitted(evt){
    evt.preventDefault();
    document.querySelector('form.projectForm .submit.button').disabled = true;
    addProjectAndRefresh()
    .then(projects => {
        document.querySelector('form.projectForm .submit.button').disabled = false;
        displaySkillsDashboard(projects);
        displayOrHideSection(PROJECT_FORM_SECTION);
    });
}

function displayFilledProjectForm(idProject){
    getAllCategories()
    .then(categories => {
        // RÉINITIALISATION DU FORM
        let projectForm = document.querySelector('form.projectForm');
        projectForm.reset();
        projectForm.removeEventListener('submit', modifyProjectFormSubmitted);
        projectForm.removeEventListener('submit', addProjectFormSubmitted);
        projectForm.addEventListener('submit', function(evt){
            evt.preventDefault();
            modifyProjectFormSubmitted(idProject);
            }
        );

        // AJOUT DES DIFFÉRENTES CATÉGORIES DISPONIBLES AU FORM
        let categorySelector = document.querySelector('#projectForm select.categorySelector');
        for(let current in categories){
            let category = categories[current];
            let option = document.createElement('option');
            option.classList.add(category['idCategorie']);
            option.value = category['idCategorie'];
            option.innerHTML = category['nom'];
            categorySelector.append(option);
        }

        getProject(idProject).then(projectDetails => {
            let projectInfos = projectDetails['infos'];
            
            document.querySelector('.projectForm .title').value = projectInfos['titre'];

            document.querySelector('.projectForm .date').value = projectInfos['date'];

            document.querySelector('.projectForm .technique').value = projectInfos['technique'];

            document.querySelector('.projectForm .description').value = projectInfos['description'];

            let projectMedia = projectDetails['media'][0];

            // IF TEMPORAIRE !!!
            if(projectMedia){
                document.querySelector('.projectForm .media').value = projectMedia['source'];
                document.querySelector('.projectForm .media').dataset.id = projectMedia['idMedia'];
            }

            displaySection(PROJECT_FORM_SECTION);
        });
    });
}

function modifyProjectFormSubmitted(evt){
    evt.preventDefault();
    document.querySelector('form.projectForm .submit.button').disabled = true;
    updateProjectAndRefresh(idProject)
    .then(projects => {
        document.querySelector('form.projectForm .submit.button').disabled = false;
        displaySkillsDashboard(projects);
        hideSection(PROJECT_FORM_SECTION);
        //displayOrHideSection(PROJECT_FORM_SECTION);
    });
}

/*###################################################*/
/*##################### GENERAL #####################*/
/*###################################################*/

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
           displaySkillsDashboard(skillsByCategories);
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
        deleteProjectAndRefresh(this.dataset.idProject)
        .then(projects => {
           displayGalleryDashboard(projects);
        });
    });

    return deleteButton;
}
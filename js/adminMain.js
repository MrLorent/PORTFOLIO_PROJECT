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

    // FORMS
    getAllCategories()
    .then(categories => {
        addCategoriesToForms(categories);
    });

    // CATEGORY FORM
    let categoryForms = document.querySelectorAll('.categoryForm');
    categoryForms.forEach(categoryForm => {
        categoryForm.addEventListener('submit', (evt)=>{
            evt.preventDefault();
            addCategoryAndRefresh()
            .then(categories => {
                categoryForm.reset();
                addCategoriesToForms(categories);
            });
        });
    });

    // SKILL FORM
    let iconeInput = document.querySelector('.skillForm input.icone');
    iconeInput.addEventListener('change', () => {
        imageUploaded('skillForm');
    });

    // PROJECT FORM
    let addCategorieButton = document.querySelector('.categories .button.add');
    addCategorieButton.addEventListener('click', addCategoryToProject);

    /*###################################################*/
    /*################## SKILLS SECTION #################*/
    /*###################################################*/
    getAllSkillsByCategory().then(skillsByCategories => {
        let addSkillButton = document.querySelector('#skills .add.button');
        addSkillButton.addEventListener('click', displaySkillForm);
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
function displaySkillForm(){
    // RÉINITIALISATION DU FORM
    let skillForm = document.querySelector('form.skillForm');
    skillForm.reset();
    skillForm.removeEventListener('submit', modifySkillFormSubmitted);
    skillForm.removeEventListener('submit', addSkillFormSubmitted);
    skillForm.addEventListener('submit', addSkillFormSubmitted);

    let iconePreview = document.querySelector('.skillForm .preview');
    removeAllChildren(iconePreview);
    let defaultIconeText = document.createElement('span');
    defaultIconeText.textContent = "Aucun fichier sélectionné";
    iconePreview.append(defaultIconeText);

    displaySection(SKILL_FORM_SECTION);
    document.querySelector('#categoryForm').classList.add('displayed');
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
    // RÉINITIALISATION DU FORM
    let skillForm = document.querySelector('form.skillForm');
    skillForm.reset();
    skillForm.removeEventListener('submit', modifySkillFormSubmitted);
    skillForm.removeEventListener('submit', addSkillFormSubmitted);
    skillForm.addEventListener('submit', function(evt){
        evt.preventDefault();
        modifySkillFormSubmitted(idSkill);
    });

    getSkill(idSkill).then(skillDetails => {
        document.querySelector('.skillForm .name').value = skillDetails['nom'];

        // PRÉVISUALISATION DE L'ICONE DE LA COMPÉTENCE
        let divPreview = document.querySelector('.skillForm .preview');
        removeAllChildren(divPreview);
        let icone = document.createElement('img');
        icone.src = skillDetails['icone'];
        icone.alt = "Prévisualisation de l'icone de la compétence "+skillDetails['nom']+".";
        divPreview.append(icone);

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
        document.querySelector('#categoryForm').classList.add('displayed');
    });
}

function modifySkillFormSubmitted(idSkill){
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

function updateGalleryDashboard(){
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
    let categoriesList = document.querySelector('.categoriesList');
    removeAllChildren(categoriesList);

    getAllCategories()
    .then(categories => {
        // RÉINITIALISATION DU FORM
        let projectForm = document.querySelector('form.projectForm');
        projectForm.reset();
        projectForm.removeEventListener('submit', modifyProjectFormSubmitted);
        projectForm.removeEventListener('submit', addProjectFormSubmitted);
        projectForm.addEventListener('submit', addProjectFormSubmitted);

        // AJOUT DES DIFFÉRENTES CATÉGORIES DISPONIBLES AU FORM
        addCategoriesToAForm(categories, 'projectForm');

        displaySection(PROJECT_FORM_SECTION);
        document.querySelector('#categoryForm').classList.add('displayed');
    });
}

function addCategoryToProject(){
    let categorieList = document.querySelector('.categoriesList');
    let categorySelector = document.querySelector('#projectForm .categorySelector');
    let categorySelected = categorySelector.options[categorySelector.selectedIndex];

    let category = document.createElement('span');
    category.classList.add('category');
    category.dataset.idCategory = categorySelected.value;
    category.innerHTML = categorySelected.innerHTML;
    categorySelected.remove();
    
    let cross = document.createElement('img');
    cross.src = "./css/img/cross.png";
    cross.alt = "Icone de croix";
    cross.addEventListener('click', () => {
        categorySelector.append(categorySelected);
        category.remove();
    });
    category.append(cross);

    categorieList.append(category);
}

function addProjectFormSubmitted(evt){
    evt.preventDefault();
    document.querySelector('form.projectForm .submit.button').disabled = true;
    addProjectAndRefresh()
    .then(projects => {
        document.querySelector('form.projectForm .submit.button').disabled = false;
        displayGalleryDashboard(projects);
        hideSection(PROJECT_FORM_SECTION);
    });
}

function displayFilledProjectForm(idProject){
    getAllCategories().then(categories => {
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

        let categoriesList = document.querySelector('.categoriesList');
        removeAllChildren(categoriesList);

        // AJOUT DES DIFFÉRENTES CATÉGORIES DISPONIBLES AU FORM
        addCategoriesToAForm(categories, 'projectForm');

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
            document.querySelector('#categoryForm').classList.add('displayed');
        });
    });
    
}

function modifyProjectFormSubmitted(idProject){
    document.querySelector('form.projectForm .submit.button').disabled = true;
    updateProjectAndRefresh(idProject)
    .then(projects => {
        document.querySelector('form.projectForm .submit.button').disabled = false;
        displaySkillsDashboard(projects);
        hideSection(PROJECT_FORM_SECTION);
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

function imageUploaded(currentForm){
    let divPreview = document.querySelector('.'+currentForm+' .preview');
    removeAllChildren(divPreview);

    let img = document.querySelector('.'+currentForm+' .icone').files[0];

    let fileReader = new FileReader();
    fileReader.readAsDataURL(img);

    fileReader.onload = () => {
        let fileURL = fileReader.result;

        let img = document.createElement('img');
        img.src = fileURL;
        img.alt = "Prévisualisation de l'icone de compétence.";
        divPreview.append(img);
    }
    
}

function addCategoriesToForms(categories){
    let categorySelectors = document.querySelectorAll('select.categorySelector');

    categorySelectors.forEach(categorySelector => {
        removeAllChildren(categorySelector);
        for(let current in categories){
            let category = categories[current];
            let option = document.createElement('option');
            option.classList.add(category['idCategorie']);
            option.value = category['idCategorie'];
            option.innerHTML = category['nom'];
            categorySelector.append(option);
        }
    });

    let projectCategories = document.querySelectorAll('.categoriesList .category');

    if(projectCategories){
        let projectCategorySelector = document.querySelector('.categories .categorySelector');

        projectCategories.forEach(category => {
            let remove = false;
            let count = 0;
            
            while(!remove){
                if(projectCategorySelector.options[count].value == category.dataset.idCategory){
                    projectCategorySelector.options[count].remove();
                    remove = true;
                }
                count++;
            }
        });
    }
}

function addCategoriesToAForm(categories, idForm){
    let categorySelector = document.querySelector('#'+idForm+' .categorySelector');

    removeAllChildren(categorySelector);
    for(let current in categories){
        let category = categories[current];
        let option = document.createElement('option');
        option.classList.add(category['idCategorie']);
        option.value = category['idCategorie'];
        option.innerHTML = category['nom'];
        categorySelector.append(option);
    }
}
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

    // SKILLS_SECTION
    getAllSkillsByCategory().then(skillsByCategories => {
        generateSkillsDashBoard(skillsByCategories);
    });
});

// CONTROLEURS
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
        skill.append(generateModifyButton(skill.dataset.idSkill));
        skill.append(generateDeleteButton(skill.dataset.idSkill));
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

        SKILL_FORM_SECTION.append(form);

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

            generateBackButton(SKILL_FORM_SECTION);
            displayOrHideSection(SKILL_FORM_SECTION);
        });
    });
}

function generateModifyButton(idSkill){
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

function generateDeleteButton(idSkill){
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
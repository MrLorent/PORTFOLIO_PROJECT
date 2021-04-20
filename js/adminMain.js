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

    let skills = document.querySelectorAll('li.skill');

    skills.forEach(skill => {
        skill.append(generateModifyButton(skill.dataset.idSkill));
        skill.append(generateDeleteButton(skill.dataset.idSkill));
    });
}

function displaySkillFormSection(idSkill){
    console.log(idSkill);
    getSkill(idSkill).then(skillDetails => {
        SKILL_FORM_SECTION.append(generateSkillForm());

        generateBackButton(SKILL_FORM_SECTION);
        displayOrHideSection(SKILL_FORM_SECTION);
    });
}

function generateSkillForm(){
    // CRÉATION DU FORM
    let form = document.createElement('form');

    // CRÉATION D'UN INPUT
    // Initialisation du label
    let nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'nom';
    nameLabel.innerHTML = "Nom de la compétence :";
    // Initialisation de l'input
    let nameInput = document.createElement('input');
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
    iconeInput.type = 'text';
    iconeInput.name = 'icone';
    // Ajout au form
    form.append(iconeLabel);
    form.append(iconeInput);

    // CRÉATION D'UN INPUT
    // Initialisation du label
    let descriptionLabel = document.createElement('label');
    descriptionLabel.htmlFor = 'description';
    descriptionLabel.innerHTML = "Description de la compétence :";
    // Initialisation de l'input
    let textarea = document.createElement('textarea');
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

function generateModifyButton(idSkill){
    let modifyButton = document.createElement('span');
    modifyButton.classList.add('button');
    modifyButton.classList.add('modify');
    modifyButton.dataset.idSkill = idSkill;
    modifyButton.innerHTML = "Modifier";
    modifyButton.addEventListener('click', function(){
        displaySkillFormSection(this.dataset.idSkill);
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
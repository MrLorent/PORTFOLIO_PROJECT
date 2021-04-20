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

function prepareSkillForm(categories){
    let skillName = document.querySelector('form #skillName');
    skillName.value = "";

    let skillIcone = document.querySelector('form #skillIcone');
    skillIcone.value = "";

    let categorySelector = document.getElementById('categorySelector');
    removeAllChildren(categorySelector);
    for(let current in categories){
        let category = categories[current];
        let option = document.createElement('option');
        option.classList.add(category['idCategorie']);
        option.value = category['idCategorie'];
        option.innerHTML = category['nom'];
        categorySelector.append(option);
    }

    let description = document.getElementById('skillDescription');
    description.value = "";
}

function displayFilledSkillForm(idSkill){
    getAllCategories().then(categories => {

        prepareSkillForm(categories);

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
"use strict"

// CONSTANTES
var SKILLS_SECTION;
var SKILL_SECTION;
var SKILL_FORM_SECTION;
var GALLERY_SECTION;
var PROJECT_SECTION;

// CONTROLLERS
function generateSkillsAsList(skillsByCategories){
    // SUPPRESSION DES ÉLÉMENTS PRÉCÉDENTS
    removeAllChildren(SKILLS_SECTION);

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
            let skillName = document.createElement('span');
            skillName.classList.add('skillName');
            skillName.dataset.idSkill = tabSkill['idSkill'];
            skillName.addEventListener('click', displaySkill);
            skillName.innerHTML = tabSkill['name'];
            liSkill.append(skillName);
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

function removeAllChildren(parent){
    if(parent.firstElementChild){
        do{
            parent.removeChild(parent.firstElementChild);
        }while(parent.firstElementChild);
    }
}

function generateBackButton(currentSection){
    var backButton = document.createElement('span');
    backButton.classList.add('button');
    backButton.classList.add('back');
    backButton.innerHTML = 'Retour';
    backButton.addEventListener('click',()=>{
        displayOrHideSection(currentSection);
    });
    currentSection.append(backButton);
}

function displayOrHideSection(section){
    let body = document.querySelector('body');

    section.classList.toggle('displayed');
    body.classList.toggle('locked');
}
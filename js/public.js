"use strict";

/**
 * FONCTION MAIN
 * Fonction lancer dès que la page HTML est chargée
 */


document.addEventListener('DOMContentLoaded', function(){
    const SKILL_SECTION = document.getElementById('skills');
    const GALLERY_SECTION = document.getElementById('gallery');

    getAllSkillsByCategory().then(skillsByCategories => {
        SKILL_SECTION.append(generateSkillsAsList(skillsByCategories));
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

    function displaySkill(){
        getSkill(this.dataset.idSkill);
    }

    return ulCategories;
}
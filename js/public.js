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
    deleteACategoryAndRefresh("15");
});

// CONTROLEURS
function generateSkillsAsList(skillsByCategories){
    skillsByCategories.forEach(skillCategorie => {
        let ulCategories = document.createElement('ul');
        let liCategorie = document.createElement('li');
    });
}

// INJECTEURS
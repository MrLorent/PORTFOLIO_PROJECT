"use strict";


/**
 * FONCTION MAIN
 * Fonction lancer dès que la page HTML est chargée
 */
document.addEventListener('DOMContentLoaded', function(){
    //getAllCategories();
    //getAllProjects();
    //getAllProjectsCategories();
    //getProject("1");
    //getAllSkillsByCategory();
    document.getElementById('button').onclick = event => {
        addCategoryAndRefresh();
    }
});

// MODELS

// CONTROLEURS

// INJECTEURS
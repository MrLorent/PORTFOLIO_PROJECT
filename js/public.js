"use strict";


/**
 * FONCTION MAIN
 * Fonction lancer dès que la page HTML est chargée
 */
document.addEventListener('DOMContentLoaded', function(){
    getCategoryProjects(11); //La valeur en paramètre sera l'id de la catégorie sur laquelle l'utilisateur a cliqué
    getAllProjects();
    getAllProjectsCategories();
    getAllCategories();
    //getAllProjects();
    //getAllProjectsCategories();
    //getProject("1");
});

// MODELS

// CONTROLEURS

// INJECTEURS
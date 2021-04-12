"use strict";


/**
 * FONCTION MAIN
 * Fonction lancer dès que la page HTML est chargées
 */
document.addEventListener('DOMContentLoaded', function(){
    getCategoryProjects(11); //La valeur en paramètre sera l'id de la catégorie sur laquelle l'utilisateur a cliqué
    getAllProjects();
    getAllProjectsCategories();
});

// MODELS

// CONTROLEURS

// INJECTEURS
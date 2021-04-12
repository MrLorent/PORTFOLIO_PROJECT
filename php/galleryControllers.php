<?php
// IMPORTATION DES MODELS
require_once('skillsModels');

// CONTROLEURS

function getCategoryProjectsAsJSON($idCategory){
    return json_encode(getCategoryProjects($idCategory));
}
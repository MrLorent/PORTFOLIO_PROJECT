<?php
// IMPORTATION DES MODELS
require_once('galleryModels.php');

// CONTROLEURS

function getCategoryProjectsAsJSON($idCategory){
    return json_encode(getCategoryProjects($idCategory));
}

function getAllProjectsAsJSON() {
    return json_encode(getAllProjects());
}

function getAllProjectsCategoriesAsJSON() {
    return json_encode(getAllProjectsCategories());
}

function getProjectAsJSON($idProject) {
    $project = array(
        "Infos" => getProjectInfos($idProject),
        "Media" => getProjectMedia($idProject),
        );
        
    return json_encode($project);
}
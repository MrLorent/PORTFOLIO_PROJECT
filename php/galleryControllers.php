<?php
// IMPORTATION DES MODELS
require_once('galleryModels.php');

// CONTROLEURS

function getAllProjectsFromACategoryAsJSON($idCategory){
    return json_encode(getAllProjectsFromACategory($idCategory));
}

function getAllProjectsAsJSON() {
    return json_encode(getAllProjects());
}

function getAllProjectsCategoriesAsJSON() {
    return json_encode(getAllProjectsCategories());
}

function getProjectAsJSON($idProject) {
    $project = array(
        "infos" => getProjectInfos($idProject),
        "media" => getProjectMedia($idProject),
        );
        
    return json_encode($project);
}

function deleteProjectAndRefresh($idProject){
    deleteProject($idProject);
    return json_encode(getAllProjects());
}

function getAllCategoriesOfAProjectAsJSON($idProject) {
    return json_encode(getAllCategoriesOfProject($idProject));
}


//V1 avec 1 catégorie et 1 media, il faudra ensuite faire des tableaux de tableaux et des foreach
function addProjectAndRefresh($form){
    $projet=json_decode($form, true);
    addProject($projet['titre'], $projet['date'], $projet['technique'], $projet['description'], $projet['miniature'], $projet['ordre']);
    foreach($projet['media'] as $media){
        addMedia($media['source'], $media['legende'], $media['type'], $projet['titre']);
    }
    foreach($projet['categorie'] as $value){
        linkProjectToCategory($projet['titre'], $value);
    }
    return json_encode(getAllProjects());
}

function updateProjectAndRefresh($form){
    //echo $form;
    $project = json_decode($form, true);
    //updateProject($project['titre'],13);
    return json_encode(getAllProjects());
}
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

function deleteProjectAndRefresh($idProject){
    deleteProject($idProject);
    return json_encode(getAllProjects());
}


//V1 avec 1 catégorie et 1 media, il faudra ensuite faire des tableaux de tableaux et des foreach
function addProjectAndRefresh($form){
    $projet=json_decode($form, true);
    addProject($projet['titre'], $projet['date'], $projet['technique'], $projet['description'], $projet['miniature'], $projet['ordre']);
    addMedia($projet['source'], $projet['legende'], $projet['type'], $projet['titre']);
    linkProjectToCategory($projet['titre'], $projet['categorie']);
    return json_encode(getAllProjects());
}

function updateProjectAndRefresh($idProject, $form, $formMedia, $idMedia){
    $project = json_decode($form, true);
    $medias = json_decode($formMedia, true);
    updateProject($project['titre'],$project['date'],$project['technique'],$project['description'],$project['miniature'],$project['ordre'],$idProject);
    updateMedia($medias['source'], $medias['legende'],$medias['type'],$idProject, $idMedia);
}
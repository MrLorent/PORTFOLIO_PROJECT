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

function updateProjectAndRefresh($idProject, $form, $formMedia, $idMedia){
    $project = json_decode($form, true);
    $medias = json_decode($formMedia, true);
    updateProject($project['titre'],$project['date'],$project['technique'],$project['description'],$project['miniature'],$project['ordre'],$idProject);
    updateMedia($medias['source'], $medias['legende'],$medias['type'],$idProject, $idMedia);
}
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

function addProjectAndRefresh($titre, $date, $technique, $description, $miniature, $ordre, $source, $legende, $type, $nomCategorie){
    addProject($titre, $date, $technique, $description, $miniature, $ordre);
    addMedia($source, $legende, $type, $titre);
    linkProjectToCategory($titre, $nomCategorie); //faire un foreach ou on enverrait au lieu de $nomCategorie un tableau de noms de categories
    return json_encode(getAllProjects());
}
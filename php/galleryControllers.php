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

function getAllCategoriesOfAProjectAsJSON($idProject) {
    return json_encode(getAllCategoriesOfProject($idProject));
}

function deleteProjectAndRefresh($idProject){
    deleteProject($idProject);
    return json_encode(getAllProjects());
}


function addProjectAndRefresh(){
    $projet=$_POST;
    $files=$_FILES;
    move_uploaded_file($files['miniature']['tmp_name'], '../img/gallery/miniatures/'.basename($files['miniature']['name']));
    $cheminfichier='./img/gallery/miniatures/'.basename($files['miniature']['name']);
    addProject($projet['titre'], $projet['date'], $projet['technique'], $projet['description'], $cheminfichier, $projet['ordre']);
    foreach($projet['categorie'] as $value){
        linkProjectToCategory($projet['titre'], $value);
    }
    return json_encode(getAllProjects());
}



function updateProjectAndRefresh($form, $idProject){
    //echo $form;
    $project = json_decode($form, true);
    updateProject($project['titre'], $project['date'], $project['technique'], $project['description']/*, $project['miniature'], $project['ordre']*/,$idProject);
    UpdateProjectToCategory($idProject, $project['categorie']);
    UpdateMedia($project['media'],$idProject, $project['mediaId']);
}
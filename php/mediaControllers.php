<?php
// IMPORTATION DES MODELS
require_once('mediaModels.php');

// CONTROLEURS

function getMediaAsJSONbyIDProject($idProject) {
       return json_encode(getProjectMedia($idProject));
}

function UpdateMediumAndRefresh($form, $idMedium){
    $medium = $_POST;
    $idProject = $medium['idProject'];
    move_uploaded_file($_FILES['icone']['tmp_name'], '../img/gallery/'. $idProject . '/' .basename($_FILES['icone']['name']));
    $cheminfichier ='./img/gallery/'. $idProject . '/' .basename($_FILES['icone']['name']);
    
    //UpdateMedia($project['media'],$idProject, $project['mediaId']);
    UpdateMedium($cheminfichier, $idProject, $idMedium);

    //return json_encode($_FILES);
    return getMediaAsJSONbyIDProject($idProject);
}
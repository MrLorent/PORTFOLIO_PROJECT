<?php
// IMPORTATION DES MODELS
require_once('mediaModels.php');

// CONTROLEURS

function UpdateMediumAndRefresh($form, $idProject){
    $medium = $_POST;

    move_uploaded_file($_FILES['icone']['tmp_name'], '../img/gallery/'. $idProject . '/' .basename($_FILES['icone']['name']));
    $cheminfichier ='./img/gallery/'. $idProject . '/' .basename($_FILES['icone']['name']);
    
    //UpdateMedia($project['media'],$idProject, $project['mediaId']);
    UpdateMedium($cheminfichier, $idProject, $medium['mediaId']);

    return json_encode($_FILES);
    //return getAllSkillsByCategoryAsJSON();
}
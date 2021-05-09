<?php
// IMPORTATION DES MODELS
require_once('skillsModels.php');

// CONTROLEURS

function getAllSkillsByCategoryAsJSON(){
    $categories = getAllSkillCategories();

    foreach($categories as $category){
        $skillsByCategory[$category['nom']]['idCategory'] = $category['idCategorie'];

        $skills = getAllSkillsFromACategory($category['idCategorie']);
        $skillsByCategory[$category['nom']]['skills'] = $skills;

    }

    return json_encode($skillsByCategory);
}

function getSkillAsJSON($idSkill){
    return json_encode(getSkill($idSkill));
}

function deleteSkillAndRefresh($idSkill) {
    deleteSkill($idSkill);
}

function addSkillAndRefresh($skillInfo) {
    $skill = $_POST;

    move_uploaded_file($_FILES['icone']['tmp_name'], '../img/skills/'.basename($_FILES['icone']['name']));
    $cheminfichier ='./img/skills/'.basename($_FILES['icone']['name']);
    
    addSkill($skill['outil'], $skill['description'], $cheminfichier, $skill['categorie']);

    //return json_encode($_FILES);
    return getAllSkillsByCategoryAsJSON();
}

function updateSkillAndRefresh($skillInfo, $idSkill) {
    $skill = json_decode($skillInfo, true);

    move_uploaded_file($_FILES['icone']['tmp_name'], '../img/skills/'.basename($_FILES['icone']['name']));
    $cheminfichier ='./img/skills/'.basename($_FILES['icone']['name']);

    $directory = "./img/skills";
    $images = glob($directory . "/*.png");

    foreach($images as $image)
    {
        if ($cheminfichier==$image)
        {
            // delete image écraser image ac la nvle 
            
        }
     
    }    
    updateSkill($skill['outil'], $skill['description'], $cheminfichier['icone'], $skill['categorie'], $idSkill);
    
}
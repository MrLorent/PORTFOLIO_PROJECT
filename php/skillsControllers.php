<?php
// IMPORTATION DES MODELS
require_once('skillsModels.php');

// CONTROLEURS

function getAllSkillsByCategoryAsJSON(){
    $categories = getAllSkillCategories();
    
    foreach($categories as $category){
        $skillsByCategory[$category['nom']]['idCategory'] = $category['idCategorie'];

        $skills = getAllSkillsFromACategory($category['idCategorie']);
        $count = 0;
        
        foreach($skills as $skill){
            $skillList[$count]['idSkill'] = $skill['idComp'];
            $skillList[$count]['name'] = $skill['outil'];
            $count++;
        }

        $skillsByCategory[$category['nom']]['skills'] = $skillList;
    }

    return json_encode($skillsByCategory);
}

function deleteSkillAndRefresh($idSkill) {
    deleteSkill($idSkill);
}

function addSkillAndRefresh($skillInfo) {
    $skill = json_decode($skillInfo, true);
    addSkill($skill['outil'], $skill['description'], $skill['icone'], $skill['categorie']);
}


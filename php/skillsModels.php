<?php
// IMPORTATION DE LA FONCTION "CONNECTION()"
require_once('connection.php');

// ACCESSEURS EN LECTURE
// Fonctions permettant de récupérer les informations
// de la BDD (commencent par "get...")

function getAllSkillsCategories(){
    $cnx = connection();
    $result = $cnx->query('SELECT DISTINCT categories.nom
    FROM categories, competences 
    WHERE categories.idCategorie = competences.idCategorie');
    return $result->fetchAll();
}

function getAllSkillsByCategory($name){
    $cnx = connection();
    $rqt = $cnx->prepare('SELECT outil
    FROM competences, categories
    WHERE categories.idCategorie = competences.idCategorie
    AND categories.nom = ?');
    $rqt->execute(array($name));
    $result = $rqt->fetchAll();
    return $result;
}


// ACCESSEURS EN ÉCRITURE
// Fonctions permettant de modifier les informations
// de la BDD (commencent par "set...")



// MÉTHODES
// Fonctions permettant de manipuler les informations
// de la BDD en règles générales
// (commencent par "add..." ou "delete..." par exemple)

function deleteSkillAndRefresh($idSkill) {
    
}
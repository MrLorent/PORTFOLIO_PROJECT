<?php
// IMPORTATION DE LA FONCTION "CONNECTION()"
require_once('connection.php');

// ACCESSEURS EN LECTURE
// Fonctions permettant de récupérer les informations
// de la BDD (commencent par "get...")

function getAllSkillCategories(){
    $cnx = connection();
    $result = $cnx->query('SELECT DISTINCT categories.idCategorie, categories.nom
    FROM categories, competences 
    WHERE categories.idCategorie = competences.idCategorie');
    
    return $result->fetchAll(PDO::FETCH_ASSOC);
}

function getAllSkillsFromACategory($idCategorie){
    $cnx = connection();
    $rqt = $cnx->prepare('SELECT competences.idComp, competences.outil
    FROM competences, categories
    WHERE categories.idCategorie = competences.idCategorie
    AND categories.idCategorie = ?');
    $rqt->execute(array($idCategorie));
    $result = $rqt->fetchAll(PDO::FETCH_ASSOC);
    
    return $result;
}


// ACCESSEURS EN ÉCRITURE
// Fonctions permettant de modifier les informations
// de la BDD (commencent par "set...")



// MÉTHODES
// Fonctions permettant de manipuler les informations
// de la BDD en règles générales
// (commencent par "add..." ou "delete..." par exemple)

function deleteSkill($idSkill) {
    $cnx = connection();
    $rqt = $cnx->prepare('DELETE FROM competences WHERE idComp = ?');
    $rqt->execute(array($idSkill));
}

function addSkill($outil, $description, $icone, $Categorie) {
    $cnx = connection();
    $rqt = $cnx->prepare('INSERT INTO competences VALUES (NULL, ? ,? , ?, (SELECT idCategorie FROM categories WHERE nom=?));');
    $rqt->execute(array($outil, $description, $icone, $Categorie));
}
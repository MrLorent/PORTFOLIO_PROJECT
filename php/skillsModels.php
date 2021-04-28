<?php
// IMPORTATION DE LA FONCTION "CONNECTION()"
require_once('connection.php');

// ACCESSEURS EN LECTURE
// Fonctions permettant de récupérer les informations
// de la BDD (commencent par "get...")

function getSkill($idSkill){
    $cnx = connection();
    $stmt = $cnx->prepare("SELECT idComp, idCategorie, outil AS nom, description, icone FROM competences WHERE idComp=?");
    $stmt->execute(array($idSkill));
    $skill = $stmt->fetch(PDO::FETCH_ASSOC);

    return $skill;
}

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

function updateSkill($outil, $description, $icone, $idCategorie, $idSkill) {
    $cnx = connection();
    $rqt2 = $cnx->prepare('UPDATE competences 
                        SET outil = ?, description = ?, icone = ?, idCategorie = ?
                        WHERE idComp = ?');
    $rqt2->execute(array($outil, $description, $icone, $idCategorie, $idSkill));

}

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
    $rqt = $cnx->prepare('INSERT INTO competences VALUES (NULL, ? ,? , ?, ?);');
    $rqt->execute(array($outil, $description, $icone, $Categorie));
}
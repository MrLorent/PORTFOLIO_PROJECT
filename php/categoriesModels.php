<?php
// IMPORTATION DE LA FONCTION "CONNECTION()"
require_once('connection.php');

// ACCESSEURS EN LECTURE
// Fonctions permettant de récupérer les informations
// de la BDD (commencent par "get...")
function getAllCategories() {
    $cnx = connection();
    $result = $cnx->query('select * from categories');
    return $result->fetchall(PDO::FETCH_ASSOC);
}

// ACCESSEURS EN ÉCRITURE
// Fonctions permettant de modifier les informations
// de la BDD (commencent par "set...")



// MÉTHODES
// Fonctions permettant de manipuler les informations
// de la BDD en règles générales
// (commencent par "add..." ou "delete..." par exemple)
function deleteCategory($idCategory) {
    $cnx = connection();
    $rqt = $cnx->prepare('delete from categories where name=?');
    $rqt->execute(array($idCategory));
    return getAllCategories();
}
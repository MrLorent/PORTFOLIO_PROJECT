<?php
// IMPORTATION DE LA FONCTION "CONNECTION()"
require_once('connection.php');

// ACCESSEURS EN LECTURE
// Fonctions permettant de récupérer les informations
// de la BDD (commencent par "get...")

function getCategoryProjects($idCategory){
    $cnx = connection();
	$result = $cnx->query("SELECT p.miniature, p.titre FROM projets as p JOIN concerner as c ON c.idProjet=p.idProjet WHERE c.idCategorie=$idCategory");
	/*if ($result!=false){
		return $result->fetchall(PDO::FETCH_ASSOC);
    }*/
    return $result->fetchall(PDO::FETCH_ASSOC);
}



// ACCESSEURS EN ÉCRITURE
// Fonctions permettant de modifier les informations
// de la BDD (commencent par "set...")



// MÉTHODES
// Fonctions permettant de manipuler les informations
// de la BDD en règles générales
// (commencent par "add..." ou "delete..." par exemple)
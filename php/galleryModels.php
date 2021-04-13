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
    return $result->fetchall();
}
function getAllProjects() {
    $cnx = connection();
    $result = $cnx->query("SELECT idProjet, titre, miniature, ordre FROM `projets`");
	return $result->fetchAll(PDO::FETCH_ASSOC);
}

function getAllProjectsCategories() {
    $cnx = connection();
    $result = $cnx->query("SELECT DISTINCT cat.idCategorie, nom FROM `categories` AS cat JOIN `concerner` ON concerner.idCategorie = cat.idCategorie");
	return $result->fetchAll(PDO::FETCH_ASSOC);
}

function getProjectInfos($idProject) {
    $cnx = connection();
    $rqt = $cnx->prepare("SELECT * FROM `projets` WHERE idProjet=?");
	$rqt->execute(array($idProject));
    $infoProject = $rqt->fetchAll(PDO::FETCH_ASSOC);
    return $infoProject;
}

function getProjectMedia($idProject) {
    $cnx = connection();
    $rqt = $cnx->prepare("SELECT * FROM `media` WHERE idProjet=?");
	$rqt->execute(array($idProject));
    $mediaProject = $rqt->fetchAll(PDO::FETCH_ASSOC);
    return $mediaProject;
}


// ACCESSEURS EN ÉCRITURE
// Fonctions permettant de modifier les informations
// de la BDD (commencent par "set...")



// MÉTHODES
// Fonctions permettant de manipuler les informations
// de la BDD en règles générales
// (commencent par "add..." ou "delete..." par exemple)

function deleteProject($idProject){
    $cnx = connection();

    $rqt = $cnx->prepare('DELETE FROM concerner WHERE idProjet = ?');
    $rqt->execute(array($idProject));

    $rqtMedia = $cnx->prepare('DELETE FROM media WHERE idProjet = ?');
    $rqtMedia->execute(array($idProject));

    $rqtProject = $cnx->prepare('DELETE FROM projets WHERE idProjet = ?');
    $rqtProject->execute(array($idProject));
    
}

function updateProject($titre,$date,$technique,$description,$miniature,$ordre,$idProject){
    $cnx = connection();
    $rqtProject = $cnx->prepare('UPDATE projets
                                SET titre = ?, date = ?,technique = ?, description = ?,miniature = ?, ordre = ?
                                WHERE idProjet = ?');
    $rqtProject->execute(array($titre,$date,$technique,$description,$miniature,$ordre,$idProject));
}

function updateMedia($source, $legende,$type,$idProject, $idMedias){
    $cnx = connection();
    $rqtMedia = $cnx->prepare('UPDATE medias
                                SET source = ?, legende = ?,type = ?
                                WHERE idProjet = ?
                                AND idMedia = ?');
    $rqtMedia->execute(array($source, $legende,$type,$idProject, $idMedias));
}

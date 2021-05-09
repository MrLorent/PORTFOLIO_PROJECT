<?php
// IMPORTATION DE LA FONCTION "CONNECTION()"
require_once('connection.php');

function getProjectMedia($idProject) {
    $cnx = connection();
    $rqt = $cnx->prepare("SELECT * FROM `media` WHERE idProjet=?");
	$rqt->execute(array($idProject));
    $mediaProject = $rqt->fetchAll(PDO::FETCH_ASSOC);
    return $mediaProject;
}

function UpdateMedium($source,$idProject, $idMedium){
    $cnx = connection();
    $rqtMedia = $cnx->prepare('UPDATE media
                                SET source = ?
                                WHERE idProjet = ?
                                AND idMedia = ?');
    $rqtMedia->execute(array($source,$idProject, $idMedium));
}
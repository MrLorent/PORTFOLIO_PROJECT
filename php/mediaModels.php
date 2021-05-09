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

function getMedium($idMedium) {
    $cnx = connection();
    $rqt = $cnx->prepare("SELECT * FROM `media` WHERE idMedia=?");
	$rqt->execute(array($idMedium));
    $medium = $rqt->fetchAll(PDO::FETCH_ASSOC);
    return $medium;
}

function addMedium($typefichier, $extension) {
       // creation du medium
       $cnx = connection();
       $rqt = $cnx->prepare('INSERT INTO media VALUES( NULL, ?, ?, ?, ?)');
       $rqt->execute(array('chemin temporaire', $_POST['legende'], $typefichier, $_POST['idProjet']));

       //recuperation de l'id du medium
       $rqt = $cnx->prepare('SELECT `idMedia` FROM `media` WHERE `idProjet`=? AND `source`="chemin temporaire"');
       $rqt->execute(array($_POST['idProjet']));
       $idMedium = $rqt->fetch();

       //insertion de l'image dans les dossiers
       if (!file_exists('../img/gallery/'.$_POST['idProjet'])){
           mkdir('../img/gallery/'.$_POST['idProjet'], 0700);
       }
       move_uploaded_file($_FILES['medium']['tmp_name'], '../img/gallery/'.$_POST['idProjet']."/".$idMedium[0].".".$extension);
       $cheminfichier = './img/gallery/'.$_POST['idProjet']."/".$idMedium[0].".".$extension;

       //correction de la bdd
       $rqt = $cnx->prepare( 'UPDATE media SET source = ? WHERE idMedia = ?');
       $rqt->execute(array($cheminfichier, $idMedium[0]));
}

function deleteMedium($idMedium) {
    // Récupération l'idProjet
    $cnx = connection();
    $rqt = $cnx->prepare('SELECT `idProjet` FROM `media` WHERE `idMedia`=?');
    $rqt->execute(array($idMedium));
    $idProjet = $rqt->fetch();

    $rqt = $cnx->prepare('SELECT `source` FROM `media` WHERE `idMedia`=?');
    $rqt->execute(array($idMedium));
    $pathImg = $rqt->fetch();

    // Suppression du document medium
    unlink('.'.$pathImg[0]);

    // Suppression de la ligne medium de la bdd
    $rqt = $cnx->prepare('DELETE FROM media WHERE idMedia = ?');
    $rqt->execute(array($idMedium));

    return $idProjet[0];
}

function updateMedium($typefichier, $extension_upload, $legende, $idMedium){
    $cnx = connection();

    move_uploaded_file($_FILES['medium']['tmp_name'], '../img/gallery/'.$_POST['idProjet']."/".$idMedium.".".$extension_upload);
    $cheminfichier = './img/gallery/'.$_POST['idProjet']."/".$idMedium.".".$extension_upload;

    //correction de la bdd
    $rqt = $cnx->prepare( 'UPDATE media SET source = ?, legende = ?, type = ? WHERE idMedia = ?');
    $rqt->execute(array($cheminfichier,$legende, $typefichier, $idMedium));
}

function updateLegend($legende,$idMedium){
    $cnx = connection();
    $rqt = $cnx->prepare( 'UPDATE media SET legende = ? WHERE idMedia = ?');
    $rqt->execute(array($legende, $idMedium));
}

function getIDprojectByIDMedia($idMedium){
    $cnx = connection();
    $rqt = $cnx->prepare('SELECT `idProjet` FROM `media` WHERE `idMedia`=?');
    $rqt->execute(array($idMedium));
    $idProjet = $rqt->fetch();

    return $idProjet[0];
}
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

function addMedium($typefichier) {
       // creation du medium
       $cnx = connection();
       $rqt = $cnx->prepare('INSERT INTO media VALUES( NULL, ?, ?, ?, ?)');
       $rqt->execute(array('chemin temporaire', $_POST['legende'], $typefichier, $_POST['idProjet']));

       //recuperation de l'id du medium
       $rqt = $cnx->prepare('SELECT `idMedia` FROM `media` WHERE `idProjet`=? AND `source`="chemin temporaire"');
       $rqt->execute($_POST['idProjet']);
       $idMedium = $rqt->fetch();

       //insertion de l'image dans les dossiers
       move_uploaded_file($_FILES['medium']['tmp_name'], './img/gallery/'.$_POST['idProjet']."/".$idMedium);
       $cheminfichier = './img/gallery/'.$_POST['idProjet']."/".$idMedium;

       //correction de la bdd
       $rqt = $cnx->prepare( 'UPDATE media SET source = ?, WHERE idMedia = ?');
       $rqt->execute(array($cheminfichier, $idMedium));
}

function deleteMedium($idMedium) {
    // Récupération l'idProjet
    $cnx = connection();
    $rqt = $cnx->prepare('SELECT `idProjet` FROM `media` WHERE `idMedia`=?');
    $rqt->execute($idMedium);
    $idProjet = $rqt->fetch();

    // Suppression du document medium
    unlink('./img/gallery/'.$idProjet."/".$idMedium);

    // Suppression de la ligne medium de la bdd
    $rqt = $cnx->prepare('DELETE FROM media WHERE idMedia = ?');
    $rqt->execute($idMedium);

    return $idProjet;
}
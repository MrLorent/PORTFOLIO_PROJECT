<?php
// IMPORTATION DE LA FONCTION "CONNECTION()"
require_once('connection.php');

function UpdateMedium($source,$idProject, $idMedium){
    $cnx = connection();
    $rqtMedia = $cnx->prepare('UPDATE media
                                SET source = ?
                                WHERE idProjet = ?
                                AND idMedia = ?');
    $rqtMedia->execute(array($source,$idProject, $idMedium));
}
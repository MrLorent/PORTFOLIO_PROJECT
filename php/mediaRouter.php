<?php
// IMPORTATION DES CONTROLEURS
require_once('mediaControllers.php');

// ROUTEUR

$request = explode('/', $_SERVER['REQUEST_URI']);
$method = $_SERVER['REQUEST_METHOD'];

switch($request[4]){
    case "medium":
        switch($method){
            case 'GET':
                
                break;
            case 'POST':
                
                break;
            case 'PUT':
                
                break;
            case 'DELETE':
                
                break;
            default:
                http_response_code('404');
                echo 'OUPSI !';
                break;
        }
        break;
    case 'media':
        switch($method){
            case 'GET':
                
                break;
            case 'POST':
                
                break;
            case 'PUT':
                
                break;
            case 'DELETE':

                break;
            default:
                http_response_code('404');
                echo 'OUPSI !';
                break;
        }
        break;
    default :
        http_response_code('500');
        echo 'unknown endpoint';
        break;
}
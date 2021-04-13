<?php
// IMPORTATION DES CONTROLEURS
require_once('categoriesControllers.php');

// ROUTEUR

$request = explode('/', $_SERVER['REQUEST_URI']);
$method = $_SERVER['REQUEST_METHOD'];
    
//var_dump($request);
switch($request[5]){
    case 'category' :
        switch($method){
            case 'GET':
                echo getAllCategoriesAsJson();
                break;

            case 'POST':
                
                break;
            case 'PUT':
                
                break;
            case 'DELETE':
                echo deleteACategoryAndRefresh($request[6]);

                break;
            default:
                http_response_code('404');
                echo 'OUPSI !';
                break;
        }
        break;

    case 'other':
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
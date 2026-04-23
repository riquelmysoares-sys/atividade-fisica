<?php
// router.php
require_once 'middleware.php';
require_once 'controller.php';

class Router {
    public function resolver() {
        $metodo = $_SERVER['REQUEST_METHOD'];

        if ($metodo === 'GET') {
            // Se o usuário apenas acessou a URL, exibe o formulário
            require_once 'view.php';
        } elseif ($metodo === 'POST') {
            // Se enviou o formulário, passa pela segurança
            Middleware::validarFormulario($_POST);

            // Se a segurança aprovar, aciona o Controller
            $controller = new MatriculaController();
            $controller->processarMatricula($_POST);
        } else {
            echo "Método não suportado.";
        }
    }
}
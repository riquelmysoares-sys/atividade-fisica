<?php
<<<<<<< HEAD
// backend/router.php

require_once 'middleware.php';

/**
 * Roteador Simples
 * Agora recebe as dependências injetadas para evitar acoplamento.
 */
class Router {
    private $alunoController;

    public function __construct(AlunoController $alunoController) {
        $this->alunoController = $alunoController;
    }

=======
// router.php
require_once 'middleware.php';
require_once 'controller.php';

class Router {
>>>>>>> 045db997e77f30643feb80b55de6e9398d241378
    public function resolver() {
        $metodo = $_SERVER['REQUEST_METHOD'];

        if ($metodo === 'GET') {
<<<<<<< HEAD
            // Exibe o formulário (View)
            require_once 'view.php';
        } elseif ($metodo === 'POST') {
            // Intercepta, sanitiza e valida via Middleware
            $dadosLimpos = Middleware::sanitizarEValidarFormulario();

            // Chama o Controller com os dados limpos
            $this->alunoController->store($dadosLimpos);
        } else {
            http_response_code(405);
            echo "Método não suportado.";
        }
    }
}
=======
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
>>>>>>> 045db997e77f30643feb80b55de6e9398d241378

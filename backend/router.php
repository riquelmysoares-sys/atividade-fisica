<?php
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

    public function resolver() {
        $metodo = $_SERVER['REQUEST_METHOD'];

        if ($metodo === 'GET') {
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

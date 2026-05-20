<?php

class Router {
    public function start() {
        $metodo = $_SERVER['REQUEST_METHOD'];

        if ($metodo === 'GET') {
            require_once 'view/index.html';
        } elseif ($metodo === 'POST') {
            // Intercepta, sanitiza e valida via Middleware
            $dadosLimpos = Middleware::sanitizarEValidarFormulario();

            // Instancia dependências e chama o Controller
            $dbInstance = Database::getInstance();
            $pdo = $dbInstance->getConnection();
            $alunoRepository = new AlunoRepository($pdo);
            $alunoService = new AlunoService($alunoRepository);
            $alunoController = new AlunoController($alunoService);

            $alunoController->store($dadosLimpos);
        } else {
            http_response_code(405);
            echo "Método não suportado.";
        }
    }
}

<?php

class Router {
    public function start() {
        $metodo = $_SERVER['REQUEST_METHOD'];
        $basePath = dirname(__DIR__, 2) . '/';

        if ($metodo === 'GET') {
            $page = $_GET['page'] ?? 'index';

            switch ($page) {
                case 'index':
                    require_once $basePath . 'app/view/index.php';
                    break;
                case 'formulario':
                    require_once $basePath . 'app/view/formulario.php';
                    break;
                case 'painel':
                    require_once $basePath . 'app/view/painel.php';
                    break;
                case 'inscricao':
                    require_once $basePath . 'app/view/inscricao.php';
                    break;
                case 'detalhes':
                    require_once $basePath . 'app/view/detalhes-exercicio.php';
                    break;
                default:
                    require_once $basePath . 'app/view/index.php';
                    break;
            }
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

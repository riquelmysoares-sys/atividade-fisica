<?php
// Passo 5: Refatoração do Ponto de Entrada (index.php)

// Habilitar exibição de erros para validação (Passo 6)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Incluir o config.php (retorna o array de configuração)
$config = require_once __DIR__ . '/config.php';

// Incluir o autoload.php
require_once __DIR__ . '/autoload.php';

// Chamar o router para decidir qual controller deve ser executado
$router = new Router();
$router->start();

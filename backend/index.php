<?php
// backend/index.php

/**
 * Ponto de Entrada Front Controller + Container de Injeção de Dependência (DI)
 */

// 1. Carregamento de Arquivos (Em um projeto real, use Autoload PSR-4)
require_once 'Database.php';
require_once 'AlunoRepository.php';
require_once 'AlunoService.php';
require_once 'AlunoController.php';
require_once 'router.php';

// 2. Instanciação das Dependências (DI Container Manual)

// Singleton Database
$dbInstance = Database::getInstance();
$pdo = $dbInstance->getConnection();

// Repository (Injeção do PDO)
$alunoRepository = new AlunoRepository($pdo);

// Service (Injeção do Repository)
$alunoService = new AlunoService($alunoRepository);

// Controller (Injeção do Service)
$alunoController = new AlunoController($alunoService);

// 3. Inicialização do Roteador (Injeção do Controller)
$router = new Router($alunoController);
$router->resolver();

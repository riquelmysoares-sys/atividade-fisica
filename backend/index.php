<?php
// index.php
require_once 'router.php';

// Aciona o Roteador
$router = new Router();
$router->resolver();
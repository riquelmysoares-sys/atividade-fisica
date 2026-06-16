<?php

spl_autoload_register(function ($class) {
    // Define o diretório base como a raiz do projeto
    $baseDir = __DIR__ . '/';

    // Pastas onde o PHP deve procurar pelas classes
    $folders = [
        'app/controller/',
        'app/model/',
        'app/services/',
        'app/router/',
        'app/middleware/'
    ];

    foreach ($folders as $folder) {
        // Constrói o caminho completo do arquivo
        $file = $baseDir . $folder . $class . '.php';

        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});

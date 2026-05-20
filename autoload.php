<?php

spl_autoload_register(function ($class) {

    $folders = [
        'app/controller/',
        'app/model/',
        'app/services/',
        'app/router/',
        'app/middleware/'
    ];

    foreach ($folders as $folder) {

        $file = $folder . $class . '.php';

        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});

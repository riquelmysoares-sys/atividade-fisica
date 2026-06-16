<?php
// app/services/Database.php

/**
 * Padrão Singleton para Gerenciamento de Conexão PDO
 */
class Database {
    private static $instance = null;
    private $pdo;

    private function __construct() {
        // Busca o config.php na raiz do projeto usando o diretório atual como referência
        $config = require __DIR__ . '/../../config.php';
        
        if (isset($config['database']['driver']) && $config['database']['driver'] === 'sqlite') {
            // O caminho do banco também deve ser relativo à raiz ou absoluto
            $dsn = "sqlite:" . __DIR__ . '/../../' . $config['database']['database'];
        } else {
            $driver = $config['database']['driver'] ?? 'mysql';
            $host = $config['database']['host'] ?? 'localhost';
            $dbname = $config['database']['database'] ?? 'test';
            $dsn = "{$driver}:host={$host};dbname={$dbname};charset=utf8";
        }

        try {
            $this->pdo = new PDO($dsn, $config['database']['username'] ?? null, $config['database']['password'] ?? null);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            die("Erro na conexão com o banco de dados: " . $e->getMessage());
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->pdo;
    }

    private function __clone() {}
    private function __wakeup() {}
}

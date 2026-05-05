<?php
// backend/Database.php

/**
 * Padrão Singleton para Gerenciamento de Conexão PDO
 * Garante que apenas uma conexão com o banco de dados seja aberta durante o ciclo de vida da requisição.
 */
class Database {
    private static $instance = null;
    private $pdo;

    private function __construct() {
        $config = parse_ini_file(__DIR__ . '/config.ini', true);
        
        if (isset($config['database']['driver']) && $config['database']['driver'] === 'sqlite') {
            $dsn = "sqlite:" . __DIR__ . "/" . $config['database']['database'];
        } else {
            // Suporte para outros drivers (ex: mysql)
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

    /**
     * Retorna a única instância da classe Database
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Retorna o objeto PDO configurado
     */
    public function getConnection() {
        return $this->pdo;
    }

    // Previne clonagem e desserialização (Singleton)
    private function __clone() {}
    private function __wakeup() {}
}

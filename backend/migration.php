<?php
// migration.php
try {
    // Cria o arquivo database.sqlite (se não existir) e conecta
    $pdo = new PDO('sqlite:database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Comando SQL para criar a tabela
    $query = "CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT, 
        idade INTEGER, 
        curso TEXT
    )";
    
    $pdo->exec($query);
    echo "Sucesso: Banco de dados 'database.sqlite' e tabela 'alunos' criados!\n";
} catch (PDOException $e) {
    echo "Erro ao criar banco de dados: " . $e->getMessage() . "\n";
}
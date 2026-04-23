<?php
// model.php
class AlunoModel {
    private $nome;
    private $idade;
    private $curso;

    // Getters e Setters
    public function setNome($nome) { $this->nome = $nome; }
    public function getNome() { return $this->nome; }

    public function setIdade($idade) { $this->idade = $idade; }
    public function getIdade() { return $this->idade; }

    public function setCurso($curso) { $this->curso = $curso; }
    public function getCurso() { return $this->curso; }

    // Salvar no banco
    public function save() {
        $pdo = new PDO('sqlite:database.sqlite');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepared Statement para evitar SQL Injection
        $stmt = $pdo->prepare("INSERT INTO alunos (nome, idade, curso) VALUES (:nome, :idade, :curso)");
        
        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':idade', $this->idade);
        $stmt->bindParam(':curso', $this->curso);

        return $stmt->execute();
    }
}
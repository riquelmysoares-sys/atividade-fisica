<?php
// backend/Aluno.php

/**
 * Entidade Aluno (Anêmica)
 * Representa apenas a estrutura de dados, sem lógica de persistência.
 */
class Aluno {
    private $id;
    private $nome;
    private $idade;
    private $curso;

    public function getId() { return $this->id; }
    public function setId($id) { $this->id = $id; }

    public function getNome() { return $this->nome; }
    public function setNome($nome) { $this->nome = $nome; }

    public function getIdade() { return $this->idade; }
    public function setIdade($idade) { $this->idade = $idade; }

    public function getCurso() { return $this->curso; }
    public function setCurso($curso) { $this->curso = $curso; }
}

<?php
// app/model/AlunoRepository.php

/**
 * Implementação PDO do Repositório de Alunos
 * Contém toda a lógica SQL (CRUD).
 */
class AlunoRepository implements IAlunoRepository {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function save(Aluno $aluno): bool {
        $stmt = $this->db->prepare("INSERT INTO alunos (nome, idade, curso) VALUES (:nome, :idade, :curso)");
        
        $nome = $aluno->getNome();
        $idade = $aluno->getIdade();
        $curso = $aluno->getCurso();

        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':idade', $idade);
        $stmt->bindParam(':curso', $curso);

        return $stmt->execute();
    }

    public function find(int $id): ?Aluno {
        $stmt = $this->db->prepare("SELECT * FROM alunos WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();

        if (!$row) return null;

        $aluno = new Aluno();
        $aluno->setId($row['id']);
        $aluno->setNome($row['nome']);
        $aluno->setIdade($row['idade']);
        $aluno->setCurso($row['curso']);

        return $aluno;
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM alunos WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }

    public function all(): array {
        $stmt = $this->db->query("SELECT * FROM alunos");
        $alunos = [];
        while ($row = $stmt->fetch()) {
            $aluno = new Aluno();
            $aluno->setId($row['id']);
            $aluno->setNome($row['nome']);
            $aluno->setIdade($row['idade']);
            $aluno->setCurso($row['curso']);
            $alunos[] = $aluno;
        }
        return $alunos;
    }
}

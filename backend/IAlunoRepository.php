<?php
// backend/IAlunoRepository.php

/**
 * Interface para o Repositório de Alunos
 * Define o contrato obrigatório para qualquer implementação de persistência de Alunos.
 */
interface IAlunoRepository {
    public function save(Aluno $aluno): bool;
    public function find(int $id): ?Aluno;
    public function delete(int $id): bool;
    public function all(): array;
}

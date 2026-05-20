<?php
// app/services/AlunoService.php

/**
 * Camada de Serviço para Alunos
 * Contém a lógica de negócio e orquestração.
 */
class AlunoService {
    private $repository;

    /**
     * Injeção de Dependência via Construtor
     */
    public function __construct(IAlunoRepository $repository) {
        $this->repository = $repository;
    }

    /**
     * Processa a matrícula de um novo aluno aplicando as regras de negócio
     */
    public function matricular(Aluno $aluno): bool {
        $this->validarRegras($aluno);
        return $this->repository->save($aluno);
    }

    /**
     * Valida as regras de negócio específicas
     * @throws BusinessRuleException
     */
    private function validarRegras(Aluno $aluno) {
        $idade = $aluno->getIdade();
        $curso = strtolower($aluno->getCurso());

        // Regra 1: Menores de 16 anos não podem se matricular
        if ($idade < 16) {
            throw new BusinessRuleException("Matrícula negada: A idade mínima permitida é 16 anos.");
        }

        // Regra 2: Simulação de restrição para um curso específico
        if ($curso === 'medicina' && $idade < 18) {
            throw new BusinessRuleException("Matrícula negada: O curso de Medicina exige idade mínima de 18 anos.");
        }
    }
}

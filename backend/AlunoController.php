<?php
// backend/AlunoController.php

require_once 'AlunoService.php';
require_once 'Aluno.php';
require_once 'BusinessRuleException.php';

/**
 * Controlador de Alunos
 * Responsável apenas por receber a requisição, chamar o serviço e retornar a resposta.
 */
class AlunoController {
    private $service;

    /**
     * Injeção de Dependência via Construtor
     */
    public function __construct(AlunoService $service) {
        $this->service = $service;
    }

    /**
     * Processa o armazenamento de um novo aluno
     */
    public function store(array $dados) {
        try {
            // Cria a entidade a partir dos dados da requisição
            $aluno = new Aluno();
            $aluno->setNome($dados['nome'] ?? '');
            $aluno->setIdade($dados['idade'] ?? 0);
            $aluno->setCurso($dados['curso'] ?? '');

            // Delega para o serviço
            $this->service->matricular($aluno);

            // Renderiza resposta de sucesso
            $this->renderSuccess($aluno);

        } catch (BusinessRuleException $e) {
            // Captura exceção de negócio e renderiza erro amigável
            $this->renderError($e->getMessage());
        } catch (Exception $e) {
            // Captura erros genéricos
            $this->renderError("Ocorreu um erro inesperado: " . $e->getMessage());
        }
    }

    private function renderSuccess(Aluno $aluno) {
        echo "<div style='color: green;'><h2>Sucesso!</h2>";
        echo "<p>Aluno <b>{$aluno->getNome()}</b> matriculado no curso de <b>{$aluno->getCurso()}</b>.</p></div>";
        echo "<a href='/'>Fazer nova matrícula</a>";
    }

    private function renderError(string $message) {
        echo "<div style='color: red;'><h2>Erro na Regra de Negócio</h2>";
        echo "<p>{$message}</p></div>";
        echo "<a href='/'>Voltar e tentar novamente</a>";
    }
}

<?php
// controller.php
require_once 'model.php';
require_once 'service.php';

class MatriculaController {
    public function processarMatricula($dados) {
        try {
            // 1. Instancia o Service e testa as regras de negócio
            $service = new MatriculaService();
            $service->validarRegrasDeNegocio($dados['nome'], $dados['idade'], $dados['curso']);

            // 2. Se as regras passaram, instancia o Model, preenche e salva
            $aluno = new AlunoModel();
            $aluno->setNome($dados['nome']);
            $aluno->setIdade($dados['idade']);
            $aluno->setCurso($dados['curso']);
            $aluno->save();

            // 3. Exibe resposta de sucesso
            echo "<div style='color: green;'><h2>Sucesso!</h2>";
            echo "<p>Aluno <b>{$dados['nome']}</b> matriculado no curso de <b>{$dados['curso']}</b>.</p></div>";
            echo "<a href='/'>Fazer nova matrícula</a>";

        } catch (Exception $e) {
            // Se o Service lançar exceção, o Controller captura e exibe o erro
            echo "<div style='color: red;'><h2>Erro na Regra de Negócio</h2>";
            echo "<p>" . $e->getMessage() . "</p></div>";
            echo "<a href='/'>Voltar e tentar novamente</a>";
        }
    }
}
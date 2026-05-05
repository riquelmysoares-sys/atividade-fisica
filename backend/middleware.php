<?php
// backend/middleware.php

/**
 * Camada de Middleware
 * Responsável por interceptar a requisição, validar e sanitizar dados básicos.
 */
class Middleware {
    /**
     * Sanitiza e valida dados do formulário de matrícula
     */
    public static function sanitizarEValidarFormulario() {
        // Sanitização contra XSS usando filter_input
        $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_SPECIAL_CHARS);
        $idade = filter_input(INPUT_POST, 'idade', FILTER_VALIDATE_INT);
        $curso = filter_input(INPUT_POST, 'curso', FILTER_SANITIZE_SPECIAL_CHARS);

        // Valida se algum campo está vazio ou inválido
        if (!$nome || !$idade || !$curso) {
            die("<h2 style='color:orange;'>Bloqueado pelo Middleware</h2>
                 <p>Dados inválidos ou campos obrigatórios não preenchidos.</p>
                 <a href='/'>Voltar</a>");
        }

        // Retorna os dados limpos e tipados
        return [
            'nome' => $nome,
            'idade' => $idade,
            'curso' => $curso
        ];
    }
}

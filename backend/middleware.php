<?php
<<<<<<< HEAD
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
=======
// middleware.php
class Middleware {
    public static function validarFormulario($dados) {
        // Valida se algum campo está vazio
        if (empty(trim($dados['nome'])) || empty(trim($dados['idade'])) || empty(trim($dados['curso']))) {
            die("<h2 style='color:orange;'>Bloqueado pelo Middleware</h2><p>Todos os campos são obrigatórios.</p><a href='/'>Voltar</a>");
        }

        // Valida se a idade é estritamente um número
        if (!is_numeric($dados['idade'])) {
            die("<h2 style='color:orange;'>Bloqueado pelo Middleware</h2><p>A idade deve ser preenchida apenas com números.</p><a href='/'>Voltar</a>");
        }
    }
}
>>>>>>> 045db997e77f30643feb80b55de6e9398d241378

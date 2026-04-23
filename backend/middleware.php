<?php
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
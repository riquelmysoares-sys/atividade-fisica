<?php
// service.php
class MatriculaService {
    public function validarRegrasDeNegocio($nome, $idade, $curso) {
        // Regra 1: Menores de 16 anos não podem se matricular
        if ($idade < 16) {
            throw new Exception("Matrícula negada: A idade mínima permitida é 16 anos.");
        }

        // Regra 2: Simulação de restrição para um curso específico
        if (strtolower($curso) === 'medicina' && $idade < 18) {
            throw new Exception("Matrícula negada: O curso de Medicina exige idade mínima de 18 anos.");
        }

        // Se passar por todas as verificações, a regra é validada
        return true; 
    }
}
<?php
// backend/BusinessRuleException.php

/**
 * Exceção customizada para erros de Regra de Negócio
 */
class BusinessRuleException extends Exception {
    public function __construct($message = "", $code = 0, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}

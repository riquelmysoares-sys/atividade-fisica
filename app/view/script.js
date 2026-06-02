// ==========================================
// 1. EFEITOS DE UI (NAVBAR & TABS)
// ==========================================

// Efeito de Scroll na Navbar
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Troca de Abas (Login / Register)
function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const mensagemAviso = document.getElementById('mensagem-aviso');

    if (mensagemAviso) mensagemAviso.textContent = '';

    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        tabLogin.classList.remove('active');
        tabRegister.classList.add('active');
    }
}

// ==========================================
// 2. LÓGICA DE AUTENTICAÇÃO
// ==========================================

const inputUsuario = document.querySelector('#input-usuario');
const inputSenha = document.querySelector('#input-senha');
const regUsuario = document.querySelector('#reg-usuario');
const regSenha = document.querySelector('#reg-senha');
const btnLogin = document.querySelector('#btn-login');
const btnCadastrar = document.querySelector('#btn-cadastrar');
const mensagemAviso = document.querySelector('#mensagem-aviso');

function mostrarMensagem(texto, cor) {
    if (mensagemAviso) {
        mensagemAviso.textContent = texto;
        mensagemAviso.style.color = cor;
    }
}

// Cadastro
if (btnCadastrar) {
    btnCadastrar.addEventListener('click', function() {
        const usuario = regUsuario.value.trim();
        const senha = regSenha.value.trim();

        if (usuario === '' || senha === '') {
            mostrarMensagem('Preencha todos os campos para criar sua conta.', '#f87171');
            return;
        }

        if (localStorage.getItem(usuario)) {
            mostrarMensagem('Este usuário já existe. Escolha outro nome.', '#fbbf24');
            return;
        }

        localStorage.setItem(usuario, senha);
        mostrarMensagem('Conta criada com sucesso! Você já pode entrar.', '#34d399');
        
        regUsuario.value = '';
        regSenha.value = '';
        
        // Pequeno delay e volta para login
        setTimeout(() => switchTab('login'), 1500);
    });
}

// Login
if (btnLogin) {
    btnLogin.addEventListener('click', function() {
        const usuario = inputUsuario.value.trim();
        const senhaDigitada = inputSenha.value.trim();

        if (usuario === '' || senhaDigitada === '') {
            mostrarMensagem('Por favor, informe seu usuário e senha.', '#f87171');
            return;
        }

        const senhaSalva = localStorage.getItem(usuario);

        if (senhaSalva === null) {
            mostrarMensagem('Usuário não encontrado. Crie uma conta primeiro.', '#f87171');
        } 
        else if (senhaSalva === senhaDigitada) {
            mostrarMensagem('Acesso autorizado! Redirecionando...', '#34d399');
            setTimeout(() => {
                window.location.href = 'formulario.html';
            }, 800);
        } 
        else {
            mostrarMensagem('Senha incorreta. Tente novamente.', '#f87171');
        }
    });
}

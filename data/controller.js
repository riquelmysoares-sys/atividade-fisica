let dataAtual = new Date(1900, 0, 1);
let interfaceRevelada = false;

const containerPrincipal = document.getElementById('containerPrincipal');
const caosDraggable = document.getElementById('caosDraggable');
const displayDataCaos = document.getElementById('displayData');
const btnAvancar = document.getElementById('btnAvancar');
const btnSalvarCaos = document.getElementById('btnSalvarCaos');
const msgInvisivel = document.getElementById('mensagemInvisivel');
const camadaNormal = document.getElementById('camadaNormal');
const inputDataNormal = document.getElementById('inputDataNormal');
const btnSalvarNormal = document.getElementById('btnSalvarNormal');

const telaErro = document.getElementById('telaErro');
const btnProsseguir = document.getElementById('btnProsseguir');

const anuncioPopup = document.getElementById('anuncioPopup');
const imgAnuncio = document.getElementById('imgAnuncio');

function formatarDataCaos(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

btnAvancar.addEventListener('click', () => {
    if (interfaceRevelada) return; 
    dataAtual.setDate(dataAtual.getDate() + 1);
    displayDataCaos.innerText = formatarDataCaos(dataAtual);
    if (dataAtual.getFullYear() >= 1950) btnSalvarCaos.classList.add('clickable');
});

btnSalvarCaos.addEventListener('mouseover', () => {
    if (interfaceRevelada) return;
    if (dataAtual.getFullYear() < 1950) {
        btnSalvarCaos.classList.remove('clickable');
        btnSalvarCaos.style.position = 'absolute';
        btnSalvarCaos.style.left = `${Math.floor(Math.random() * (window.innerWidth - btnSalvarCaos.clientWidth))}px`;
        btnSalvarCaos.style.top = `${Math.floor(Math.random() * (window.innerHeight - btnSalvarCaos.clientHeight))}px`;
    } else {
        btnSalvarCaos.style.position = 'static';
    }
});

msgInvisivel.addEventListener('click', () => {
    if (interfaceRevelada) return;
    interfaceRevelada = true;
    msgInvisivel.innerText = "continue tentando";
    msgInvisivel.classList.add('revelada');
    camadaNormal.classList.remove('hidden');
    iniciarArrasto(caosDraggable);
});

function iniciarArrasto(element) {
    let offsetX = 0, offsetY = 0;
    element.style.cursor = 'grab';
    element.onmousedown = function(e) {
        e.preventDefault();
        element.style.cursor = 'grabbing';
        document.onmousemove = function(e) {
            offsetX += e.movementX;
            offsetY += e.movementY;
            element.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
        };
        document.onmouseup = function() { document.onmousemove = null; document.onmouseup = null; element.style.cursor = 'grab'; };
    };
}

btnSalvarNormal.addEventListener('click', () => {
    if (!inputDataNormal.value) return; 
    containerPrincipal.classList.add('hidden');
    telaErro.classList.remove('hidden');
});

// A gravidade e salvamento do CPF
btnProsseguir.addEventListener('click', () => {
    const cpfDigitado = document.getElementById('cpf').value;
    localStorage.setItem('cpfSalvo', cpfDigitado);

    const elementosParaCair = document.querySelectorAll('#telaErro > *, .form-cadastro > *');
    
    elementosParaCair.forEach(el => {
        el.style.transition = "transform 1.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)";
        const randomX = (Math.random() - 0.5) * 600;
        const randomRotate = (Math.random() - 0.5) * 180;
        setTimeout(() => {
            el.style.transform = `translate(${randomX}px, 150vh) rotate(${randomRotate}deg)`;
        }, 50);
    });

    setTimeout(() => {
        anuncioPopup.classList.remove('hidden');
    }, 5000);
});

// Direciona para a nova aba do anúncio
imgAnuncio.addEventListener('click', () => {
    window.open('anuncio.html', '_blank');
});

// ==========================================================
// 1. SELECIONANDO OS ELEMENTOS
// ==========================================================
const btnGerarTreino = document.querySelector('#btn-gerar-treino');
const sidebar = document.querySelector('#sidebar');

const telaFormulario = document.querySelector('#tela-formulario');
const telaDashboard = document.querySelector('#tela-dashboard');
const telaMetas = document.querySelector('#tela-metas');
const telaDetalheDia = document.querySelector('#tela-detalhe-dia');

const gradeDias = document.querySelector('#grade-dias');
const progressoTexto = document.querySelector('#progresso-texto');
const listaExerciciosDia = document.querySelector('#lista-exercicios-dia');
const estatisticasSemanais = document.querySelector('#estatisticas-semanais');

let avaliacaoAtual = null; 
let diaSelecionado = null;

// ==========================================================
// 2. BANCO DE TREINOS (Com Imagens Calibradas)
// ==========================================================
const bibliotecaTreinos = {
    superiorA: [
        { nome: "Flexão de Braço", series: "4x Máximo", desc: "Peitoral e tríceps.", descanso: "60 a 90s", dica: "Mantenha o corpo reto. Se estiver difícil, apoie os joelhos.", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop" },
        { nome: "Mergulho na Cadeira", series: "4x12", desc: "Foco no tríceps.", descanso: "60s", dica: "Apoie as mãos em uma cadeira firme e desça o quadril próximo a ela.", img: "https://images.unsplash.com/photo-1532384661798-58b53a4fbe37?w=400&h=400&fit=crop" },
        { nome: "Prancha Toca-Ombro", series: "3x15 (cada lado)", desc: "Abdômen e estabilidade.", descanso: "45s", dica: "Em posição de prancha alta, toque o ombro oposto sem girar o quadril.", img: "https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?w=400&h=400&fit=crop" },
        { nome: "Superman", series: "3x15", desc: "Fortalece a região lombar.", descanso: "45s", dica: "Deitado de bruços, eleve braços e pernas simultaneamente.", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop" }
    ],
    inferiorB: [
        { nome: "Agachamento Livre", series: "4x15", desc: "Coxas e glúteos.", descanso: "60 a 90s", dica: "Mantenha o calcanhar no chão e o peito aberto.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop" },
        { nome: "Afundo Alternado", series: "4x10 (cada perna)", desc: "Quadríceps e equilíbrio.", descanso: "60s", dica: "Dê um passo à frente e desça o joelho de trás em direção ao chão.", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop" },
        { nome: "Elevação Pélvica", series: "4x15", desc: "Foco total nos glúteos.", descanso: "45s", dica: "Deitado, suba o quadril e aperte bem o bumbum no topo.", img: "https://images.unsplash.com/photo-1590556409491-0559a454375b?w=400&h=400&fit=crop" },
        { nome: "Panturrilha Unilateral", series: "4x15 (cada perna)", desc: "Panturrilhas.", descanso: "45s", dica: "Use a parede para equilíbrio e suba na ponta do pé.", img: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=400&h=400&fit=crop" }
    ],
    funcionalC: [
        { nome: "Polichinelo", series: "3x1 minuto", desc: "Cardio e queima calórica.", descanso: "30s", dica: "Sincronize o movimento dos braços com o das pernas.", img: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=400&fit=crop" },
        { nome: "Escalador", series: "3x40 seg", desc: "Core e fôlego.", descanso: "40s", dica: "Em posição de prancha, simule uma corrida trazendo os joelhos ao peito.", img: "https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?w=400&h=400&fit=crop" },
        { nome: "Burpees", series: "3x10", desc: "Trabalha o corpo todo.", descanso: "60s", dica: "Desça, faça uma flexão, pule e estenda os braços.", img: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=400&h=400&fit=crop" },
        { nome: "Abdominal Bicicleta", series: "3x20", desc: "Foco no abdômen.", descanso: "45s", dica: "Tente encostar o cotovelo no joelho oposto alternadamente.", img: "https://images.unsplash.com/photo-1571019613576-2b22c76fd94b?w=400&h=400&fit=crop" }
    ]
};

function obterTreinoDoDia(dia) {
    const ciclo = (dia - 1) % 3;
    if (ciclo === 0) return bibliotecaTreinos.superiorA;
    if (ciclo === 1) return bibliotecaTreinos.inferiorB;
    return bibliotecaTreinos.funcionalC;
}

// ==========================================================
// 3. NAVEGAÇÃO
// ==========================================================
function navegarPara(rota) {
    telaDashboard.style.display = 'none';
    telaMetas.style.display = 'none';
    telaDetalheDia.style.display = 'none';
    if(telaFormulario) telaFormulario.style.display = 'none';

    document.querySelectorAll('.menu-lista li').forEach(li => li.classList.remove('active'));
    
    if (rota === 'treinos') {
        telaDashboard.style.display = 'block';
        document.getElementById('nav-treinos').classList.add('active');
        renderizarGradeTreinos();
    } else if (rota === 'metas') {
        telaMetas.style.display = 'block';
        document.getElementById('nav-metas').classList.add('active');
        renderizarTelaMetas();
    }
}

function sairDaConta() {
    window.location.href = 'index.html'; 
}

// ==========================================================
// 4. RENDERIZAR TELA DE TREINOS
// ==========================================================
function renderizarGradeTreinos() {
    if (!avaliacaoAtual) return;

    gradeDias.innerHTML = ''; 
    const concluidos = avaliacaoAtual.progresso ? avaliacaoAtual.progresso.length : 0;
    const porcentagem = Math.round((concluidos / 30) * 100);

    progressoTexto.innerHTML = `
        <div class="dashboard-card" style="background: var(--glass); backdrop-filter: blur(10px);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span style="font-weight: 600;">Jornada de 30 Dias</span>
                <span style="color: var(--primary); font-weight: 700;">${porcentagem}%</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: ${porcentagem}%;"></div>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${concluidos} dias de vitória!</p>
        </div>
    `;

    for (let i = 1; i <= 30; i++) {
        const card = document.createElement('div');
        card.classList.add('card-dia');
        
        if (avaliacaoAtual.progresso && avaliacaoAtual.progresso.includes(i)) {
            card.classList.add('concluido');
        }

        card.innerHTML = `
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: 2px;">DIA</div>
            <div style="font-size: 1.4rem; font-weight: 800;">${i}</div>
        `;
        card.onclick = () => abrirDetalheDia(i);
        gradeDias.appendChild(card);
    }
}

// ==========================================================
// 5. ABRIR TREINO ESPECÍFICO
// ==========================================================
function abrirDetalheDia(dia) {
    diaSelecionado = dia;
    telaDashboard.style.display = 'none';
    telaDetalheDia.style.display = 'block';
    
    document.querySelector('#titulo-dia').textContent = `Treino do Dia ${dia}`;
    
    const exercicios = obterTreinoDoDia(dia);
    
    listaExerciciosDia.innerHTML = exercicios.map((ex, index) => `
        <div class="exercicio-item" onclick="verDetalhesExercicio(${dia}, ${index})" style="border-radius: 15px; overflow: hidden; position: relative; height: 100px; padding: 0;">
            <img src="${ex.img}" style="position: absolute; width: 100%; height: 100%; object-fit: cover; opacity: 0.4;">
            <div style="position: relative; z-index: 2; padding: 20px; display: flex; justify-content: space-between; align-items: center; height: 100%;">
                <div>
                    <h4 style="margin: 0; font-size: 1.2rem;">${ex.nome}</h4>
                    <span style="color: var(--primary); font-weight: 700; font-size: 0.9rem;">${ex.series}</span>
                </div>
                <i class="fas fa-arrow-right" style="background: var(--primary); color: var(--bg-main); width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;"></i>
            </div>
        </div>
    `).join('');
}

// NOVA FUNÇÃO: Navega para a página de detalhes
function verDetalhesExercicio(dia, index) {
    const exercicios = obterTreinoDoDia(dia);
    const exercicio = exercicios[index];
    
    // Salva o exercício atual para a próxima página ler
    sessionStorage.setItem('exercicioAtual', JSON.stringify(exercicio));
    
    // Redireciona
    window.location.href = 'detalhes-exercicio.html';
}

// ==========================================================
// 6. RENDERIZAR METAS
// ==========================================================
function renderizarTelaMetas() {
    const metaDias = avaliacaoAtual.diasSugeridos || 3;
    document.querySelector('#meta-dias-texto').textContent = metaDias;
    document.querySelector('#qtd-agua').textContent = (avaliacaoAtual.peso * 35 / 1000).toFixed(1);

    const prog = avaliacaoAtual.progresso;
    const totalSemanas = Math.ceil(30 / metaDias);
    let htmlEstatisticas = '';

    for (let i = 0; i < totalSemanas; i++) {
        let diaInicio = i * metaDias + 1;
        let diaFim = Math.min((i + 1) * metaDias, 30);
        let qtdConcluidos = prog.filter(d => d >= diaInicio && d <= diaFim).length;
        let metaDessaSemana = diaFim - diaInicio + 1; 
        let bateuMeta = qtdConcluidos >= metaDessaSemana;
        
        htmlEstatisticas += `
        <div style="background: rgba(255,255,255,0.03); padding: 15px; border-radius: 12px; margin-bottom: 12px; border: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h4 style="margin: 0;">Semana ${i + 1}</h4>
                <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted);">Status da meta semanal</p>
            </div>
            <div style="text-align: right;">
                <div style="font-weight: 700; color: ${bateuMeta ? 'var(--secondary)' : 'var(--text-main)'};">${qtdConcluidos} / ${metaDessaSemana}</div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">${bateuMeta ? 'COMPLETA ✅' : 'PENDENTE ⏳'}</div>
            </div>
        </div>`;
    }
    estatisticasSemanais.innerHTML = htmlEstatisticas;
}

// ==========================================================
// 7. CONCLUIR TREINO
// ==========================================================
document.querySelector('#btn-concluir-treino').onclick = async () => {
    if (!avaliacaoAtual.progresso.includes(diaSelecionado)) {
        avaliacaoAtual.progresso.push(diaSelecionado);
    }
    avaliacaoAtual.ultimoTreino = Date.now(); 
    await atualizarItem(avaliacaoAtual);
    navegarPara('treinos');
};

// ==========================================================
// 8. INICIALIZAÇÃO
// ==========================================================
window.onload = async () => {
    await iniciarBanco();
    const dados = await buscarItens();
    if (dados.length > 0) {
        avaliacaoAtual = dados[dados.length - 1];
        if(telaFormulario) telaFormulario.style.display = 'none';
        sidebar.style.display = 'flex';
        
        // Verifica se voltamos da página de detalhes
        const ultimoEstado = sessionStorage.getItem('appState');
        if (ultimoEstado === 'metas') {
            navegarPara('metas');
        } else {
            navegarPara('treinos');
        }
    }
};

if(btnGerarTreino) {
    btnGerarTreino.onclick = async () => {
        const diasInput = document.querySelector('#dias').value;
        const pesoInput = document.querySelector('#peso').value;
        const idadeInput = document.querySelector('#idade').value;
        
        if (!pesoInput || !diasInput) return alert("Por favor, preencha pelo menos Peso e Dias!");

        avaliacaoAtual = {
            id: Date.now(),
            idade: parseInt(idadeInput),
            peso: parseFloat(pesoInput),
            diasSugeridos: parseInt(diasInput),
            progresso: [],
            ultimoTreino: null
        };
        await adicionarItem(avaliacaoAtual);
        if(telaFormulario) telaFormulario.style.display = 'none';
        sidebar.style.display = 'flex';
        navegarPara('treinos');
    };
}

// ==========================================================
// CONFIGURAÇÕES DO BANCO DE DADOS
// ==========================================================
const DB_NAME = "TreinoAppDB";
const DB_VERSION = 1;
const STORE_NAME = "avaliacoes"; // Pense nisso como o nome da sua "Tabela"

// ==========================================================
// FUNÇÃO 1: INICIAR O BANCO
// Explicação: Tenta abrir o banco. Se for a primeira vez (ou se a versão mudar), 
// ele entra no 'onupgradeneeded' e cria a nossa "tabela" (Object Store) com um ID automático.
// ==========================================================
function iniciarBanco() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // Cria a tabela se ela não existir, definindo 'id' como chave primária
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
                console.log("Tabela do banco de dados criada com sucesso!");
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result); // Retorna o banco de dados pronto para uso
        };

        request.onerror = (event) => {
            reject("Erro ao abrir o banco de dados: " + event.target.error);
        };
    });
}

// ==========================================================
// FUNÇÃO 2: ADICIONAR ITEM
// Explicação: Abre uma "transação" de leitura e escrita. Pega a tabela 
// e adiciona o objeto (os dados do formulário) lá dentro.
// ==========================================================
async function adicionarItem(item) {
    const db = await iniciarBanco();
    return new Promise((resolve, reject) => {
        const transacao = db.transaction([STORE_NAME], "readwrite");
        const tabela = transacao.objectStore(STORE_NAME);
        const request = tabela.add(item);

        request.onsuccess = () => resolve("Item adicionado com sucesso!");
        request.onerror = (event) => reject("Erro ao adicionar: " + event.target.error);
    });
}

// ==========================================================
// FUNÇÃO 3: BUSCAR TODOS OS ITENS
// Explicação: Abre uma transação apenas para leitura (readonly), 
// vai na tabela e pega todos os registros salvos, retornando uma lista (Array).
// ==========================================================
async function buscarItens() {
    const db = await iniciarBanco();
    return new Promise((resolve, reject) => {
        const transacao = db.transaction([STORE_NAME], "readonly");
        const tabela = transacao.objectStore(STORE_NAME);
        const request = tabela.getAll();

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject("Erro ao buscar itens: " + event.target.error);
    });
}

// ==========================================================
// FUNÇÃO 4: DELETAR ITEM
// Explicação: Abre uma transação de escrita, busca o item pelo ID específico
// e o remove do banco de dados.
// ==========================================================
async function deletarItem(id) {
    const db = await iniciarBanco();
    return new Promise((resolve, reject) => {
        const transacao = db.transaction([STORE_NAME], "readwrite");
        const tabela = transacao.objectStore(STORE_NAME);
        const request = tabela.delete(id);

        request.onsuccess = () => resolve("Item deletado com sucesso!");
        request.onerror = (event) => reject("Erro ao deletar: " + event.target.error);
    });
}
// ==========================================================
// FUNÇÃO 5: ATUALIZAR ITEM (Para salvar o progresso)
// ==========================================================
async function atualizarItem(item) {
    const db = await iniciarBanco();
    return new Promise((resolve, reject) => {
        const transacao = db.transaction([STORE_NAME], "readwrite");
        const tabela = transacao.objectStore(STORE_NAME);
        const request = tabela.put(item); // O 'put' atualiza se o ID já existir

        request.onsuccess = () => resolve("Progresso salvo!");
        request.onerror = (event) => reject("Erro ao salvar progresso: " + event.target.error);
    });
}

const DB_NAME = "BadUIDatabase";
const STORE_NAME = "datasNascimento";

function salvarNoBanco(dataEscolhida) {
    // Abre (ou cria) o banco de dados
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        // Cria a "tabela" (Object Store) se não existir
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { autoIncrement: true });
        }
    };

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        
        // Monta o objeto e salva
        const registro = {
            data: dataEscolhida,
            dataDoCadastro: new Date().toLocaleString()
        };
        
        store.add(registro);

        transaction.oncomplete = function() {
            console.log("Sucesso: A data foi salva no IndexedDB!");
            alert(`A data ${dataEscolhida} foi salva com sucesso! O seu sofrimento acabou.`);
        };

        transaction.onerror = function() {
            console.error("Erro ao tentar salvar os dados no IndexedDB.");
        };
    };

    request.onerror = function(event) {
        console.error("Erro ao abrir o IndexedDB:", event.target.errorCode);
    };
}

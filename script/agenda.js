function listarPets() {
    // Pega o ID do usuário logado do localStorage
    const userId = localStorage.getItem("id_user"); // substitua "id_user" pela chave correta

    if (!userId) {
        console.error("Usuário não logado");
        const petsSelect = document.getElementById("pets");
        petsSelect.innerHTML = '<option value="">Usuário não logado</option>';
        return;
    }

    // Requisição POST para o backend
    fetch("http://127.0.0.1:8080/pet/listarPets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: parseInt(userId) }) // envia o userId como número
    })
    .then(res => res.json())
    .then(data => {
        const petsSelect = document.getElementById("pets");
        petsSelect.innerHTML = '<option value="">Selecione seu pet</option>';

        if (data.message) {
            // Caso não haja pets
            const option = document.createElement("option");
            option.value = "";
            option.textContent = data.message;
            petsSelect.appendChild(option);
        } else {
            // Popula o select com os pets retornados
            data.forEach(pet => {
                const option = document.createElement("option");
                option.value = pet.id;
                option.textContent = pet.nome;
                petsSelect.appendChild(option);
            });
        }
    })
    .catch(error => {
        console.error("Erro ao carregar pets:", error);
        const petsSelect = document.getElementById("pets");
        petsSelect.innerHTML = '<option value="">Erro ao carregar pets</option>';
    });
}
function listarLojas() {
    fetch("http://127.0.0.1:8080/loja/listaLoja")
        .then(res => {
            if (!res.ok) throw new Error("Erro ao carregar lojas");
            return res.json();
        })
        .then(data => {
            const lojasSelect = document.getElementById("lojas");
            // Limpa as opções anteriores e adiciona a opção padrão
            lojasSelect.innerHTML = '<option value="">Selecione uma loja</option>';

            data.forEach(loja => {
                const option = document.createElement("option");
                option.value = loja.id;
                // **AQUI ESTÁ A CORREÇÃO: Usando crases (`) em vez de aspas simples ('')**
                option.textContent = `${loja.nome}`; 
                lojasSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar lojas:", error);
            const lojasSelect = document.getElementById("lojas");
            lojasSelect.innerHTML = '<option value="">Erro ao carregar lojas</option>';
        });
}

// Carrega lojas ao abrir a página
window.onload = () => {
    listarPets();  // carrega pets do usuário
    listarLojas(); // carrega todas as lojas
};

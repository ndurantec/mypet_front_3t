const tabelaItens = document.querySelector("#tabelaItens tbody");
const valorTotalEl = document.getElementById("valorTotal");
const btnAdicionar = document.getElementById("btnAdicionar");
const formVenda = document.getElementById("formVenda");
const mensagem = document.getElementById("mensagem");

let valorTotal = 0;

btnAdicionar.addEventListener("click", () => {
  const tipo = document.getElementById("tipoItem").value;
  const descricao = document.getElementById("descricaoItem").value;
  const valor = parseFloat(document.getElementById("valorItem").value);

  if (!descricao || isNaN(valor) || valor <= 0) {
    alert("Preencha a descrição e o valor corretamente!");
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${tipo}</td>
    <td>${descricao}</td>
    <td>R$ ${valor.toFixed(2)}</td>
    <td><button class="remover">Remover</button></td>
  `;
  tabelaItens.appendChild(row);

  valorTotal += valor;
  valorTotalEl.textContent = valorTotal.toFixed(2);

  // limpar campos
  document.getElementById("descricaoItem").value = "";
  document.getElementById("valorItem").value = "";
});

tabelaItens.addEventListener("click", (e) => {
  if (e.target.classList.contains("remover")) {
    const linha = e.target.closest("tr");
    const valor = parseFloat(linha.children[2].textContent.replace("R$", ""));
    valorTotal -= valor;
    valorTotalEl.textContent = valorTotal.toFixed(2);
    linha.remove();
  }
});

formVenda.addEventListener("submit", (e) => {
  e.preventDefault();

  const venda = {
    loja: document.getElementById("loja").value,
    dataCompra: document.getElementById("dataCompra").value,
    status: document.getElementById("status").value,
    valorTotal: valorTotal.toFixed(2)
  };

  console.log("Venda registrada:", venda);
  mensagem.textContent = "Venda salva com sucesso!";
  formVenda.reset();
  tabelaItens.innerHTML = "";
  valorTotal = 0;
  valorTotalEl.textContent = "0.00";
});

const dataToSend = {
    loja: {
        id: 1, 
        nome: "Loja Central"
    },
    valorTotal: 320.50,
    dataCompra: "2025-10-30",
    status: "Pago",
    itens: [
        {
            tipo: "Remedio",
            descricao: "Antibiótico XYZ",
            valorItem: 120.00,
            estoque: {
                id: 10
            },
            tipoRemedio: "Controlado",
            aplicada: true
        },
        {
            tipo: "Consumivel",
            descricao: "Luvas Descartáveis",
            valorItem: 50.50,
            estoque: {
                id: 15
            }
        },
        {
            tipo: "Estetica",
            descricao: "Limpeza de Pele",
            valorItem: 150.00,
            agenda: {
                id: 20
            }
        }
    ]
};


fetch("http://127.0.0.1:8080/venda/cadvenda", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(dataToSend)
})
.then(response => {
    if (!response.ok) {
        throw new Error("Erro ao cadastrar venda.");
    }
    return response.json();
})
.then(data => {
    const venda_id = data.id; // ID retornado pelo backend
    console.log("Venda cadastrada com ID:", venda_id);

    localStorage.setItem("id_venda", venda_id);
})
.catch(error => {
    console.error("Erro na requisição:", error);
});


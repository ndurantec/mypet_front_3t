function mostrarErro(idElemento, mensagem) {
  document.getElementById(idElemento).textContent = mensagem;
}

function coletarDados() {
  return {
      email: document.getElementById("email").value.trim(),
      senha: document.getElementById("senha").value.trim(),

  };
}


function Autenticar() {
  
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");
  
  const dados = coletarDados();

  fetch("http://127.0.0.1:8080/auth/login;" , {

    method: "POST",
    mode: "cors",
    cache: "no-cache",

    body: JSON.stringify( 
      dados
    ),
     
    headers: headers

 
  }).then(async response => {
      let data = await response.json();

      console.log(data);
      

      if (!response.ok) {
        // Caso sejam erros de validação no DTO
        if (typeof data === "object") {
          let mensagens = Object.values(data).join("<br>");

          console.log("Entrou dento do if data ==== object");
          console.log("----------------------------------------------");
          console.log(mensagens);
          console.log("----------------------------------------------");

            let mensagensGlobais = []; // Para erros que não mapeiam para um campo específico

            for (const [campo, mensagem] of Object.entries(data)) {
                // Mapeia o nome do campo do backend ('cpf', 'email', etc.) para o ID do elemento no HTML
                const idElementoErro = "erro-" + campo; // Ex: 'cpf_error_message'

                console.log("========================================================");
                console.log(idElementoErro);
                console.log("========================================================");
                // Tenta exibir o erro no elemento específico
                if (document.getElementById(idElementoErro)) {
                    //CHAMANDO A SUA FUNÇÃO mostrarErro(idElemento, mensagem)
                    mostrarErro(idElementoErro, mensagem);
                                        
                } 



            }

          
        } else {
          mostrarMensagem("⚠️ Erro desconhecido", "erro");
        }
        throw new Error("Erro de validação");
      }

      return data;
    })
    .then(data => {
      if (data.id) {
        localStorage.setItem("id_user", data.id);
        // mostrarMensagem(data.message || "✅ Professor cadastrado com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error))
}

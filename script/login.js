function Autenticar() {

  const vemail = document.getElementById("email").value.trim();
  const vsenha = document.getElementById("senha").value.trim();
  //let valorDaChaveDoProfessor = localStorage.getItem('id_professor');

  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch("http://127.0.0.1:8080/auth/login;"),({

    method: "POST",
    mode: "cors",
    cache: "no-cache",

    body: JSON.stringify({
      email: vemail,
      senha: vsenha
    }),
     
    headers: headers

 
  }).then(response => {
    if (!response.ok) {
      throw new Error("Erro na resposta da API");
    }
    return response.json(); // <- converte o corpo da resposta em JSON
  }).then(  data =>  {

    const autenticodo_id = data.id;
    console.log("Id do registro salvo: ", autenticodo_id);

    localStorage.setItem('autenticodo_id', autenticodo_id);
    //let valorDaChaveDoProfessor = localStorage.getItem('id_professor');

  }).catch(error => console.error('Erro!:', error));

}
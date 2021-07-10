    // Variavel Imagem
    var imagemEnder;
    var retorno;


  function requestCadastro(opts) {

    // fetch('http://minhaudocao.com.br:8080/api/pessoa/add', {
     fetch('http://localhost:8080/api/pessoa/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(opts)
    }).then(response => response.ok ? alert("Cadastro efetuado com sucesso!"):alert("Não foi possível a inclusão do cadastro!"));
  }

  function submitCadastro() {

    var nome = document.getElementById('nome').value;
    var sobrenome = document.getElementById('sobrenome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var confirmacao = document.getElementById('senha').value;
    var rua = document.getElementById('rua').value;
    var numero = document.getElementById('numero').value;
    var bairro = document.getElementById('bairro').value;
    var cidade = document.getElementById('cidade').value;
    var estado = document.getElementById('estado').value;


    if (validaEmail(email)) {
        if (validaEndereco(rua, numero, bairro, cidade, estado )) {
            if (validaConfirmacaoSenha(senha, confirmacao)){
                    requestCadastro({
                    idPessoa: null,
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    imagem: imagemEnder,
                    senha: senha
                });
            } else {
                alert('Confirmacao de senha não confere!');
            }
        } else {
            alert('Numero invalido!');
        }
    } else {
        alert('Email Invalido!');
    }
  }


 
function validaEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}




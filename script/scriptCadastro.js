    // Variavel Imagem
    var imagemEnder;
    var retorno;

    function limpa_formulario_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('rua').value=("");
            document.getElementById('bairro').value=("");
            document.getElementById('cidade').value=("");
            document.getElementById('estado').value=("");
            
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('rua').value=(conteudo.logradouro);
            document.getElementById('bairro').value=(conteudo.bairro);
            document.getElementById('cidade').value=(conteudo.localidade);
            document.getElementById('estado').value=(conteudo.uf);
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulario_cep();
            alert("CEP não encontrado.");
            document.getElementById('cep').value=("");
        }
    }
        
    function pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep !== "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value="...";
                document.getElementById('bairro').value="...";
                document.getElementById('cidade').value="...";
                document.getElementById('estado').value="...";
         
                requestCep("s",cep);
				
            } //end if.
            else {
                //cep é inválido.
                limpa_formulario_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
			 alert("Informe um cep válido");
            //cep sem valor, limpa formulário.
            limpa_formulario_cep();
        }
    }

function requestCep(url, name) {
  fetch("https://api.postmon.com.br/v1/cep/" + name)
    .then(response => response.ok ? response.json():alert("Cep não encontrado"))
    .then(data => {
          
                document.getElementById('estado').value=data.estado;
				document.getElementById('rua').value= data.logradouro;
                document.getElementById('bairro').value=data.bairro;
                document.getElementById('cidade').value=data.cidade; 

    })
    .catch(err => console.log(err)); 
}


  function requestCadastro(opts) {
    var imagem = document.getElementById('imagem');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "");
    //myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJpbGlhZ3BtQGhvdG1haWwuY29tIiwiaWF0IjoxNjI1ODY4MTUwLCJleHAiOjE2MjU5MDQxNTB9.h8EGmHLfxzTryA17w8z6dyYjYPhjWYH9P804D4Bz1y0")

    var formdata = new FormData();
    formdata.append("foto", imagem.files[0]);//, imagem.files[0].name);
    formdata.append("pessoa", new Blob([JSON.stringify({email:opts.email,
                                                        endereco:{
                                                            bairro:opts.bairro,
                                                            cep:opts.cep,
                                                            cidade:opts.cidade,
                                                            estado:opts.estado,
                                                            id:opts.id,
                                                            logradouro:opts.rua,
                                                            numero:opts.numero
                                                        },
                                                        idPessoa:opts.idPessoa,
                                                        nome:opts.nome,
                                                        senha:opts.senha,
                                                        sobrenome:opts.sobrenome
                                                        })],
                                                        {type: "application/json"}));

    if (opts.tipopessoa == "pessoafisica")
    {
        fetch('http://minhaudocao.com.br:8080/api/pessoa/add', {
        //fetch('http://localhost:8080/api/pessoa/add', {
            method: 'POST',
            headers: {
                "Content-Type": "undefined"
            },
            data: formdata
        }).then(response => response.ok ? alert("Cadastro efetuado com sucesso!"):alert("Não foi possível a inclusão do cadastro!"));
    } else {
        fetch('http://minhaudocao.com.br:8080/api/instituicao/add', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({descrico:opts.documento,
                                email:opts.email,
                                endereco:{
                                    bairro:opts.bairro,
                                    cep:opts.cep,
                                    cidade:opts.cidade,
                                    estado:opts.estado,
                                    id:opts.id,
                                    logradouro:opts.rua,
                                    numero:opts.numero
                                },
                                idPessoa:opts.idPessoa,
                                imagem:null,//formdata,
                                nome:opts.nome,
                                senha:opts.senha,
                                sobrenome:opts.sobrenome,
                                telefone:opts.telefone
                                })
        }).then(response => response.ok ? alert("Cadastro efetuado com sucesso!"):alert("Não foi possível a inclusão do cadastro!"));

    }
}

  function submitCadastro() {

    var documento = document.getElementById('documento').value;
    var tipopessoa = document.getElementById('tipopessoa').value;
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
    var telefone = document.getElementById('telefone').value;


    if (validaEmail(email)) {
        if (validaEndereco(rua, numero, bairro, cidade, estado )) {
            if (validaConfirmacaoSenha(senha, confirmacao)){
                    requestCadastro({
                    idPessoa: null,
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    senha: senha,
                    logradouro: rua,
                    bairro: bairro,
                    cep:cep,
                    cidade:cidade,
                    numero:numero,
                    id:null,
                    tipopessoa:tipopessoa,
                    documento:documento,
                    telefone:telefone
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

  function requestUploadImagem(imagem, nome) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "");

    var formdata = new FormData();
    formdata.append("file", imagem, nome);

    fetch('http://localhost:8080/api/uploadFoto', {
        method: 'POST',
        header:myHeaders,
        body: formdata
    })
    .then(response => response.text())
    .then(result => {
        imagemEnder = result;
        console.log(result);
    })
    .catch(error => console.log('Error Upload Foto ', error));

  }


function formatar(mascara, documento){
  var i = documento.value.length;
  var saida = mascara.substring(0,1);
  var texto = mascara.substring(i);
  
  if (texto.substring(0,1) != saida){
            documento.value += texto.substring(0,1);
  }
  
}
 
function validaEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validaEndereco(rua, numero, bairro, cidade, estado ) {
    const nulo = /null/;
    const re = /\d+/g;
    if (!nulo.test(rua)){
        if (re.test(numero)) {
            if (!nulo.test(bairro)) {
                if (!nulo.test(cidade)) {
                    if (!nulo.test(estado)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function validaConfirmacaoSenha(senha, confirmacao)
{
    if (senha != confirmacao){
        return false;
    }
    return true;

}


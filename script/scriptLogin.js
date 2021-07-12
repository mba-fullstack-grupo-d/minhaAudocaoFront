    var retorno;

  function requestLogin(opts) {

    fetch('http://minhaudocao.com.br:8080/api/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(opts)
    })
    .then(response => response.text())
    .then(result => {
          var jsonobject = JSON.parse(result);

        if (jsonobject['jwt'].length < 100) {            
            alert(jsonobject['jwt']);
        } else {
            gravarCookie(result);
            window.location.replace("home.html");
        }
        console.log(result);
    })
    .catch(error => console.log('Erro de Autenticação ', error));
  }

  function submitLogin() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (validaEmail(email)) {
                    requestLogin({
                    username: email,
                    password: password
                });
    } else {
        alert('Email Invalido!');
    }
  }


 
function validaEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function gravarCookie(token) {

    try
    {
        var tempodevida = new Date();
        var jsonobject = JSON.parse(token);

        tempodevida.setTime(tempodevida.getTime() + (1*24*60*60*1000));
        tempodevida = tempodevida.toUTCString();
        document.cookie = 'auth=' + encodeURI(jsonobject['jwt']) + '; expires=' + tempodevida + '; path=/';
    } catch (error) {
         console.log('Error ao gravar cookie ', error);
    }
}

// Apaga o cookie
// Envie o nome do cookie como parâmetro
function apaga_cookie(nome){
    // Cria uma data 
    var data = new Date();
    // Converte a data para GMT
    data = data.toGMTString();
    // Tenta modificar o valor do cookie para a data expirada
    // Assim ele será apagado
    document.cookie = nome + '=; expires=' + data + '; path=/';
}

// Obtém o valor de um cookie
// Envie o nome do cookie como parâmetro
function valor_cookie(nome_cookie) {
    // Adiciona o sinal de = na frente do nome do cookie
    var cname = ' ' + nome_cookie + '=';
    
    // Obtém todos os cookies do documento
    var cookies = document.cookie;
    
    // Verifica se seu cookie existe
    if (cookies.indexOf(cname) == -1) {
        return false;
    }
    
    // Remove a parte que não interessa dos cookies
    cookies = cookies.substr(cookies.indexOf(cname), cookies.length);

    // Obtém o valor do cookie até o ;
    if (cookies.indexOf(';') != -1) {
        cookies = cookies.substr(0, cookies.indexOf(';'));
    }
    
    // Remove o nome do cookie e o sinal de =
    cookies = cookies.split('=')[1];
    
    // Retorna apenas o valor do cookie
    return decodeURI(cookies);
}

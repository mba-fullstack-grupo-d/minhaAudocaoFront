 
 
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

token =localStorage.getItem("token"); 
personId=localStorage.getItem("idPerson"); 

alert(token);
alert(personId);


function sleep(ms) {

  return new Promise(resolve => setTimeout(resolve, ms));
}


function onlynumber(evt) {
   var theEvent = evt || window.event;
   var key = theEvent.keyCode || theEvent.which;
   key = String.fromCharCode( key );
   //var regex = /^[0-9.,]+$/;
   var regex = /^[0-9.]+$/;
   if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
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

function limpa_formulario_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('rua').value=("");
            document.getElementById('bairro').value=("");
            document.getElementById('cidade').value=("");
            document.getElementById('estado').value=("");
            
}


function pesquisacep_evento(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep !== "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua_evento').value="...";
                document.getElementById('bairro_evento').value="...";
                document.getElementById('cidade_evento').value="...";
                document.getElementById('estado_evento').value="...";
         
                requestCep_evento("s",cep);
				
            } //end if.
            else {
                //cep é inválido.
                limpa_formulario_cep_evento();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
			 alert("Informe um cep válido");
            //cep sem valor, limpa formulário.
            limpa_formulario_cep_evento();
        }
}

function requestCep_evento(url, name) {
  fetch("https://api.postmon.com.br/v1/cep/" + name)
    .then(response => response.ok ? response.json():alert("Cep não encontrado"))
    .then(data => {
          
                document.getElementById('estado_evento').value=data.estado;
				document.getElementById('rua_evento').value= data.logradouro;
                document.getElementById('bairro_evento').value=data.bairro;
                document.getElementById('cidade_evento').value=data.cidade; 

    })
    .catch(err => console.log(err));
}

function limpa_formulario_cep_evento() {
            //Limpa valores do formulário de cep.
            document.getElementById('rua_evento').value=("");
            document.getElementById('bairro_evento').value=("");
            document.getElementById('cidade_evento').value=("");
            document.getElementById('estado_evento').value=("");
            
}

 


async function preencherDadosPessoais(campoId){


campoId= personId;
window.scrollTo(0, 0);

console.log(campoId);


alert(personId);

let response  = await fetch("http://minhaudocao.com.br:8080/api/pessoa/"+ personId +"", { method: 'GET', headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':"Bearer "+token+""} }); 


console.log(campoId);

if (response.status === 401){

   window.location.replace("login.html");
}
if (response.status === 200) {
data= await response.json();
console.log(data); 
document.getElementById("nome").value=data.nome;
document.getElementById("email").value=data.email;
document.getElementById("telefone").value=data.telefone;
document.getElementById("cep").value=data.endereco.cep;
document.getElementById('rua').value=data.endereco.logradouro;
document.getElementById('bairro').value=data.endereco.bairro;
document.getElementById('cidade').value=data.endereco.cidade;
document.getElementById('estado').value=data.endereco.estado;
document.getElementById('numero').value=data.endereco.numero; 

}

else{ alert("Não foi possível a busca do evento!"); }
}
 

 





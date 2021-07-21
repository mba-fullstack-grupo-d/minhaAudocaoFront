 
 

function CapturaParametrosUrl() {

    //captura a url da página
    var url = window.location.href; 
    alert("URL CAPTURADA: \n\n" + url);
	
	//tenta localizar o ?
    var res = url.split('?'); 
    	
	if (res[1] === undefined) {
        alert('página sem parâmetros.');
    }
	
    if (res[1] !== undefined) {
		//tenta localizar os & (pode haver mais de 1)
        var parametros = res[1].split('&');
        alert('Parametros encontrados:\n' + parametros);
    }
}
 



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
instituicaoId=localStorage.getItem("idInstituicao"); 

if(token==null){

   window.location.replace("login.html");
}

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

function mostraEscondePets(buttonName, campoId){

window.scrollTo(0, 0);
var obj = document.getElementById("tablePets");
obj.style.display = "none"; 
var x = document.getElementById("formPetsDiv");
x.style.visibility = "visible";
var button = document.getElementById("cadastrar_pet");
if(buttonName==1){
button.innerText = "Editar pet"
preencherFormPet(campoId)
document.getElementById("fotos").style.visibility = "hidden"; 
document.getElementById("idPet").value = campoId ;
}
if(buttonName==2){
button.innerText = "Cadastrar pet"
document.getElementById("fotos").style.visibility = "visible"; 
document.getElementById("divFotosPets").style.visibility = "hidden";
document.getElementById("idPet").value = 0 ;

}
}



async function preencherFormPet(campoId){
window.scrollTo(0, 0);

console.log(campoId);
let response  = await fetch("http://minhaudocao.com.br:8080/api/pet/"+campoId+"", { method: 'GET', headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':"Bearer "+token+""} }); 


console.log(campoId);

if (response.status === 401){

   window.location.replace("login.html");
}

if (response.status === 200) {
data= await response.json();
console.log(data);


document.getElementById('img1').src=data.uriFotos[0];
document.getElementById('img2').src=data.uriFotos[1];
document.getElementById('img3').src=data.uriFotos[2];
document.getElementById('img4').src=data.uriFotos[3];

document.getElementById("fotos").style.visibility = "hidden"; 
document.getElementById("divFotosPets").style.visibility = "visible"; 
document.getElementById("nome_pet").value=data.nome;
document.getElementById('idade_pet').value=data.idade;

document.getElementById('descricao_pet').value=data.descricao;
var tipo = capitalizeFirstLetter(data.especie)
console.log(tipo); 
$("#especie_select").find('option:contains("' + tipo + '")').prop('selected', true);
$("#sexo_select_pet").find('option:contains("' + capitalizeFirstLetter(data.genero) + '")').prop('selected', true);
console.log(capitalizeFirstLetter(data.genero)); 
$("#vacinado_select").find('option:contains("' + changeLabel(data.vacinado) + '")').prop('selected', true);
$("#castrado_pet_select").find('option:contains("' + changeLabel(data.castrado) + '")').prop('selected', true);
if(data.adotado){
$("#status_pet_select").find('option:contains("Adotado")').prop('selected', true);
}
else{
$("#status_pet_select").find('option:contains("Em adocao")').prop('selected', true);

}
    


}

else{ alert("Não foi possível a busca do evento!"); }
}









function mostraEscondeEventos(buttonName, campoId){

window.scrollTo(0, 0);
var obj = document.getElementById("tableEventos");
obj.style.display = "none"; 
var x = document.getElementById("formEventosDiv");
x.style.visibility = "visible";
var button = document.getElementById("cadastrar_evento");
if(buttonName==1){
button.innerText = "Editar evento"
console.log(campoId);
document.getElementById("id_evento").value = campoId ;
preencherFormEvento(campoId);

}
if(buttonName==2) {
document.getElementById("id_evento").value = 0 ;
button.innerText = "Cadastrar evento" 
}
}


async function preencherFormEvento(campoId){

window.scrollTo(0, 0);

console.log(campoId);
let response  = await fetch("http://minhaudocao.com.br:8080/api/evento/"+campoId+"", { method: 'GET', headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':"Bearer "+token+""} }); 


console.log(campoId);

if (response.status === 401){

   window.location.replace("login.html");
}

if (response.status === 200) {
data= await response.json();
console.log(data);


document.getElementById("titulo_evento").value=data.nome;
document.getElementById('cep_evento').value=data.endereco.cep;
document.getElementById('rua_evento').value=data.endereco.logradouro;
document.getElementById('bairro_evento').value=data.endereco.bairro;
document.getElementById('cidade_evento').value=data.endereco.cidade;
document.getElementById('estado_evento').value=data.endereco.estado;
document.getElementById('numero_evento').value=data.endereco.numero;
document.getElementById("descricao_evento").value=data.descricao;
document.getElementById("idEndereco").value=data.endereco.id;
    

var year=data.datas[0].data.substring(0,4)
var month=data.datas[0].data.substring(5,7)
var day=data.datas[0].data.substring(8,10)

date= day +"-"+ month +"-"+ year
console.log(date) 
document.getElementById("datepicker1").value= date +" "+ data.datas[0].horaInicio;
document.getElementById("datepicker2").value= date +" "+ data.datas[0].horaFim
document.getElementById("idData").value=data.datas[0].id;
    

}

else{ alert("Não foi possível a busca do evento!"); }
}







function mostraEscondeFormulario(buttonName,campoId){

window.scrollTo(0, 0);
var obj = document.getElementById("tableFormulario");
obj.style.display = "none"; 
var x = document.getElementById("formFormularioDiv");
    x.style.visibility = "visible";
var button = document.getElementById("cadastrar_campo");
button.innerText = buttonName;
if(buttonName==1){
button.innerText = "Editar campo"
console.log(campoId);
preencherFormCampo(campoId);
}
if(buttonName==2){
button.innerText = "Cadastrar campo"

}
}

function capitalizeFirstLetter(string) {

  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function preencherFormCampo(campoId){ 

window.scrollTo(0, 0);
console.log(campoId);
let response  = await fetch("http://minhaudocao.com.br:8080/api/formulario/"+campoId+"", { method: 'GET', headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':"Bearer "+token+""} }); 


console.log(campoId);

if (response.status === 401){

   window.location.replace("login.html");
}

if (response.status === 200) {
data= await response.json();
console.log(data);

document.getElementById("nome_campo").value= data.nome;
var tipo = capitalizeFirstLetter(data.tipo)
console.log(tipo); 
$("#tipo_campo_select").find('option:contains("' + tipo + '")').prop('selected', true);
$("#obrigatorio_select").find('option:contains("' + changeLabel(data.obrigatorio) + '")').prop('selected', true);


}

else{ alert("Não foi possível a inclusão do cadastro!"); }
}

 


function formatar(mascara, documento){
  var i = documento.value.length;
  var saida = mascara.substring(0,1);
  var texto = mascara.substring(i);
  
  if (texto.substring(0,1) != saida){
            documento.value += texto.substring(0,1);
  }
  
  
}

function meMostraPets(){ 
buscaPets(0);
var obj = document.getElementById("tablePets");
obj.style.visibility = "visible"; 
obj.style.display = "table"; 

window.scrollTo(0, 0); 
var x = document.getElementById("formPetsDiv");
    x.style.visibility = "hidden";


var x = document.getElementById("divFotosPets");
    x.style.visibility = "hidden";
var x = document.getElementById("fotos");
    x.style.visibility = "hidden";


}

function meMostraFormulario(){
buscaCampo(0); 
var obj = document.getElementById("tableFormulario");
obj.style.visibility = "visible"; 
obj.style.display = "table";  
window.scrollTo(0, 0);
var x = document.getElementById("formFormularioDiv");
x.style.visibility = "hidden";  
}


function meMostraEventos(){
buscaEventos(0); 
var x = document.getElementById("formEventosDiv");
   var obj = document.getElementById("tableEventos");
obj.style.visibility = "visible"; 
obj.style.display = "table"; 

window.scrollTo(0, 0);

var x = document.getElementById("formEventosDiv");
    x.style.visibility = "hidden";

}


async function addCampo(){ 
 
 
var  nome= document.getElementById("nome_campo").value;
 
	if(nome==""){
	alert("Preencher o nome do campo")	
	return ;
	}
    
    var select_tipo_campo = document.getElementById("tipo_campo_select")
    var select_tipocampo_value = select_tipo_campo.options[select_tipo_campo.selectedIndex].value;
    
if(select_tipocampo_value ==""){
	alert("Preencher o tipo do campo")	
	}

    var select_obrigatorio = document.getElementById("obrigatorio_select") 
	var select_obrigatorio_value = select_obrigatorio.options[select_obrigatorio.selectedIndex].value;
  
if(select_obrigatorio_value ==""){
	alert("Preencher se o campo e obrigatorio")	
	}     
var ob;
if(select_obrigatorio_value =="sim"){
ob=true 
}     
if(select_obrigatorio_value =="nao"){
ob=false
 
}     


let response  = await fetch("http://minhaudocao.com.br:8080/api/formulario/add", { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':"Bearer "+token+""}, 
body: JSON.stringify({ "instituicao": { "id": instituicaoId }, "nome": nome, "obrigatorio": ob, "ordem": 0, "tipo":  select_tipocampo_value }) }); 

if (response.status === 401){

   window.location.replace("login.html");
}


if (response.status === 200) { alert("Cadastro efetuado com sucesso!") ;document.getElementById("nome_campo").value="";
 
sleep(10); buscaCampo(0); meMostraFormulario(); }

else{


 alert("Não foi possível a inclusão do cadastro!"); 


}


     console.log("response = "+response.status)


     console.log(nome)
     console.log(select_tipocampo_value)
     console.log(select_obrigatorio_value)

 
}



async function addEvento(){ 
 
 
var idEvento=document.getElementById("id_evento").value;

var  titulo= document.getElementById("titulo_evento").value;
 
if(titulo ==""){
	alert("Preencher o nome do evento")	
	document.getElementById("titulo_evento").focus();
	return ;
}
    


var cep = document.getElementById('cep_evento').value;
if(cep ==""){
	alert("Preencher o cep do evento")	
	document.getElementById('cep_evento').focus();
	return ;
}



var rua = document.getElementById('rua_evento').value;
var bairro = document.getElementById('bairro_evento').value;
var cidade = document.getElementById('cidade_evento').value;
var estado = document.getElementById('estado_evento').value;
var numero = document.getElementById('numero_evento').value;

if(numero ==""){
	alert("Preencher o numero do endereco do evento");	document.getElementById('numero').focus();
	return ;
}



if(rua ==""){
	alert("Preencher os dados do endereco")	 
	return ;
}

var descricao = document.getElementById('descricao_evento').value; 
if(descricao ==""){
	alert("Preencher a descricacao do evento");	document.getElementById('descricao_evento').focus();
	return ;
}

   





var data1 = document.getElementById('datepicker1').value;
if(data1 ==""){
	alert("Preencher data/hora final do evento")	
	document.getElementById('datepicker1').focus();
	return ;
}

var data2 = document.getElementById('datepicker2').value;
 if(data2 ==""){
	alert("Preencher data/hora final do evento")	
	document.getElementById('datepicker2').focus();
	return ;
}

dataf=data1.substring(0,10)

console.log(dataf)
var year=data1.substring(6,10)
var month=data1.substring(3,5)
var day=data1.substring(0,2)
console.log(year)
console.log(month)
console.log(day)
 
var dataFormatada = year +"-"+ month +"-"+ day



if(idEvento==0){
var foto= document.getElementById("inputGroupFile01_event").files[0];
if(foto==null){
	alert("Preencher foto evento")	
return ;
}

var fotoName= document.getElementById("inputGroupFile01_event").files[0].name;
if(fotoName ==""){
	alert("Preencher foto evento")	
	document.getElementById("inputGroupFile01_event").focus();
	return ;
}
 
var myHeaders = new Headers();
myHeaders.append("Content-Type", "multipart/form-data");
var formdata1 = new FormData();
formdata1.append("file", foto, foto.name);

  let responseFoto = await fetch('http://minhaudocao.com.br:8080/api/uploadFoto', {
        method: 'POST',
        header:myHeaders,
        body: formdata1
    });

if (responseFoto.status === 401){

   window.location.replace("login.html");
}
if (responseFoto.status === 200) { 

   imagemEnder1 = await responseFoto.text();
 
        console.log(imagemEnder1);
 
}
 

console.log(titulo) 
console.log(cep) 
console.log(rua) 
console.log(numero) 
console.log(bairro) 
console.log(cep) 
console.log(estado) 
console.log(descricao)
console.log(foto)
console.log(data1)

console.log(data1.substring(0,10))

console.log(data1.substring(11,16))

console.log(data2.substring(11,16))
console.log(data2)

console.log(dataFormatada)
 



let response  = await fetch("http://minhaudocao.com.br:8080/api/evento/add", { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':"Bearer "+token+""}, body: JSON.stringify({ 
 "datas": [
    {
      "data": dataFormatada,
      "horaFim": data1.substring(11,16),
      "horaInicio": data2.substring(11,16)    
 }
  ],
  "descricao": descricao,
"imagem": imagemEnder1,
  "endereco": { 
    "cep": cep,
    "cidade": cidade,
    "estado": estado,
    "logradouro": rua ,
    "numero": numero,
     "bairro":bairro
  },
  
  "instituicao": {
    "id": instituicaoId
    
  },
  "nome": titulo


 }) }); 


if (response.status === 401){

   window.location.replace("login.html");
}

if (response.status === 200) { alert("Cadastro efetuado com sucesso!") ;

 
sleep(10); 
buscaEventos(0);  
meMostraEventos(); 
document.getElementById("nome_campo").value="";
document.getElementById("titulo_evento").value="";
document.getElementById('cep_evento').value="";
document.getElementById('rua_evento').value="";
document.getElementById('numero_evento').value="";
document.getElementById('bairro_evento').value="";
document.getElementById('cidade_evento').value="";
document.getElementById('estado_evento').value="";
document.getElementById('descricao_evento').value=""; 
document.getElementById("inputGroupFile01_event").value="";
document.getElementById("inputGroupFile01_event").files[0].name="";
document.getElementById('datepicker1').value="";
document.getElementById('datepicker2').value="";
}

else{ alert("Não foi possível a inclusão do cadastro!"); }


}
if(idEvento>0){

var idEndereco = document.getElementById("idEndereco").value;

var idData = document.getElementById("idData").value;
let response  = await fetch("http://minhaudocao.com.br:8080/api/evento", { method: 'PUT', headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':"Bearer "+token+""}, body: JSON.stringify({ 
 "id": idEvento,
        "nome": titulo,
        "descricao":descricao,
        "instituicao": {
            "id": instituicaoId
        },
        "endereco": {
            "id": idEndereco,
            "cidade": cidade,
            "estado": estado,
            "logradouro": rua,
            "numero": numero,
            "cep": cep,
            "bairro": bairro
        },
        "datas": [
            {
                "id": idData,
                "data": "2021-07-21",
                "horaInicio": "00:00",
                "horaFim": "00:00",
                "idEvento": idEvento
            }
        ]


 }) }); 


if (response.status === 401){

   window.location.replace("login.html");
}

if (response.status === 200) { alert("Atualizacao efetuada com sucesso!") ;

 
sleep(10); 
buscaEventos(0);  
meMostraEventos(); 
document.getElementById("nome_campo").value="";
document.getElementById("titulo_evento").value="";
document.getElementById('cep_evento').value="";
document.getElementById('rua_evento').value="";
document.getElementById('numero_evento').value="";
document.getElementById('bairro_evento').value="";
document.getElementById('cidade_evento').value="";
document.getElementById('estado_evento').value="";
document.getElementById('descricao_evento').value=""; 
document.getElementById('datepicker1').value="";
document.getElementById('datepicker2').value="";
}

else{ alert("Não foi possível a inclusão do cadastro!"); }


}


 
 
}






async function deletePet(idPet){ 

console.log(idPet)
var resultado = confirm("Deseja excluir o pet selecionado?");
  if (resultado == true) {
 
let response  = await fetch("http://minhaudocao.com.br:8080/api/pet/delete/"+ idPet +"", { method: 'DELETE', headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':"Bearer "+token+" "}}); 

if (response.status === 401){

   window.location.replace("login.html");
}

if (response.status === 200) {
alert("Per excluido com sucesso!");
sleep(10); 
buscaPets(0); 
meMostraPets(); 

 
}

else{ alert("Não foi possível a exclusao do pet!");

}

}
}


async function deleteCampo(idCampo){ 

console.log(idCampo)
var resultado = confirm("Deseja excluir o campo selecionado?");
  if (resultado == true) {
 
let response  = await fetch("http://minhaudocao.com.br:8080/api/formulario/delete/"+ idCampo +"", { method: 'DELETE', headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':"Bearer "+token+ " "}}); 

if (response.status === 401){

   window.location.replace("login.html");
}

if (response.status === 200) {
alert("Campo excluido com sucesso!");
sleep(10); 
buscaCampo(0); 
meMostraFormulario(); 

 
}

else{ alert("Não foi possível a exclusao do campo!");

}

}
}


async function deleteEvento(idEvento){ 

console.log(idEvento)
var resultado = confirm("Deseja excluir o evento selecionado?");
if (resultado == true) {
 
let response  = await fetch("http://minhaudocao.com.br:8080/api/evento/delete/"+ idEvento +"", { method: 'DELETE', headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':"Bearer "+token+ " "}}); 
if (response.status === 401){

   window.location.replace("login.html");
}
if (response.status === 200) {
alert("Evento excluido com sucesso!");
sleep(10); 
buscaEventos(0); 
meMostraEventos(); 

 
}

else{ alert("Não foi possível a exclusao do evento!");

}

}
}




async function addPet(){ 


 
var  nome= document.getElementById("nome_pet").value;
 
if(nome ==""){
	alert("Preencher o nome do Pet")	
	document.getElementById("nome_pet").focus();
	return ;
}
    

var  idade_pet= document.getElementById("idade_pet").value;
 
if(idade_pet ==""){
	alert("Preencher a idade do Pet")	
	document.getElementById("idade_pet").focus();
	return ;
}
   

var especie_select = document.getElementById("especie_select") 
var especie_select_value = especie_select.options[especie_select.selectedIndex].value;
  
if(especie_select_value ==""){
	alert("Preencher a especie do pet")
}  

 
var sexo_select_pet = document.getElementById("sexo_select_pet") 
var sexo_select_pet_value = sexo_select_pet.options[sexo_select_pet.selectedIndex].value;
  
if(sexo_select_pet_value ==""){
	alert("Preencher o genero do pet")	
}  

var status_pet_select = document.getElementById("status_pet_select") 
var status_pet_select_value = status_pet_select.options[status_pet_select.selectedIndex].value;
  
if(status_pet_select ==""){
	alert("Preencher o status do pet")	
}  
  
var vacinado_select_pet = document.getElementById("vacinado_select") 
var vacinado_select_pet_value = vacinado_select_pet.options[vacinado_select_pet.selectedIndex].value;
  
if(vacinado_select ==""){
	alert("Preencher se o pet eh vacinado ou nao ")	
}  


var castrado_pet_select = document.getElementById("castrado_pet_select") 
var castrado_pet_select_value = castrado_pet_select.options[castrado_pet_select.selectedIndex].value;
  
if(castrado_pet_select_value ==""){
	alert("Preencher se o pet eh vacinado ou nao ")	
}  


var  descricao_pet= document.getElementById("descricao_pet").value;
 
if(descricao_pet ==""){
	alert("Preencher a descricao do Pet")	
	document.getElementById("descricao_pet").focus();
	return ;
}

var vacinado=false
if(vacinado_select_pet_value=="sim"){
vacinado=true
}
var castrado=false
if(castrado_pet_select_value =="sim"){
castrado=true
}
var adotado =false
if(status_pet_select_value =="adotado"){
adotado =true
}

 

var idPet=document.getElementById("idPet").value;

if(idPet==0){

var foto1 = document.getElementById("inputGroupFile01_pet").files[0];
if(foto1 ==null){
	alert("Preencher as fotos do pet")	
return ;
}


var foto2 = document.getElementById("inputGroupFile02_pet").files[0];
if(foto2 ==null){
	alert("Preencher as fotos do pet")	
return ;
}
var foto3 = document.getElementById("inputGroupFile03_pet").files[0];
if(foto3 ==null){
	alert("Preencher as fotos do pet")	
return ;
}
var foto4 = document.getElementById("inputGroupFile04_pet").files[0];
if(foto4 ==null){
	alert("Preencher as fotos do pet")	
return ;
} 
 



alert("Vamos fazer os uploads das fotos do seu pet e o cadastrado dele!");

var imagemEnder1,imagemEnder2,imagemEnder3,imagemEnder4;

var myHeaders = new Headers();
myHeaders.append("Content-Type", "multipart/form-data");

var formdata1 = new FormData();
formdata1.append("file", foto1, foto1.name);

  let responseFoto = await fetch('http://minhaudocao.com.br:8080/api/uploadFoto', {
        method: 'POST',
        header:myHeaders,
        body: formdata1
    });

if (responseFoto.status === 401){

   window.location.replace("login.html");
}
if (responseFoto.status === 200) { 

   imagemEnder1 = await responseFoto.text();
 
        console.log(imagemEnder1);
 
}

var formdata2 = new FormData();
formdata2.append("file", foto2, foto2.name);
responseFoto = await fetch('http://minhaudocao.com.br:8080/api/uploadFoto', {
        method: 'POST',
        header:myHeaders,
        body: formdata2
    });

if (responseFoto.status === 401){

   window.location.replace("login.html");
}
if (responseFoto.status === 200) { 

   imagemEnder2 = await responseFoto.text();
 
        console.log(imagemEnder2);
 
}

var formdata3 = new FormData();
formdata3.append("file", foto3, foto3.name);

responseFoto = await fetch('http://minhaudocao.com.br:8080/api/uploadFoto', {
        method: 'POST',
        header:myHeaders,
        body: formdata3
    });
if (responseFoto.status === 401){

   window.location.replace("login.html");
}

if (responseFoto.status === 200) { 

   imagemEnder3 = await responseFoto.text();
 
        console.log(imagemEnder3);
 
}

var formdata4 = new FormData();
formdata4.append("file", foto4, foto4.name);

if (responseFoto.status === 401){

   window.location.replace("login.html");
}

responseFoto = await fetch('http://minhaudocao.com.br:8080/api/uploadFoto', {
        method: 'POST',
        header:myHeaders,
        body: formdata4
    });

if (responseFoto.status === 401){

   window.location.replace("login.html");
}

if (responseFoto.status === 200) { 

   imagemEnder4 = await responseFoto.text();
 
        console.log(imagemEnder4);
 
}


let response  = await fetch("http://minhaudocao.com.br:8080/api/pet/add", { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':"Bearer "+token+""}, body: JSON.stringify({ 
  
"adotado": adotado,
  "castrado": castrado,
  "descricao": descricao_pet,
  "especie": especie_select_value,
  "fotos": [
  ],
  "genero": sexo_select_pet_value, 
  "idade": idade_pet,
  "instituicao": {
        "id": instituicaoId
  },
  "nome": nome,
  "vacinado": vacinado ,
  "uriFotos": [
    imagemEnder1,imagemEnder2,imagemEnder3,imagemEnder4
  ]
    


 }) }); 


if (response.status === 401){

   window.location.replace("login.html");
}

if (response.status === 200) {
alert("Cadastro efetuado com sucesso!");
sleep(10); 
buscaPets(0); 
meMostraPets(); 

document.getElementById("nome_pet").value="";
document.getElementById("descricao_pet").value="";
document.getElementById("idade_pet").value="";
document.getElementById("inputGroupFile04_pet").value="";
document.getElementById("inputGroupFile02_pet").value="";
document.getElementById("inputGroupFile03_pet").value="";
document.getElementById("inputGroupFile01_pet").value="";




 
}

else{ alert("Não foi possível a inclusão do cadastro!"); 


}


}

 

if(idPet>0){ 

let response  = await fetch("http://minhaudocao.com.br:8080/api/pet", { method: 'PUT', headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':"Bearer "+token+""}, body: JSON.stringify({ 
"id": idPet,
    "nome": nome,
    "especie": especie_select_value,
    "descricao": descricao_pet,
    "adotado": adotado,
    "genero": sexo_select_pet_value,
    "idade": idade_pet,
    "instituicao": {
        "id": instituicaoId
    },
    "vacinado": vacinado,
    "castrado": castrado,
	"adotado": adotado,

 }) }); 


if (response.status === 401){

   window.location.replace("login.html");
}

if (response.status === 200) {
alert("Atualizacao efetuada com sucesso!");
sleep(10); 
buscaPets(0); 
meMostraPets();  



 
}

else{ alert("Não foi possível a inclusão do cadastro!"); 


}







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

async function updateDadosPessoais(){

var nome = document.getElementById("nome").value;
if(nome==""){
alert("Preencher nome");
}

var email =document.getElementById("email").value;
if(email ==""){
alert("Preencher email");
}
var telefone = document.getElementById("telefone").value ;
if(telefone ==""){
alert("Preencher telefone");
}


var cep = document.getElementById("cep").value;
if(cep ==""){
alert("Preencher cep");
}
var rua = document.getElementById('rua').value;
if(rua==""){
alert("Preencher rua");
}
var bairro = document.getElementById('bairro').value;
if(bairro==""){
alert("Preencher bairro");
}
var cidade = document.getElementById('cidade').value;
if(cidade==""){
alert("Preencher cidade");
}
var estado = document.getElementById('estado').value;
if(estado==""){
alert("Preencher estado");
}
var numero = document.getElementById('numero').value; 
if(numero==""){
alert("Preencher numero do endereco");
}



var descricao = document.getElementById('descricao').value;


var idEndInsti = document.getElementById('idEnderecoInsti').value;

let response  = await fetch("http://minhaudocao.com.br:8080/api/instituicao", { 
method: 'PUT', headers: { 'Content-Type': 'application/json;charset=utf-8','Authorization':"Bearer "+token+""}, body: JSON.stringify({   

 "id": instituicaoId,
    "nome": nome,
    "descricao":descricao,
    "email": email, 
    "telefone": telefone,
     "endereco": {
        "id": idEndInsti,
        "cidade": cidade,
        "estado":estado,
        "logradouro": rua,
        "numero": numero,
        "cep": cep,
        "bairro": bairro
    }



    
 }) });  


if (response.status === 401){

   window.location.replace("login.html");
}
if (response.status === 200) { 
alert("Atualizacao efetuada com sucesso!"); 
}

else{ alert("Não foi possível a busca do evento!"); }



}


async function preencherDadosPessoais(campoId){


campoId=instituicaoId;
window.scrollTo(0, 0);

console.log(campoId);
let response  = await fetch("http://minhaudocao.com.br:8080/api/instituicao/"+ instituicaoId +"", { method: 'GET', headers: { 'Content-Type': 'application/json;charset=utf-8'} }); 


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
document.getElementById('descricao').value=data.descricao; 
document.getElementById('idEnderecoInsti').value=data.endereco.id; 
 
}

else{ alert("Não foi possível a busca do evento!"); }
}


var dataPets;
var tamanhoPagina = 6;
var pagina_pet = 0;
var sizePet=0;



async function fetchPets() {

let response = await fetch("http://minhaudocao.com.br:8080/api/pet/instituicao/"+ instituicaoId +"",{ method: 'GET', headers: {'Authorization':"Bearer "+token+""}});	
	return  await  response.json();; 
 
    
}
 

function changeLabel(label){
if(label==true)
return "Sim";
else{
return "Nao";
}
}

async function buscaPets(page){
if(page==0){
pagina_pet= page;
}

var html="";
var buttonName = "Editar"
dataPets = await fetchPets();


console.log(dataPets);
for (var i = pagina_pet * tamanhoPagina; i < dataPets.length && i < (pagina_pet + 1) *  tamanhoPagina; i++){
  
      
         console.log(i);

	 html+= '<tr>'
    html+=  '<th scope="row">'+i+'</th>'
    html+=  '<td>'+ dataPets[i].nome+'</td>'
    html+=  '<td>'+ dataPets[i].especie+'</td>'
    html+=   '<td>'+ changeLabel(dataPets[i].adotado)+'</td>' 
    html+=   '<td hidden >'+ dataPets[i].id+ '</td>' 
     html+= '<td>'
html+='<button type="button" class="btn btn-editar" onclick="mostraEscondePets(1,'+ dataPets[i].id+')" >Editar</button> ' 
html+='<button type="button" class="btn btn-excluir" onclick="deletePet('+ dataPets[i].id+')">Excluir</button>'
 html+= '</tr>' 
}

console.log(html);

document.getElementById("tbodyPets").innerHTML = "";
document.getElementById('tbodyPets').innerHTML+=html;

if(dataPets.length >0)
$('#numeracao_pet').text('Página ' + (pagina_pet + 1) + ' de ' + Math.ceil(dataPets.length / tamanhoPagina));

return dataPets.length ;
 
} 


async function ajustarBotoesPets() {
    sizePet = await buscaPets(1);
    $('#proximo_pet').prop('disabled', sizeEvento.length <= tamanhoPagina || pagina_pet >= sizePet.length / tamanhoPagina - 1);
    $('#anterior_pet').prop('disabled', sizeEvento.length <= tamanhoPagina || pagina_pet == 0);
}

$(function() {
    $('#proximo_pet').click(function() {
        if (pagina_pet < sizePet / tamanhoPagina - 1) {
			 
            pagina_pet ++;
            buscaPets(1);
            ajustarBotoesPets();
        }
 
    });
    $('#anterior_pet').click(function() {
        if (pagina_pet > 0) {
            pagina_pet--;
			 buscaPets(1);
            ajustarBotoesPets();
        }
    });
    sizePet = buscaPets(1);
    ajustarBotoesPets();
});




async function fetchCampoFormulario() {

let response = await fetch("http://minhaudocao.com.br:8080/api/formulario/instituicao/"+ instituicaoId +"",{ method: 'GET', headers: {'Authorization':"Bearer "+token+""}});	
	return  await  response.json();; 
 
    
}
var data;
var tamanhoPagina = 6;
var pagina = 0;

function changeLabel(label){
if(label==true)
return "Sim";
return "Nao";
}

async function buscaCampo(page){
if(page==0){
pagina=page;
}

var html="";
data = await fetchCampoFormulario();
console.log(data);

for (var i = pagina * tamanhoPagina; i < data.length && i < (pagina + 1) *  tamanhoPagina; i++){
      
         console.log(i);

	 html+= '<tr>'
    html+=  '<th scope="row">'+i+'</th>'
    html+=  '<td>'+data[i].nome+'</td>'
    html+=  '<td>'+data[i].tipo+'</td>'
    html+=   '<td>'+ changeLabel(data[i].obrigatorio)+'</td>' 
    html+=   '<td hidden >'+ data[i].id+ '</td>' 
    html+= '<td>'

html+='<button type="button" class="btn btn-editar"  onclick="mostraEscondeFormulario(1,'+data[i].id+')" >Editar</button> ' 
html+='<button type="button" class="btn btn-excluir" onclick="deleteCampo('+data[i].id+')" >Excluir</button>'
 html+= '</tr>' 
}

console.log(html);

document.getElementById("tbodyCampo").innerHTML = "";
document.getElementById('tbodyCampo').innerHTML+=html;

if(data.length >0)
$('#numeracao_campo').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(data.length / tamanhoPagina));

return data.length;
 
}  


async function ajustarBotoes() {
var size = await buscaCampo(1);

    $('#proximo_campo').prop('disabled', size.length <= tamanhoPagina || pagina >= size.length / tamanhoPagina - 1);
    $('#anterior_campo').prop('disabled', size.length <= tamanhoPagina || pagina == 0);
}

$(function() {
    $('#proximo_campo').click(function() {
        if (pagina < data.length / tamanhoPagina - 1) {
            pagina++;
            buscaCampo(1);
            ajustarBotoes();
        }
    });
    $('#anterior_campo').click(function() {
        if (pagina > 0) {
            pagina--;
            buscaCampo(1);
        }
    });
    buscaCampo(1);
    ajustarBotoes();
});

$('li').click(function() {
  $(this).addClass('active').siblings().removeClass('active');
});



var dataEvento;
var tamanhoPagina = 6;
var pagina_evento = 0;
var sizeEvento=0;
async function fetchEvento() {
  let response = await fetch("http://minhaudocao.com.br:8080/api/evento/instituicao/"+ instituicaoId +"");	
	return  await  response.json();; 
 
    
}

async function buscaEventos(page){
if(page==0){
pagina_evento=0;
}
var html="";
var dataEvento = await fetchEvento();
for (var i = pagina_evento * tamanhoPagina; i < dataEvento.length && i < (pagina_evento + 1) *  tamanhoPagina; i++){
      
         console.log(i);

	 html+= '<tr>'
    html+=  '<th scope="row">'+i+'</th>'
    html+=  '<td>'+dataEvento[i].nome+'</td>'
    html+=  '<td>'+dataEvento[i].endereco.estado+'</td>'
    html+=   '<td>'+dataEvento[i].endereco.cidade+'</td>' 
    html+=   '<td hidden >'+ dataEvento[i].id+ '</td>' 
     html+= '<td>'
html+='<button type="button" class="btn btn-editar" onclick="mostraEscondeEventos(1,'+dataEvento[i].id+')"   >Editar</button> ' 
html+='<button type="button" class="btn btn-excluir" onclick="deleteEvento('+dataEvento[i].id+')"  >Excluir</button>'
 html+= '</tr>' 
}

console.log(html);

document.getElementById("tbodyEvento").innerHTML = "";
var d1 = document.getElementById('tbodyEvento');
d1.insertAdjacentHTML('beforeend', html);

if(dataEvento.length >0)
$('#numeracao_evento').text('Página ' + (pagina_evento + 1) + ' de ' + Math.ceil(dataEvento.length / tamanhoPagina));


return dataEvento.length;

}

async function ajustarBotoesEvento	() {
sizeEvento = await buscaEventos(1);
    $('#proximo_evento').prop('disabled', sizeEvento.length <= tamanhoPagina || pagina_evento >= sizeEvento.length / tamanhoPagina - 1);
    $('#anterior_evento').prop('disabled', sizeEvento.length <= tamanhoPagina || pagina_evento == 0);
}

$(function() {
    $('#proximo_evento').click(function() {
        if (pagina_evento < sizeEvento / tamanhoPagina - 1) {
            pagina_evento ++;
            buscaEventos(1);
            ajustarBotoesEvento();
        }
    });
    $('#anterior_evento').click(function() {
        if (pagina_evento > 0) {
            pagina_evento--;
			 buscaEventos(1);
            ajustarBotoesEvento();
        }
    });
    sizeEvento = buscaEventos(1);
    ajustarBotoesEvento();
});

 


function addDate(){
let numberOfCopies = 1 // Número de cópias;
let divToCopy = document.getElementsByClassName("geral")[0]  // Conteúdo a copiar
let locationToAppend = document.getElementById("copyArea") // Local a adicionar o conteúdo;

// Ciclo que irá efetuar as cópias necessárias
for (let i = 0; i < numberOfCopies; i++) { 
  let clonedDiv = divToCopy.cloneNode(true); // Clone do conteúdo a copiar
  locationToAppend.appendChild(clonedDiv); // Append do conteúdo no local definido

} 

convertTxtToDate()

}


 
function convertTxtToDate() {
        $('input.datepicker').each(function () {
            if ($(this).hasClass('hasDatepicker')) {
                $(this).removeClass('hasDatepicker');
            } 
             
        });

 jQuery(function($) {
        $("input.datepicker").datetimepicker({
    showOn: "focus",
    dateFormat: "dd/mm/yy",
    dayNames: ["Domingo", "Segunda", "Terça", "Quarte", "Quinta", "Sexta", "Sábado"],
    dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
 dateFormat: 'dd/mm/yy',
        closeText:"Fechar",
        prevText:"&#x3C;Anterior",
        nextText:"Próximo&#x3E;",
        currentText:"Hoje",
		 timeText:"Hora"	,
        minuteText :"Minutos",
	      hourText:"Hora"	
 }



);
    });




    } 









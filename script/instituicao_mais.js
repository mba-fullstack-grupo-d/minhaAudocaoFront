function getDados(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function main() {
    try{
    IDInstituicao = location.href.split("=").pop();
    if (IDInstituicao>0) {
        console.log(IDInstituicao);
        getInstituicoes(IDInstituicao);
        getPets(IDInstituicao);
        getEventos(IDInstituicao)
        
    }
    else{window.location.href = "./instituicoes.html"; }
    }catch{
        //window.location.href = "./instituicoes.html";   
    }
   

}

function getInstituicoes(IDInstituicao) {
    let url = "http://minhaudocao.com.br:8080/api/instituicao/"+IDInstituicao;
    console.log(url);
    let data = getDados(url);
    let instituicao = JSON.parse(data);
    let div = document.getElementById("instituicao");
    let divEndereco = document.getElementById("endereco");
    let divMaps = document.getElementById("map-container-google-1");
    let divDisponiveis = document.getElementById("disponiveis");
    let divTituloOng= document.getElementById("TituloOng");
    let conteudoTitulo = '';
    

    let conteudo = '';
    let conteudoEndereco = '';
    let conteudoMaps = '';
    let conteudoDisponiveis = '';
    conteudo = ' <img src="' + instituicao.imagem + '" alt="" class="u-image u-image-default u-image-1" data-image-width="1504" data-image-height="1000"> ' +
        ' <h1 class="u-text u-text-1">' + instituicao.nome + '</h1> ' +
        ' <p class="u-text u-text-2">' + instituicao.descricao + '</p> ';

    conteudoEndereco = '<h2 class="u-text u-text-custom-color-11 u-text-1">' + instituicao.nome + '</h2> ' +
        ' <p class="u-text u-text-2">' + montaEndereco(instituicao) + '</p> ' +
        '<hr style= size="50%" width="80%" color="gray"> ' +
        ' <p class="u-text u-text-3">' + instituicao.telefone + '</p> ' +
        ' <p class="u-text u-text-custom-color-11 u-text-4">' + instituicao.email + '</p>';

    conteudoMaps = ' <iframe src="https://maps.google.com/maps?q=' + instituicao.endereco.cep + '&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" ' +
        ' style="border:0" allowfullscreen></iframe>';
    conteudoDisponiveis = '<h1 class="u-custom-font u-font-lobster u-text u-text-1"> Pets disponíveis de ' + instituicao.nome + ' &nbsp;</h1>';

    conteudoTitulo = '<h1 class="u-text u-text-body-color u-text-1" id = "TituloOng">Ultimos eventos de'+ instituicao.nome+'</h1>';



    div.innerHTML = conteudo;
    divEndereco.innerHTML = conteudoEndereco;
    divMaps.innerHTML = conteudoMaps;
    divDisponiveis.innerHTML = conteudoDisponiveis;
    divTituloOng.innerHTML = conteudoTitulo;
}

function getPets(IDInstituicao) {
     let url ="http://minhaudocao.com.br:8080/api/pet/instituicao/"+IDInstituicao;
    let data = getDados(url);
    let pet = JSON.parse(data);
    let divCard = document.getElementById("card-pet");
    let conteudoCard = '';
    let limite=0;
    pet.forEach(element => {
        // a pagina só comportar até 6 divs de pets sem quebrar o css
    if (limite < 6) {
    conteudoCard = conteudoCard+ 
    '<div class="u-container-style u-custom-color-10 u-list-item u-repeater-item u-shape-rectangle u-list-item-3"> '+
    '<div class="u-container-layout u-similar-container u-container-layout-3"> '+
    '  <img alt="" class="u-image u-image-default u-image-3" data-image-width="1280" data-image-height="853" src="'+element.uriFotos[0]+'"> '+
    '  <h3 class="u-align-center u-custom-font u-font-lobster u-text u-text-24">'+element.nome+'</h3> '+
    '  <div class="u-border-1 u-border-grey-dark-1 u-expanded-width u-line u-line-horizontal u-line-3"></div> '+
    '  <p class="u-custom-font u-font-oswald u-text u-text-custom-color-12 u-text-25">'+
    ' Especie: '+ element.especie+'<br> '+
    ' Sexo: '+ element.genero+'<br> '+
    ' Idade: '+ element.idade+'<br> '+
    ' Castrado: '+ traduzBoolean(element.castrado)+'<br> </p>'+
    '  <a href="Pet_Mais.html?id=' + element.id + '" class="u-align-center u-btn u-button-style u-custom-color-12 u-hover-custom-color-9 u-btn-3" style="bottom: 10px;position: absolute;left:35%">Saber mais</a> '+
    ' </div> '+
    ' </div>';
    limite = limite+1;
    }
    });

    divCard.innerHTML = conteudoCard;
}


function getEventos(IDInstituicao) {
   
    
    let url = "http://minhaudocao.com.br:8080/api/evento/instituicao/"+IDInstituicao;
    let data = getDados(url);
    let evento = JSON.parse(data);
  
    let divCard2 = document.getElementById("layout-2");
    let divCard3 = document.getElementById("layout-3");
    let divCard4 = document.getElementById("layout-4");
    
    let conteudoCard2 = '';
    let conteudoCard3 = '';
    let conteudoCard4 = '';
    


    console.log(evento[0].nome);
if(evento.length>0){
    conteudoCard2 = conteudoCard2 +'<h4 class="u-text u-text-body-color u-text-3">1.&nbsp;'+ evento[0].nome+'&nbsp;</h4> '+
    '<p class="u-text u-text-4">'+evento[0].descricao+'</p>' +
    '<a  id="link_evento1" href="" class="u-active-none u-border-2 u-border-active-grey-70 u-border-black u-border-hover-grey-70 u-btn u-button-style u-hover-none u-none u-text-body-color u-text-hover-grey-70 u-btn-2">MAis</a>';
document.getElementById("link_evento1").href="./Eventos_Mais.html?id="+evento[0].id;

}
if(evento.length>1){ 
conteudoCard3 = conteudoCard3 + ' <h4 class="u-text u-text-body-alt-color u-text-5">2.&nbsp;'+ evento[1].nome+'</h4> '+ ' <p class="u-text u-text-6">'+evento[1].descricao+'</p> '+ ' <a id="link_evento2" href="" class="u-active-none u-border-2 u-border-active-white u-border-hover-white u-border-white u-btn u-button-style u-hover-none u-none u-text-body-alt-color u-text-hover-white u-btn-3">MAIS</a>'; 
document.getElementById("link_evento2").href="./Eventos_Mais.html?id="+evento[1].id;
}

if(evento.lenght>2){
conteudoCard4 = conteudoCard4 + ' <h4 class="u-text u-text-7">3.&nbsp;'+ evento[2].nome+'</h4>'+ ' <p class="u-text u-text-8">'+evento[2].descricao+'</p>'+ ' <a  id="link_evento3" href="" class="u-active-none u-border-2 u-border-active-grey-70 u-border-black u-border-hover-grey-70 u-btn u-button-style u-hover-none u-none u-text-body-color u-text-hover-grey-70 u-btn-4">Mais</a>';
document.getElementById("link_evento3").href="./Eventos_Mais.html?id="+evento[2].id;
}
    divCard2.innerHTML = conteudoCard2;
    divCard3.innerHTML = conteudoCard3;
    divCard4.innerHTML = conteudoCard4; 
 
document.getElementById("link_evento1").href="./Eventos_Mais.html?id="+evento[0].id;
document.getElementById("link_evento2").href="./Eventos_Mais.html?id="+evento[1].id;
document.getElementById("link_evento3").href="./Eventos_Mais.html?id="+evento[2].id;


}

function montaEndereco(registro) {
    endereco = '';
    if (registro.endereco.logradouro !== null) { endereco = endereco + registro.endereco.logradouro + ', '; }

    if (registro.endereco.numero !== null) { endereco = endereco + registro.endereco.numero + ' - '; }
    if (registro.endereco.bairro !== null) { endereco = endereco + registro.endereco.bairro + ' - '; }
    if (registro.endereco.cidade !== null) { endereco = endereco + registro.endereco.cidade + ' - '; }
    if (registro.endereco.estado !== null) { endereco = endereco + registro.endereco.estado; }
    return endereco;
}

function traduzBoolean(valor)
{
    if (valor == true)
    return "Sim"
    else
    return"Não"
}

main()


function getDados(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function main() {

    getPets();
    getEventos();

}



function getPets() {
    let url ="http://minhaudocao.com.br:8080/api/pet/all";
    let data = getDados(url);
    let pet = JSON.parse(data);
    let divCard = document.getElementById("petsdisponiveis");
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
    ' Castrado: '+ traduzBoolean(element.castrado)+'<br> '+
    ' Instituicao: '+ element.instituicao.nome+'<br> </p>'+
    '  <a href="Pet_Mais.html?id='+ element.id +'" class="u-align-center u-btn u-button-style u-custom-color-12 u-hover-custom-color-9 u-btn-3" style="bottom: 10px;position: absolute;left:35%">Saber mais</a> '+
    ' </div> '+
    ' </div>';
    limite = limite+1;
    }
    });

    divCard.innerHTML = conteudoCard;
}


function getEventos() {
    let url = "http://minhaudocao.com.br:8080/api/evento/all";
    let data = getDados(url);
    let evento = JSON.parse(data);
    let divCard2 = document.getElementById("layout-2");
    let divCard3 = document.getElementById("layout-3");
    let divCard4 = document.getElementById("layout-4");
    
    let conteudoCard2 = '';
    let conteudoCard3 = '';
    let conteudoCard4 = '';
    
    conteudoCard2 = conteudoCard2 +'<h4 class="u-text u-text-body-color u-text-3">1.&nbsp;'+ evento[0].nome+'&nbsp;</h4> '+
    '<p class="u-text u-text-4">'+evento[0].descricao+'</p>' +
    '<a href="Eventos_Mais.html?id='+evento[0].id+'" class="u-active-none u-border-2 u-border-active-grey-70 u-border-black u-border-hover-grey-70 u-btn u-button-style u-hover-none u-none u-text-body-color u-text-hover-grey-70 u-btn-2">MAis</a>';

    conteudoCard3 = conteudoCard3 +
    ' <h4 class="u-text u-text-body-alt-color u-text-5">2.&nbsp;'+ evento[1].nome+'</h4> '+
    ' <p class="u-text u-text-6">'+evento[1].descricao+'</p> '+
    ' <a href="Eventos_Mais.html?id='+evento[1].id+'" class="u-active-none u-border-2 u-border-active-white u-border-hover-white u-border-white u-btn u-button-style u-hover-none u-none u-text-body-alt-color u-text-hover-white u-btn-3">MAIS</a>';
   
    conteudoCard4 = conteudoCard4 +
    ' <h4 class="u-text u-text-7">3.&nbsp;'+ evento[2].nome+'</h4>'+
    ' <p class="u-text u-text-8">'+evento[2].descricao+'</p>'+
    ' <a href="Eventos_Mais.html?id='+evento[2].id+'" class="u-active-none u-border-2 u-border-active-grey-70 u-border-black u-border-hover-grey-70 u-btn u-button-style u-hover-none u-none u-text-body-color u-text-hover-grey-70 u-btn-4">Mais</a>';

    divCard2.innerHTML = conteudoCard2;
    divCard3.innerHTML = conteudoCard3;
    divCard4.innerHTML = conteudoCard4;
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


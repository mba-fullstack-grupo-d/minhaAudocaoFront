function getFromBackend(url, cidade, bairro, nomeInstituicao,genero,especie,idade) {
    let request = new XMLHttpRequest()
    if (cidade != '' || bairro != '' || especie != '' || nomeInstituicao != '' || genero != '' || idade !=null){
        request.open("POST", url, false);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        console.log(idade + 'asdasd')
        request.send(JSON.stringify({
            "bairro": bairro==""?null:bairro,
            "cidade": cidade==""?null:cidade,
            "nomeInstituicao": nomeInstituicao==""?null:nomeInstituicao,
            "genero": genero==""?null:genero,
            "especie": especie==""?null:especie,
            "idade": idade==""?null:idade
          }));
    } else {
        request.open("GET", url, false);
        request.send();
    }
    return request.responseText
}

function main() {
    try {
        let page=1;
        page = location.href.split("=").pop();

        if (page > 0) {
            getPet(page);
        }
        else {
            getPet(1);
        }

    } catch {

    }
}

function getPet(page) {
    let cidade = document.getElementById("cidade").value;
    let bairro = document.getElementById("bairro").value;
    let especie = document.getElementById("especie").value;
    let genero = document.getElementById("genero").value;
    let nomeInstituicao = document.getElementById("instituicao").value;
    let idade = document.getElementById("idade").value;
    
    console.log(cidade, bairro, especie, genero, nomeInstituicao, idade)
    
    try{
        if (cidade != '' || bairro != '' || especie != '' || nomeInstituicao != '' || genero != '' || idade!=''){
            page = 1;
            data = getFromBackend("http://minhaudocao.com.br:8080/api/pet/search",cidade, bairro, nomeInstituicao,genero,especie,idade);
            //document.querySelector("form").reset();
        } else {
            data = getFromBackend("http://minhaudocao.com.br:8080/api/pet/all", '', '','', '','',null);
        }
        let records = JSON.parse(data);
        let totalRecords = records.length;
        let pets = JSON.parse(data);
        let div = document.getElementById("card_adote");
        let divPaginacao = document.getElementById("paginacao");
        let divencontradas = document.getElementById("n_encontradas");
        let conteudo = '';
        //Controles de paginacao
        let conteudoPaginacao = '';
        let RegistroAtual = 0;
        let limitePagina = 6;
        let ativarAnterior='';
        let ativarProximo='';
        let ultimaPagina=Math.ceil(totalRecords / 6);
        let foto = '';

    

        pets.forEach(element => {
                    if ((RegistroAtual >= (page-1)*limitePagina)&&(RegistroAtual < page*limitePagina)) {
                        try { foto = element.uriFotos[0]}
                        catch{foto ='';}
                        console.log(foto);
                        conteudo = conteudo + 
                        '<div class="u-container-style u-custom-color-10 u-list-item u-repeater-item u-shape-rectangle u-list-item-1">' +
                        '<div class="u-container-layout u-similar-container u-container-layout-3">' +
                        '<img alt="" class="u-image u-image-default u-image-1" data-image-width="1280" data-image-height="853" src="'+foto+'">' +
                        '<h3 class="u-align-center u-custom-font u-font-lobster u-text u-text-4">'+element.nome+'</h3>' +
                        '<div class="u-border-1 u-border-grey-dark-1 u-line u-line-horizontal u-line-1"></div>' +
                        '<p class="u-custom-font u-font-oswald u-text u-text-custom-color-12 u-text-5">Especie<br>' +
                        '<br>' +
                        '</p>' +
                        '<p class="u-custom-font u-font-oswald u-text u-text-custom-color-12 u-text-6">Idade<br>' +
                        '</p>' +
                        '<p class="u-custom-font u-font-oswald u-text u-text-custom-color-12 u-text-7">'+element.especie+'<br>' +
                        '</p>' +
                        '<p class="u-custom-font u-font-oswald u-text u-text-custom-color-12 u-text-8">Genero<br>' +
                        '</p>' +
                        '<p class="u-custom-font u-font-oswald u-text u-text-custom-color-12 u-text-9">'+element.genero+'</p>' +
                        '<p class="u-custom-font u-font-oswald u-text u-text-custom-color-12 u-text-10">'+element.idade+'</p>' +
                        '<p class="u-custom-font u-font-oswald u-text u-text-custom-color-12 u-text-11">Responsavel<br>' +
                        '</p>' +
                        '<p class="u-custom-font u-font-oswald u-text u-text-custom-color-12 u-text-12">Localizacao<br>' +
                        '<br>' +
                        '</p>' +
                        '<p class="u-custom-font u-font-oswald u-text u-text-custom-color-12 u-text-13">'+element.instituicao.nome+'<br>' +
                        '<br>' +
                        '</p>' +
                        '<p class="u-align-center u-custom-font u-font-oswald u-text u-text-custom-color-12 u-text-14">'+element.instituicao.endereco.cidade+'<br>' +
                        '<br>' +
                        '</p>' +
                        '<a href="./Pet_Mais.html?id='+element.id+'" class="u-align-center u-btn u-button-style u-custom-color-12 u-hover-custom-color-9 u-btn-2">Saber mais</a>' +
                        '</div>' +
                        '</div>' 
                        ;
                        if (RegistroAtual>=Object.keys(instituicao).length-1){ativarProximo='disabled'}else{ ativarProximo=''}  
                    }
                RegistroAtual= RegistroAtual +1; 
            
        });

        if (page<=1){ ativarAnterior='disabled'}else{ ativarAnterior=''};
        if (ultimaPagina == page ) { ativarProximo='disabled'}else{ ativarProximo=''};
        
        conteudoPaginacao =  '<p class="u-align-center u-custom-font u-font-oswald u-text u-text-3" style="bottom: 10; position: absolute;">' +
            '<nav aria-label="...">' +
            '  <ul class="pagination" >' +
            '    <li class="page-item '+ ativarAnterior+'">' +
            '      <a class="page-link"  href="./Adote.html?page='+(page-1)+'" tabindex="-1">Anterior</a>' +
            '    </li>' +
            ((page-1)<=0?'':
            '   <li class="page-item '+ ativarAnterior+'" ><a class="page-link"  style="color: purple" href="./Adote.html?page='+(page-1)+'">'+(page-1)+'</a></li>') +
            '    <li class="page-item active">' +
            '      <a class="page-link"  style="background-color:purple;border-color:purple" href="./Adote.html?page='+(page)+'">'+page+' <span class="sr-only">(atual)</span></a>' +
            '    </li>' +
            ((page)>=ultimaPagina?'    <li class="page-item '+ativarProximo+'">':
            '    <li class="page-item '+ativarProximo+'" ><a  style="color: purple" class="page-link" href="./Adote.html?page='+(parseInt(page)+1)+'">'+(parseInt(page)+1)+'</a></li>') +
            '    <li class="page-item '+ativarProximo+'">' +
            ((page)>=ultimaPagina?'      <a class="page-link"   href="./Adote.html?page='+(parseInt(page))+'">Próximo</a>':
            '      <a class="page-link"   href="./Adote.html?page='+(parseInt(page)+1)+'">Próximo</a>' )+
            '    </li>' +
            '  </ul>' +
            '</nav></p>';
        
        if (Object.keys(pets).length == 0){
            divencontradas.innerHTML ='Nenhum Pet Encontrado';
        } else {
            divencontradas.innerHTML = Object.keys(pets).length + ' Pets encontrados';
        }
        div.innerHTML= conteudo;
        divPaginacao.innerHTML = conteudoPaginacao;
    }catch(e){
        console.log(e);
        let divencontradas = document.getElementById("n_encontradas");
        let div = document.getElementById("card_adote");
        let divPaginacao = document.getElementById("paginacao");
        divencontradas.innerHTML ='Nenhum Pet Encontrado';
        div.innerHTML = '<div></div>';
        divPaginacao.innerHTML = '<div></div>';
    }
}



main()




function getInstituicoes(url, cidade, bairro, nome) {
    let request = new XMLHttpRequest()
    if (cidade != '' || bairro != '' || nome != '')
    {
        request.open("POST", url, false);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify({
            "bairro": bairro==""?null:bairro,
            "cidade": cidade==""?null:cidade,
            "nome": nome==""?null:nome
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
            getEvento(page);
        }
        else {
            getEvento(1);
        }

    } catch {

    }
}

function getEvento(page) {
    let cidade = document.getElementById("cidade").value;
    let bairro = document.getElementById("bairro").value;
    let nome = document.getElementById("nome").value;
    var data = null;
    try
    {
        if (cidade != '' || bairro != '' || nome != '')
        {
            page = 1;
            data = getInstituicoes("http://minhaudocao.com.br:8080/api/evento/search", cidade, bairro, nome);
            document.querySelector("form").reset();
        } else {
            data = getInstituicoes("http://minhaudocao.com.br:8080/api/evento/all", cidade, bairro, nome);
        }
        let records = JSON.parse(data);
        let totalRecords = records.length;
        console.log(records);
        let instituicao = JSON.parse(data);
        let div = document.getElementById("card_evento");
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
    

        instituicao.forEach(element => {
                Object.entries(element.datas).forEach(([key, value]) => {
                    if ((RegistroAtual >= (page-1)*limitePagina)&&(RegistroAtual < page*limitePagina)) {
                        console.log(`${key} ${value}`);
                        conteudo = conteudo + '<div class="u-align-center u-border-1 u-border-grey-75 u-container-style u-custom-color-12 u-list-item u-radius-50 u-repeater-item u-shape-round">' +
                        '<div class="u-container-layout u-similar-container u-container-layout-2">' +
                        '  <div alt="" class="u-image u-image-circle u-image-1" data-image-width="1225" data-image-height="1280" style= "background-image: url(' + element.instituicao.imagem + ')"></div>' +
                        '  <h3 class="u-align-center u-custom-font u-font-oswald u-text u-text-custom-color-10 u-text-3">' + element.nome + '&nbsp;<br>' + element.instituicao.nome + 
                        '  </h3>' +
                        '  <p class="u-align-left u-custom-font u-font-oswald u-text u-text-white u-text-4">' + element.endereco.cidade + '-' + element.endereco.estado + '</p><span class="u-icon u-icon-circle u-text-white u-icon-1"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 54.757 54.757" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-a02c"></use></svg><svg class="u-svg-content" viewBox="0 0 54.757 54.757" x="0px" y="0px" id="svg-a02c" style="enable-background:new 0 0 54.757 54.757;"><g><path d="M27.557,12c-3.859,0-7,3.141-7,7s3.141,7,7,7s7-3.141,7-7S31.416,12,27.557,12z M27.557,24c-2.757,0-5-2.243-5-5' +
                        's2.243-5,5-5s5,2.243,5,5S30.314,24,27.557,24z"></path><path d="M40.94,5.617C37.318,1.995,32.502,0,27.38,0c-5.123,0-9.938,1.995-13.56,5.617c-6.703,6.702-7.536,19.312-1.804,26.952' +
                        'L27.38,54.757L42.721,32.6C48.476,24.929,47.643,12.319,40.94,5.617z M41.099,31.431L27.38,51.243L13.639,31.4' +
                        'C8.44,24.468,9.185,13.08,15.235,7.031C18.479,3.787,22.792,2,27.38,2s8.901,1.787,12.146,5.031' +
                        'C45.576,13.08,46.321,24.468,41.099,31.431z"></path>' +
                        '</g></svg></span>' +
                        '  <p class="u-custom-font u-font-oswald u-text u-text-white u-text-22">'+ element.datas[key].data + '&nbsp&nbsp&nbsp' + element.datas[key].horaInicio + ' às ' + element.datas[key].horaFim +'</p><span class="u-icon u-icon-circle u-text-white u-icon-2"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 512 512" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-0afc"></use></svg><svg class="u-svg-content" viewBox="0 0 512 512" x="0px" y="0px" id="svg-0afc" style="enable-background:new 0 0 512 512;"><g><g><g><circle cx="386" cy="210" r="20"></circle><path d="M432,40h-26V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v20h-91V20c0-11.046-8.954-20-20-20     c-11.046,0-20,8.954-20,20v20h-90V20c0-11.046-8.954-20-20-20s-20,8.954-20,20v20H80C35.888,40,0,75.888,0,120v312     c0,44.112,35.888,80,80,80h153c11.046,0,20-8.954,20-20c0-11.046-8.954-20-20-20H80c-22.056,0-40-17.944-40-40V120     c0-22.056,17.944-40,40-40h25v20c0,11.046,8.954,20,20,20s20-8.954,20-20V80h90v20c0,11.046,8.954,20,20,20s20-8.954,20-20V80h91     v20c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V80h26c22.056,0,40,17.944,40,40v114c0,11.046,8.954,20,20,20     c11.046,0,20-8.954,20-20V120C512,75.888,476.112,40,432,40z"></path><path d="M391,270c-66.72,0-121,54.28-121,121s54.28,121,121,121s121-54.28,121-121S457.72,270,391,270z M391,472     c-44.663,0-81-36.336-81-81s36.337-81,81-81c44.663,0,81,36.336,81,81S435.663,472,391,472z"></path><path d="M420,371h-9v-21c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v41c0,11.046,8.954,20,20,20h29     c11.046,0,20-8.954,20-20C440,379.954,431.046,371,420,371z"></path><circle cx="299" cy="210" r="20"></circle><circle cx="212" cy="297" r="20"></circle><circle cx="125" cy="210" r="20"></circle><circle cx="125" cy="297" r="20"></circle><circle cx="125" cy="384" r="20"></circle><circle cx="212" cy="384" r="20"></circle><circle cx="212" cy="210" r="20"></circle>' +
                        '</g>' +
                        '</g>' +
                        '</g></svg></span>' +
                        '  <a href="Eventos_Mais.html?id=' + element.id + '" class="u-align-center u-btn u-btn-round u-button-style u-custom-color-9 u-hover-custom-color-10 u-radius-50 u-btn-1">SABER MAIS</a> ' +
                        '</div>' +
                        '</div>';
                        if (RegistroAtual>=Object.keys(instituicao).length-1){ativarProximo='disabled'}else{ ativarProximo=''}  
                    }
                RegistroAtual= RegistroAtual +1; 
            })
        });

        if (page<=1){ ativarAnterior='disabled'}else{ ativarAnterior=''};
        if (ultimaPagina == page ) { ativarProximo='disabled'}else{ ativarProximo=''};
        
        console.log(ultimaPagina);
        conteudoPaginacao =  '<p class="u-align-center u-custom-font u-font-oswald u-text u-text-3" style="bottom: 0; position: absolute;">' +
            '<nav aria-label="...">' +
            '  <ul class="pagination" >' +
            '    <li class="page-item '+ ativarAnterior+'">' +
            '      <a class="page-link"  href="./Eventos.html?page='+(page-1)+'" tabindex="-1">Anterior</a>' +
            '    </li>' +
            ((page-1)<=0?'':
            '   <li class="page-item '+ ativarAnterior+'" ><a class="page-link"  style="color: purple" href="./Eventos.html?page='+(page-1)+'">'+(page-1)+'</a></li>') +
            '    <li class="page-item active">' +
            '      <a class="page-link"  style="background-color:purple;border-color:purple" href="./Eventos.html?page='+(page)+'">'+page+' <span class="sr-only">(atual)</span></a>' +
            '    </li>' +
            ((page)>=ultimaPagina?'    <li class="page-item '+ativarProximo+'">':
            '    <li class="page-item '+ativarProximo+'" ><a  style="color: purple" class="page-link" href="./Eventos.html?page='+(parseInt(page)+1)+'">'+(parseInt(page)+1)+'</a></li>') +
            '    <li class="page-item '+ativarProximo+'">' +
            ((page)>=ultimaPagina?'      <a class="page-link"   href="./Eventos.html?page='+(parseInt(page))+'">Próximo</a>':
            '      <a class="page-link"   href="./Eventos.html?page='+(parseInt(page)+1)+'">Próximo</a>' )+
            '    </li>' +
            '  </ul>' +
            '</nav></p>';
        
        if (Object.keys(instituicao).length == 0)
        {
            divencontradas.innerHTML ='Nenhum Evento Encontrado';
        } else {
            divencontradas.innerHTML =Object.keys(instituicao).length + ' Instituições encontradas';
        }
        div.innerHTML= conteudo;
        divPaginacao.innerHTML = conteudoPaginacao;
}
catch{
    let divencontradas = document.getElementById("n_encontradas");
    let div = document.getElementById("card_evento");
    let divPaginacao = document.getElementById("paginacao");
    divencontradas.innerHTML ='Nenhum Evento Encontrado';
    div.innerHTML = '<div></div>';
    divPaginacao.innerHTML = '<div></div>';
}
}

 main()



function getInstituicoes(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function main() {
    let data = getInstituicoes("http://minhaudocao.com.br:8080/api/instituicao/all");
    let instituicao = JSON.parse(data);
    let div = document.getElementById("card_instituicao");
    let conteudo ='';
    console.log(instituicao)
    
    instituicao.forEach(element => {
        console.log(element.imagem)
        conteudo = conteudo + ' <div class="u-border-1 u-border-grey-75 u-container-style u-custom-color-12 u-list-item u-radius-50 u-repeater-item u-shape-round"> ' +
                ' <div class="u-container-layout u-similar-container u-container-layout-2"> ' +
                '    <div alt="" class="u-image u-image-circle u-image-1" data-image-width="1225" data-image-height="1280" style= "background-image: url('+ element.imagem+')"> </div> ' +
                '    <h3 class="u-align-center u-custom-font u-font-oswald u-text u-text-custom-color-10 u-text-3">&nbsp;' + element.nome +'</h3> '+
                '    <p class="u-align-left u-custom-font u-font-oswald u-text u-text-white u-text-4">'+ montaEndereco(element) +'</p><span class="u-icon u-icon-circle u-text-white u-icon-1"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 54.757 54.757" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-06bb"></use></svg><svg class="u-svg-content" viewBox="0 0 54.757 54.757" x="0px" y="0px" id="svg-06bb" style="enable-background:new 0 0 54.757 54.757;"><g><path d="M27.557,12c-3.859,0-7,3.141-7,7s3.141,7,7,7s7-3.141,7-7S31.416,12,27.557,12z M27.557,24c-2.757,0-5-2.243-5-5 ' +
		' s2.243-5,5-5s5,2.243,5,5S30.314,24,27.557,24z"></path><path d="M40.94,5.617C37.318,1.995,32.502,0,27.38,0c-5.123,0-9.938,1.995-13.56,5.617c-6.703,6.702-7.536,19.312-1.804,26.952 '+
		' L27.38,54.757L42.721,32.6C48.476,24.929,47.643,12.319,40.94,5.617z M41.099,31.431L27.38,51.243L13.639,31.4 '+
		' C8.44,24.468,9.185,13.08,15.235,7.031C18.479,3.787,22.792,2,27.38,2s8.901,1.787,12.146,5.031 '+
		' C45.576,13.08,46.321,24.468,41.099,31.431z"></path> '+
        '            </g></svg></span><span class="u-icon u-icon-circle u-icon-2"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 473.806 473.806" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-f7ec"></use></svg><svg class="u-svg-content" viewBox="0 0 473.806 473.806" x="0px" y="0px" id="svg-f7ec" style="enable-background:new 0 0 473.806 473.806;"><g><g><path d="M374.456,293.506c-9.7-10.1-21.4-15.5-33.8-15.5c-12.3,0-24.1,5.3-34.2,15.4l-31.6,31.5c-2.6-1.4-5.2-2.7-7.7-4    c-3.6-1.8-7-3.5-9.9-5.3c-29.6-18.8-56.5-43.3-82.3-75c-12.5-15.8-20.9-29.1-27-42.6c8.2-7.5,15.8-15.3,23.2-22.8    c2.8-2.8,5.6-5.7,8.4-8.5c21-21,21-48.2,0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5c-6-6.2-12.3-12.6-18.8-18.6    c-9.7-9.6-21.3-14.7-33.5-14.7s-24,5.1-34,14.7c-0.1,0.1-0.1,0.1-0.2,0.2l-34,34.3c-12.8,12.8-20.1,28.4-21.7,46.5    c-2.4,29.2,6.2,56.4,12.8,74.2c16.2,43.7,40.4,84.2,76.5,127.6c43.8,52.3,96.5,93.6,156.7,122.7c23,10.9,53.7,23.8,88,26    c2.1,0.1,4.3,0.2,6.3,0.2c23.1,0,42.5-8.3,57.7-24.8c0.1-0.2,0.3-0.3,0.4-0.5c5.2-6.3,11.2-12,17.5-18.1c4.3-4.1,8.7-8.4,13-12.9    c9.9-10.3,15.1-22.3,15.1-34.6c0-12.4-5.3-24.3-15.4-34.3L374.456,293.506z M410.256,398.806    C410.156,398.806,410.156,398.906,410.256,398.806c-3.9,4.2-7.9,8-12.2,12.2c-6.5,6.2-13.1,12.7-19.3,20    c-10.1,10.8-22,15.9-37.6,15.9c-1.5,0-3.1,0-4.6-0.1c-29.7-1.9-57.3-13.5-78-23.4c-56.6-27.4-106.3-66.3-147.6-115.6    c-34.1-41.1-56.9-79.1-72-119.9c-9.3-24.9-12.7-44.3-11.2-62.6c1-11.7,5.5-21.4,13.8-29.7l34.1-34.1c4.9-4.6,10.1-7.1,15.2-7.1    c6.3,0,11.4,3.8,14.6,7c0.1,0.1,0.2,0.2,0.3,0.3c6.1,5.7,11.9,11.6,18,17.9c3.1,3.2,6.3,6.4,9.5,9.7l27.3,27.3    c10.6,10.6,10.6,20.4,0,31c-2.9,2.9-5.7,5.8-8.6,8.6c-8.4,8.6-16.4,16.6-25.1,24.4c-0.2,0.2-0.4,0.3-0.5,0.5    c-8.6,8.6-7,17-5.2,22.7c0.1,0.3,0.2,0.6,0.3,0.9c7.1,17.2,17.1,33.4,32.3,52.7l0.1,0.1c27.6,34,56.7,60.5,88.8,80.8    c4.1,2.6,8.3,4.7,12.3,6.7c3.6,1.8,7,3.5,9.9,5.3c0.4,0.2,0.8,0.5,1.2,0.7c3.4,1.7,6.6,2.5,9.9,2.5c8.3,0,13.5-5.2,15.2-6.9    l34.2-34.2c3.4-3.4,8.8-7.5,15.1-7.5c6.2,0,11.3,3.9,14.4,7.3c0.1,0.1,0.1,0.1,0.2,0.2l55.1,55.1    C420.456,377.706,420.456,388.206,410.256,398.806z"></path><path d="M256.056,112.706c26.2,4.4,50,16.8,69,35.8s31.3,42.8,35.8,69c1.1,6.6,6.8,11.2,13.3,11.2c0.8,0,1.5-0.1,2.3-0.2    c7.4-1.2,12.3-8.2,11.1-15.6c-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3,3.7-15.6,11    S248.656,111.506,256.056,112.706z"></path><path d="M473.256,209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2,3.7-15.5,11    c-1.2,7.4,3.7,14.3,11.1,15.6c46.6,7.9,89.1,30,122.9,63.7c33.8,33.8,55.8,76.3,63.7,122.9c1.1,6.6,6.8,11.2,13.3,11.2    c0.8,0,1.5-0.1,2.3-0.2C469.556,223.306,474.556,216.306,473.256,209.006z"></path> '+
        '            </g> '+
        '            </g></svg></span> '+
        '            <p class="u-align-left u-custom-font u-font-oswald u-text u-text-white u-text-5">' +element.telefone +'</p><span class="u-icon u-icon-circle u-icon-3"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 512 512" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-dcc5"></use></svg><svg class="u-svg-content" viewBox="0 0 512 512" x="0px" y="0px" id="svg-dcc5" style="enable-background:new 0 0 512 512;"><g><g><path d="M467,61H45C20.218,61,0,81.196,0,106v300c0,24.72,20.128,45,45,45h422c24.72,0,45-20.128,45-45V106    C512,81.28,491.872,61,467,61z M460.786,91L256.954,294.833L51.359,91H460.786z M30,399.788V112.069l144.479,143.24L30,399.788z     M51.213,421l144.57-144.57l50.657,50.222c5.864,5.814,15.327,5.795,21.167-0.046L317,277.213L460.787,421H51.213z M482,399.787    L338.213,256L482,112.212V399.787z"></path> '+
        '            </g> '+
        '            </g></svg></span> '+
        '            <p class="u-align-center u-custom-font u-font-oswald u-text u-text-white u-text-6">' +element.email +'</p> '+
        '            <a href="instituicao_mais.html?id='+element.id+'" class="u-align-center u-btn u-btn-round u-button-style u-custom-color-9 u-hover-custom-color-10 u-radius-50 u-btn-1">SABER MAIS</a> '+
        '        </div> '+
        '    </div> '

    });
    div.innerHTML= conteudo;



}

function montaEndereco(registro)
{
    endereco = '';
    if (registro.endereco.logradouro !== null)  {endereco = endereco + registro.endereco.logradouro + ', ';}

    if (registro.endereco.numero !== null)  { endereco = endereco + registro.endereco.numero + ' - ';}
    if (registro.endereco.bairro !== null)  {endereco = endereco + registro.endereco.bairro + ' - ';}
    if (registro.endereco.cidade !== null)  {endereco = endereco + registro.endereco.cidade + ' - ';}
    if (registro.endereco.estado !== null)  {endereco = endereco + registro.endereco.estado;}
    return endereco;
    
}

main()


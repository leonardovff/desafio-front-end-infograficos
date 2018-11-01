var app = {
  news: null,
  editoria: null,
  order: 'time',
  editorialBox: document.querySelector('#editorias > ul'),
  load: (file, callback = null) => {
    fetch(`assets/js/${file}.json`).then((res) => { 
      if(res.ok){
        res.json().then(function(data){
          if(callback != null){
            callback(data);
          }
        });
        return true;
      } 
      alert("ocorreu um erro no carregamento dos dados");
    });
  },
  renderEditorias: () => {
    let news = [...app.news];
    if(app.editoria){
      news = news.filter(news => news.editoria == app.editoria); 
    }
    news.sort((a,b) => {
      if(app.order == "Título"){
        if (a[app.order].toLowerCase() < b[app.order].toLowerCase()) //sort string ascending
          return -1;
        if (a[app.order].toLowerCase() > b[app.order].toLowerCase()) //sort string ascending
          return 1;
        return 0;
      }
      return b[app.order] - a[app.order];
    });
    let string = "";
    news.forEach(noticia => {
      string += `<li class="editorias-noticia">
          <time datetime="${app.convertDataToUs(noticia["Data de publicação"])}">${noticia["Data de publicação"]}</time>
          <h3>${noticia.editoria}</h3>
          <img src="https://github.com/leonardovff/desafio-front-end-infograficos/blob/master/Arquivos/Imagens/Not%C3%ADcias/${noticia.Foto}?raw=true" alt="notícia">
          <h4 class="title-subtitle">${noticia['Título']}</h4>
          <p>${noticia.Texto}</p>
          <a href="#" title="Link para noticia completa">Saiba mais</a>
       </li>`;
    });
    app.editorialBox.innerHTML = string;
  },
  initMap: () => {
    // The location of Minuto
    const pin = {lat: 51.5213358, lng: -0.157326};

    // The map, centered at 
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16.5, 
        disableDefaultUI: true,
        center: {lat: pin.lat, lng: pin.lng + 0.004}
    });
    // The marker, positioned at Minuto
    let marker = new google.maps.Marker({
      position: pin,                                   
      map: map, 
      icon: 'assets/img/pin.png'
    });
  },
  convertDataToUs: data => {
    data = data.split('-');
    return `${data[2]}/${data[1]}/${data[0]}`;
  },
  initListenerEditorias: obj => {
    const exec = (e, indice) => {
      app[indice] = obj[indice].options[e.target.selectedIndex].value;
      app.renderEditorias();
    }
    obj.order.addEventListener('change', (e) => (exec(e, 'order')));
    obj.editoria.addEventListener('change', (e) => (exec(e, 'editoria')));
  },
  renderChart: editorias => {
    let data = [];
    editorias.forEach(editoria => {
      data.push({ 
        'editoria': editoria.Editoria, 
        acesso: Math.floor(Math.random() * 80) + 20 
      });
    });
    data.sort( (a, b) => b.acesso - a.acesso);
    let biggerNumber = data.map(data=>data.acesso).reduce((s,v) => s > v ? s : v,0);
    let template = '';
    data.forEach(editoria => {
      console.log(parseInt( biggerNumber), editoria.acesso, (100 * editoria.acesso) / biggerNumber);
      template += `<div data-porc="${editoria.acesso}" style="height: ${100 * editoria.acesso / biggerNumber}%">
        ${editoria.editoria}
      </div>`;
    });
    document.querySelector('#ranking-chart').innerHTML = template;
  },
  init: () => {
    app.load('noticias', data => {
      let editorias = data[0].Editorias,
      template = "",
      news = [];
      editorias.forEach(editoria => {
        let noticias = editoria['Notícias'].map(noticia => { 
          noticia.editoria = editoria.Editoria;
          let time = app.convertDataToUs(noticia["Data de publicação"]);
          noticia.time = new Date(time).getTime();
          return noticia;
        })
        news = news.concat(noticias);
        template += `<option>${editoria.Editoria}</option>`
      })
      app.news = news;
      let editoriaEl = document.querySelector('select[name="editoria"]');
      editoriaEl.innerHTML += template;
      app.renderEditorias();
      app.renderChart(editorias);
      app.initListenerEditorias({order: document.querySelector('select[name="order"]'), editoria: editoriaEl});
    });
  }
}
app.init();
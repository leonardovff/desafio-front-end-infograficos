let slider = {
  stepCurrent: 0,
  max: 0,
  bannerBox: document.querySelector('#bannerImg'),
  time: null,
  manipule: (action) => {
    if(parseInt(action) > 0) {
      if(slider.stepCurrent == action) return false;
      slider.stepCurrent = action * 1; 
    } else {
      slider.stepCurrent += action == "Voltar" ? -1 : 1; 
    }
    //valid
    if(slider.stepCurrent > slider.max){
      slider.stepCurrent = 0;
    } else if( slider.stepCurrent < 0) {
      slider.stepCurrent = slider.max;
    }
    slider.move(slider.stepCurrent);
  },
  initTime: () => {
     slider.time = setInterval(()=> {
       slider.manipule('Avançar');
     }, 5 * 1000); 
  },
  
  eventListeners: () => {
    document.querySelectorAll('.bannerControl-page > li button, .bannerControl-actions').forEach(el => {
      el.addEventListener('click', (e) => {
        clearInterval(slider.time);
        slider.manipule(e.target.getAttribute('title'));
        slider.initTime();
      });
    });
  },
  move: step => {
    slider.bannerBox.style.marginLeft = `-${step * 100}%`;
    document.querySelector('.bannerControl-page--active').className = "";
    document.querySelector(`.bannerControl-page li:nth-child(${step+1})`).className = "bannerControl-page--active";
  },
  init: () => {
    app.load('slide', data => {
      let template = "";
      slider.max = data[0].imagens.length-1;
      data[0].imagens.forEach(img => {
        template += `<a href="#" title="A senhora fica chamando a Beyoncé e não me chama">
          <img src="Arquivos/Imagens/Slide/${img}?raw=true" alt="A senhora fica chamando a Beyoncé e não me chama">
        </a>`;
      });
      slider.bannerBox.innerHTML = template;
      slider.eventListeners();
      slider.initTime();
    });
  }
}
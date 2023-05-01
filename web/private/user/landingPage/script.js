//preloader
var pagePreloader = document.getElementById("preloader");

window.addEventListener("load", function () {
  pagePreloader.classList.add('preloader-fade-out');
  this.setTimeout(function(){
    pagePreloader.style.display = 'none';
  }, 3000)
});

//animação da imagem
function disableAnimation(){
  document.getElementById('principal').classList.add("disable-animation");
}

function setAnimation(){
  document.getElementById('principal').classList.add("animate");
}

//mostrar e esconder dropdown
arrow.addEventListener('click', () => {
    arrow.classList.toggle('clicked')
    drop.classList.toggle('drop-visible')
    //toggle: avalia a minha classlist: se no momento da chamada ela já tiver a classe informada na função toggle ele a remove, se não ele a adiciona
})

//fazer logout sem que possa voltar
function cantGoBack(){
  window.location.replace("../../../public/landingPage/index.html");
}
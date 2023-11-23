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
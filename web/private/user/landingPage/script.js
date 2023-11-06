//preloader
var pagePreloader = document.getElementById("preloader");
const btnProducts = document.getElementById("product");
const btnProducts2 = document.getElementById("product-2");
const btnAccount = document.getElementById("account");
const btnAccount2 = document.getElementById("account-2");
const btnPayment = document.getElementById("payment");

btnProducts.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToProduct()
})

btnProducts2.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToProduct()
})

btnAccount.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToAccount()
})

btnAccount2.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToAccount2()
})

function redirectToProduct(){
  let id = keepId()
  if(id>0){
    window.location.href = `/login-products?id=${id}`
  }
}

function redirectToAccount(){
  let id = keepId()
  if(id>0){
    window.location.href = `/login-account?id=${id}`
  }
}

function redirectToAccount2(){
  let id = keepId()
  if(id>0){
    window.location.href = `/login-account?id=${id}`
  }
}

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
  window.location.replace("/");
}

function keepId(){
  let id = 0
  let strId = window.location.search.split("=")
  if(strId.length>1){
    id = strId[1]
  }
  return id
}
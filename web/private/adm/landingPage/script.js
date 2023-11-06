const btnProducts = document.getElementById("product");
const btnPurchase = document.getElementById("purchase");
const btnProducts2 = document.getElementById("product-2");
const btnPurchase2 = document.getElementById("purchase-2");
const btnUser = document.getElementById("user");
const btnAccount = document.getElementById("account");

btnProducts.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToProduct()
})

btnProducts2.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToProduct()
})

btnPurchase.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToPurchase()
})

btnPurchase2.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToPurchase()
})

btnUser.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToUser()
})


btnAccount.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToAccount()
})

function redirectToProduct(){
  let id = keepId()
  if(id>0){
    window.location.href = `/adm-products?id=${id}`
  }
}

function redirectToPurchase(){
  let id = keepId()
  if(id>0){
    window.location.href = `/adm-purchases?id=${id}`
  }
}

function redirectToUser(){
  let id = keepId()
  if(id>0){
    window.location.href = `/adm-users?id=${id}`
  }
}

function redirectToAccount(){
  let id = keepId()
  if(id>0){
    window.location.href = `/adm-account?id=${id}`
  }
}

function keepId(){
  let id = 0
  let strId = window.location.search.split("=")
  if(strId.length>1){
    id = strId[1]
  }
  return id
}

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
  window.location.replace("/");
}
const btnHome = document.getElementById("home");
const btnProducts = document.getElementById("product");
const btnPurchase = document.getElementById("purchase");
const btnAccount = document.getElementById("account");

btnHome.addEventListener("click", (event) => {
    event.preventDefault()
    redirectToHome()
})

btnProducts.addEventListener("click", (event) => {
    event.preventDefault()
    redirectToProduct()
  })

btnPurchase.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToPurchase()
}) 

btnAccount.addEventListener("click", (event) => {
    event.preventDefault()
    redirectToAccount()
})

function redirectToHome(){
    let id = keepId()
    if(id>0){
      window.location.href = `/adm?id=${id}`
    }
  }

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
//mostrar e esconder dropdown
arrow.addEventListener('click', () => {
    arrow.classList.toggle('clicked')
    drop.classList.toggle('drop-visible')
    //toggle: avalia a minha classlist: se no momento da chamada ela já tiver a classe informada na função toggle ele a remove, se não ele a adiciona
})

//mostrar modal add adm
let modalAddAdm = document.getElementById('modal-add-adm')
function showModalAddAdm(){
    modalAddAdm.style.display = 'flex'
}
//esconder 
function closeModalAddAdm(){
    modalAddAdm.style.display = 'none'
}

//mostrar modal remove adm
let modalRemoveAdm = document.getElementById('modal-remove-adm')
function showModalRemoveAdm(){
    modalRemoveAdm.style.display = 'flex'
}
//esconder 
function closeModalRemoveAdm(){
    modalRemoveAdm.style.display = 'none'
}

//mostrar modal de endereço
let modalUserAddress = document.getElementById('modal-user-address')
function showModalUserAddress(){
    modalUserAddress.style.display = 'flex'
}
//esconder 
function closeModalUserAddress(){
    modalUserAddress.style.display = 'none'
}

function cantGoBack(){
  window.location.replace("/");
}
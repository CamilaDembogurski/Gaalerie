const btnHome = document.getElementById("home");
const btnProducts = document.getElementById("product");
const btnPurchase = document.getElementById("purchase");
const btnAccount = document.getElementById("account");

const fieldCode = document.getElementById("code");
const fieldCountry = document.getElementById("country");
const fieldState = document.getElementById("state");
const fieldCity = document.getElementById("city");
const fieldNeighborhood = document.getElementById("neighborhood");
const fieldStreet = document.getElementById("street");
const fieldDescription = document.getElementById("description");
const fieldNumber = document.getElementById("number");
let addressId
const rmvAdmBtn = document.getElementById("remove-btn");
const setAdmBtn = document.getElementById("set-btn");

rmvAdmBtn.addEventListener("click", (event) => {
  event.preventDefault()
  let id = document.getElementById("remove-code")
  if(+id.value > 0){
    rmvAdmin(id.value)
  }
  location.reload()
})

setAdmBtn.addEventListener("click", (event) => {
  event.preventDefault()
  let id = document.getElementById("add-code")
  if(+id.value > 0){
    setAdmin(id.value)
  }
  location.reload()
})


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
//esconder e adicionar adm
function closeModalAddAdm(event){
    modalAddAdm.style.display = 'none'
    let id = document.getElementById("add-code")
    if(+id.value > 0){
      setAdmin(id.value)
    }
}

//mostrar modal remove adm
let modalRemoveAdm = document.getElementById('modal-remove-adm')
function showModalRemoveAdm(){
    modalRemoveAdm.style.display = 'flex'
}
//esconder e remover adm 
function closeModalRemoveAdm(){
    modalRemoveAdm.style.display = 'none'
}

//mostrar modal de endereço
let modalUserAddress = document.getElementById('modal-user-address')
function showModalUserAddress(addressId){
    modalUserAddress.style.display = 'flex'
    getAddress(addressId)
}
function getAddress(id){
  axios.get(`http://localhost:3000/addresses/${id}`).then((res) => {
  console.log(res.data)
  fieldCode.value = res.data.id
  fieldCountry.value = res.data.country
  fieldState.value = res.data.state
  fieldCity.value = res.data.city
  fieldNeighborhood.value = res.data.neighborhood
  fieldStreet.value = res.data.street
  fieldDescription.value = res.data.description
  fieldNumber.value = res.data.number
  addressId = id 
  })
}

function setAdmin(id){
  axios.patch(`http://localhost:3000/users/${id}`).then((res) => {
    console.log(res)
  })
}

function rmvAdmin(id){
  axios.delete(`http://localhost:3000/adm-users/${id}`).then((res) => {
    console.log(res)
  })
}

//esconder 
function closeModalUserAddress(){
    modalUserAddress.style.display = 'none'
}

function cantGoBack(){
  window.location.replace("/");
}


//mostrar os usuários
function usersMap(users){
  let displayUsers = document.getElementById("display-users")
  for(let user of users){
    let newUser = document.createElement("div")
    newUser.classList.add("user-box")
    let newTitle = document.createElement("div")
    newTitle.classList.add("title")
    newTitle.innerText = user.login
    let newImgTxt = document.createElement("div")
    newImgTxt.classList.add("img-text")
    let newImg = document.createElement("div")
    newImg.classList.add("img")
    newImg.style.backgroundImage = `url(../../assets/icons/icon-user-purple.svg)`
    let newTxt = document.createElement("div")
    newTxt.classList.add("text")
    let newCode = document.createElement("div")
    newCode.classList.add("inf")
    newCode.innerText = `Código: ${user.id}`
    let newName = document.createElement("div")
    newName.classList.add("inf")
    newName.innerText = user.name
    let newEmail = document.createElement("div")
    newEmail.classList.add("inf")
    newEmail.innerText = user.email
    let newAdm = document.createElement("div")
    newAdm.classList.add("inf")
    newAdm.innerText = `ADM: ${user.isAdmin}`
    let newBtn = document.createElement("button")
    newBtn.innerText = "Endereço"
    newBtn.classList.add("btn")
    newBtn.addEventListener("click", (event) => {
      showModalUserAddress(user.addressId)
    })

    newTxt.appendChild(newCode)
    newTxt.appendChild(newName)
    newTxt.appendChild(newEmail)
    newTxt.appendChild(newAdm)
    
    newImgTxt.appendChild(newTitle)
    newImgTxt.appendChild(newImg)
    newImgTxt.appendChild(newTxt)
    newImgTxt.appendChild(newBtn)
    newUser.appendChild(newImgTxt)
    displayUsers.appendChild(newUser)
  }
}

function getAllUsers(){
  axios.get(`http://localhost:3000/users/findall`)
  .then(res => {
    let users = res.data;
    usersMap(users)
    console.log(res);
  }).catch(err => {
    console.error(err);
  })
}

getAllUsers()
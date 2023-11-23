const btnHome = document.getElementById("home");
const btnAccount = document.getElementById("account");
const btnPayment = document.getElementById("payment");
let products = []
let total = 0


btnHome.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToHome()
})

btnAccount.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToAccount()
})

function redirectToHome(){
  let id = keepId()
  if(id>0){
    window.location.href = `/landingPage?id=${id}`
  }
}

function redirectToAccount(){
  let id = keepId()
  if(id>0){
    window.location.href = `/login-account?id=${id}`
  }
}

function redirectToPayment(){
  let id = keepId()
  if(id>0){
    window.location.href = `/login-payment?id=${id}`
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

//fazer logout sem que possa voltar
function cantGoBack(){
    window.location.replace("/");
}

//criar modal quando clica na imagem
divComImagemDeFundo = document.querySelectorAll(".img").forEach(function (event) {
    event.addEventListener("click", function () {
      //event.target pega o elemento que disparou o clique
      event.target = document.querySelector("#img");

      let image = document.createElement("img");
      //let backgroundImage = window.getComputedStyle(event).backgroundImage;
      let backgroundImage = event.style.backgroundImage;
      console.log(backgroundImage);
      let url = backgroundImage.match(/url\("?(.+?)"?\)/)[1];
      image.src = url;

      let modal = document.createElement("div");
      let modalContent = document.createElement("div");
      let buttonClose = document.createElement("div");

      document.body.appendChild(modal);
      modal.appendChild(modalContent);
      modalContent.appendChild(image);
      modalContent.appendChild(buttonClose);

      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.background = "rgba(0, 0, 0, 0.8)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "1";

      modalContent.style.position = "relative";
      modalContent.style.display = "flex";
      modalContent.style.justifyContent = "center";
      modalContent.style.alignItems = "center";

      image.style.position = "relative";

      //horizontal
      if (image.naturalWidth > image.naturalHeight) {
        if((image.naturalWidth/2) > image.naturalHeight){
          modalContent.style.width = "100%";
          image.style.width = "80%";
          buttonClose.style.right = "11%";
        }
        else if((image.naturalWidth/1.5) > image.naturalHeight){
          modalContent.style.width = "90%";
          image.style.width = "80%";
          buttonClose.style.right = "11%";
        }
        else{
          image.style.height = "100%";
          image.style.width = '90%'
          buttonClose.style.right = "6%";
        }
      }
      else if(image.naturalHeight == image.naturalWidth){
        image.style.height = "100%";
        image.style.width = '90%'
        buttonClose.style.right = "6%";
      }
      //vertical
      else if (image.naturalWidth < image.naturalHeight) {
        modalContent.style.height = "90%";
        modalContent.style.width = "max-content";
        image.style.height = "100%";
        buttonClose.style.right = "1%";
      }

      buttonClose.style.height = "3rem";
      buttonClose.style.width = "3rem";
      buttonClose.style.backgroundImage = "url(../../../assets/icons/icon-close-red.svg)";
      buttonClose.style.backgroundSize = "cover";
      buttonClose.style.position = "absolute";
      buttonClose.style.top = "10px";
      buttonClose.style.display = "flex";
      buttonClose.style.transition = ".3s";
      buttonClose.style.cursor = "pointer";

      buttonClose.addEventListener("mouseenter", () => {
        buttonClose.style.backgroundImage = "url(../../../assets/icons/icon-close-white.svg)";
      });
      buttonClose.addEventListener("mouseleave", () => {
        buttonClose.style.backgroundImage = "url(../../../assets/icons/icon-close-red.svg)";
      });

      buttonClose.addEventListener("click", () => {
        modal.style.display = "none";
      });
    });
});

//mostrar modal finalizar compra
let modalFinalizarCompra = document.getElementById('modal-finalizar-compra')
function showModalFinalizarCompra(){
  modalFinalizarCompra.style.display = 'flex'
}
//esconder 
function closeModalFinalizarCompra(){
  modalFinalizarCompra.style.display = 'none'
}

//modal endereço
let modalEndereco = document.getElementById('modal-user-address')
function showModalUserAddress(){
  modalEndereco.style.display = 'flex';
  modalFinalizarCompra.style.display = 'none';
}

function getAllProducts(){
  axios.get(`http://localhost:3000/products/getall`)
  .then(res => {
    products = res.data;
    documentMap(products)
    console.log(res);
  }).catch(err => {
    console.error(err);
  })
}

function documentMap(products){
  let displayProducts = document.getElementById("display-products")
  for(let product of products){
    let newProduct = document.createElement("div")
    newProduct.classList.add(product.orientation)
    let newImgTxt = document.createElement("div")
    newImgTxt.classList.add(`img-text-${product.orientation}`)
    let newImg = document.createElement("div")
    newImg.classList.add("img")
    newImg.style.backgroundImage = `url(${product.url})`
    let newTxtGeneral = document.createElement("div")
    newTxtGeneral.classList.add(`text-general-${product.orientation}`)
    let newTxt = document.createElement("div")
    newTxt.classList.add(`text-${product.orientation}`)
    let newTitle = document.createElement("div")
    newTitle.classList.add(`title-${product.orientation}`)
    newTitle.innerText = product.name
    let newCategory = document.createElement("div")
    newCategory.classList.add("inf")
    newCategory.innerText = product.category
    let newAuthor = document.createElement("div")
    newAuthor.classList.add("inf")
    newAuthor.innerText = `Artista: ${product.artist}`
    let newDate = document.createElement("div")
    newDate.classList.add("inf")
    newDate.innerText = `Data: ${product.createdAt.split("T")[0]}`
    let newTechnique = document.createElement("div")
    newTechnique.classList.add("inf")
    newTechnique.innerText = `Técnica: ${product.technique}`
    let newDimension = document.createElement("div")
    newDimension.classList.add("inf")
    newDimension.innerText = `Dimensão: ${product.dimension}`
    let newBtn = document.createElement("button")
    newBtn.innerText = "Adicionar ao carrinho"
    newBtn.classList.add(`${product.orientation}-cart-btn`)
    newBtn.addEventListener("click", (event) => {
      updateCart(product.id, "add")
    })
    newBtn.setAttribute("id",`add-btn-${product.id}`)
    let newBtnPrice = document.createElement("div")
    newBtnPrice.classList.add(`btn-price-${product.orientation}`)
    let newPrice = document.createElement("div")
    newPrice.classList.add(`${product.orientation}-price`)
    newPrice.innerText = `R$ ${product.price}`

    if(product.orientation == "vertical"){
      newTxt.appendChild(newTitle)
    }

    newTxt.appendChild(newCategory)
    newTxt.appendChild(newAuthor)
    newTxt.appendChild(newDate)
    newTxt.appendChild(newTechnique)
    newTxt.appendChild(newDimension)

    newTxtGeneral.appendChild(newTxt)
    if(product.orientation == "verical"){
      newTxtGeneral.appendChild(newBtn)
      newTxtGeneral.appendChild(newPrice)
    }else{
      newBtnPrice.appendChild(newBtn)
      newBtnPrice.appendChild(newPrice)
      newTxtGeneral.appendChild(newBtnPrice)
    }
  

    if(product.orientation == "vertical"){
      newImgTxt.appendChild(newImg)
      newImgTxt.appendChild(newTxtGeneral)
    }else{
      newImgTxt.appendChild(newTitle)
      newImgTxt.appendChild(newImg) 
      newImgTxt.appendChild(newTxtGeneral)
    }

    newProduct.appendChild(newImgTxt)
    displayProducts.appendChild(newProduct)
  }
}

function updateCart(id, kind){
  switch(kind){
    case "add":
      handleAddCart(id)
      break;
    case "rmv": 
      handleRmvCart(id)
      break;
  }
}

function handleAddCart(id){
  let product = products.find((item) => {
    return item.id == id
  })
  let boxProductCart = document.getElementById("box-product-cart")

  let newCartProduct = document.createElement("div")
  newCartProduct.classList.add("cart-product")
  newCartProduct.setAttribute("id", `cart-product-${product.id}`)
  let newCartPicture = document.createElement("div")
  newCartPicture.classList.add("cart-picture")
  newCartPicture.style.backgroundImage = `url(${product.url})`
  let newCartName = document.createElement("div")
  newCartName.classList.add("cart-name")
  newCartName.innerText = product.name
  let newCartPrice = document.createElement("div")
  newCartPrice.classList.add("cart-price")
  newCartPrice.innerText = `R$ ${product.price}`
  let newCartRmv = document.createElement("div")
  newCartRmv.classList.add("cart-remove")
  let newCartRmvBtn = document.createElement("btn")
  newCartRmvBtn.classList.add("remove-btn")
  newCartRmv.addEventListener("click", (event) => {
    updateCart(product.id, "rmv")
  })
  newCartRmv.appendChild(newCartRmvBtn)

  newCartProduct.appendChild(newCartPicture)
  newCartProduct.appendChild(newCartName)
  newCartProduct.appendChild(newCartPrice)
  newCartProduct.appendChild(newCartRmv)

  boxProductCart.appendChild(newCartProduct)
  
  let addBtn = document.getElementById(`add-btn-${product.id}`)
  addBtn.disabled = true

  total += product.price
  let totalVisual = document.getElementById("total")
  totalVisual.innerText = `R$ ${total.toFixed(2)}`
}

function handleRmvCart(id){
  let product = products.find((item) => {
    return item.id == id
  })

  let boxProductCart = document.getElementById("box-product-cart")
  let cartProduct = document.getElementById(`cart-product-${product.id}`)
  boxProductCart.removeChild(cartProduct)
  let addBtn = document.getElementById(`add-btn-${product.id}`)
  addBtn.disabled = false

  total -= product.price
  let totalVisual = document.getElementById("total")
  totalVisual.innerText = `R$ ${total.toFixed(2)}`
}

function finishPurchase(){
  let purchase = {
    total: total,
    userId: keepId(),
    liberated: false,
  }
  axios.post('http://localhost:3000/purchases', purchase)
    .then(res => {
      console.log(`Status: ${res.status}`);
      console.log('Body: ', res.data);
    }).catch(err => {
      console.error(err);
    });
}

getAllProducts()
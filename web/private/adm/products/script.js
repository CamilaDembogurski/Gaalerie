const addProduct = document.getElementById('add-product')
const addBtn = document.getElementById('add-btn')
const rmvBtn = document.getElementById('remove-btn')
const btnHome = document.getElementById("home");
const btnPurchase = document.getElementById("purchase");
const btnUser = document.getElementById("user");
const btnAccount = document.getElementById("account");
const btnEdit = document.getElementById("edit-btn");

const fieldName = document.getElementById("edit-name");
const fieldUrl = document.getElementById("edit-url");
const fieldArtist = document.getElementById("edit-artist");
const fieldTechnique = document.getElementById("edit-technique");
const fieldDimension = document.getElementById("edit-dimension");
const fieldCategory = document.getElementById("edit-category");
const fieldPrice = document.getElementById("edit-price");
let userId

btnHome.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToHome()
})

btnPurchase.addEventListener("click", (event) => {
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

function redirectToHome(){
  let id = keepId()
  if(id>0){
    window.location.href = `/adm?id=${id}`
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
//mostrar e esconder dropdown
arrow.addEventListener('click', () => {
  arrow.classList.toggle('clicked')
  drop.classList.toggle('drop-visible')
  //toggle: avalia a minha classlist: se no momento da chamada ela já tiver a classe informada na função toggle ele a remove, se não ele a adiciona
})

//mostrar modal add product
function showModalAddProduct() {
  let modalAddProduct = document.getElementById('modal-add-product')
  modalAddProduct.style.display = 'flex'
}
//esconder 
function closeModalAddProduct() {
  let modalAddProduct = document.getElementById('modal-add-product')
  modalAddProduct.style.display = 'none'
}

//mostrar modal remove product
function showModalRemoveProduct() {
  let modalRemoveProduct = document.getElementById('modal-remove-product')
  modalRemoveProduct.style.display = 'flex'
}
//esconder 
function closeModalRemoveProduct() {
  let modalRemoveProduct = document.getElementById('modal-remove-product')
  modalRemoveProduct.style.display = 'none'
}

//mostrar modal edit product
function showModalEditProduct(id) {
  let modalEditProduct = document.getElementById('modal-edit-product')
  modalEditProduct.style.display = 'flex'
  getProduct(id)
  
}
//esconder 
function closeModalEditProduct() {
  let modalEditProduct = document.getElementById('modal-edit-product')
  modalEditProduct.style.display = 'none'
}

//fazer logout sem que possa voltar
function cantGoBack() {
  window.location.replace("/");
}

addBtn.addEventListener('click', (event) => {
  event.preventDefault()
  let orientation = document.querySelector('input[name="img-orientatio"]:checked').value
  console.log(orientation)
  let name = document.getElementById('add-name').value
  let url = document.getElementById('add-url').value
  let artist = document.getElementById('add-artist').value
  let technique = document.getElementById('add-technique').value
  let dimension = document.getElementById('add-dimension').value
  let category = document.getElementById('add-category').value
  let price = document.getElementById('add-price').value

  createProduct(name, url, artist, technique, orientation, dimension, category, price)
})

//função para requisitar a criação do produto no express
function createProduct(name, url, artist, technique, orientation, dimension, category, price) {
  const product = {
    name: name,
    url: url,
    artist: artist,
    technique: technique,
    orientation: orientation,
    dimension: dimension,
    category: category,
    price: price,
  };

  console.log(product)
  axios.post('http://localhost:3000/admproducts', product)
    .then(res => {
      console.log(`Status: ${res.status}`);
      console.log('Body: ', res.data);
      closeModalAddProduct();
    }).catch(err => {
      console.error(err);
    });
}

//click event para chamar as funções de remover
rmvBtn.addEventListener('click', (event) => {
  event.preventDefault()
  let rmvId = document.getElementById('remove-code').value
  deleteProduct(rmvId)
})


//função para requisistar a exclusão de um produto no express
function deleteProduct(id){
  console.log(id)
  axios.delete(`http://localhost:3000/admproducts/${id}`)
  .then(res => {
    console.log(`Status: ${res.status}`);
    closeModalRemoveProduct();
  }).catch(err => {
    console.error(err);
  });
}

//função para puxar os produtos pelo ID
function getProduct(id){
  axios.get(`http://localhost:3000/products/${id}`).then((res) => {
  document.getElementById(res.data.orientation).checked = true
  fieldName.value = res.data.name
  fieldUrl.value = res.data.url
  fieldArtist.value = res.data.artist
  fieldTechnique.value = res.data.technique
  fieldDimension.value = res.data.dimension
  fieldCategory.value = res.data.category
  fieldPrice.value = res.data.price
  productId = id 
  })
}

//função para requisistar a edição
function doEdit(name, url, artist, technique, dimension, orientation, category, price, id) {
  const product = {
    name: name,
    url: url,
    artist: artist,
    technique: technique,
    orientation: orientation,
    dimension: dimension,
    category: category,
    price: price,
  };

  axios.put(`http://localhost:3000/products/${id}`, product)
    .then(res => {
      console.log(`Status: ${res.status}`);
      console.log('Body: ', res.data);
      closeModalEditProduct();
    }).catch(err => {
      console.error(err);
    });
}


//click event para chamar as funções de editar
btnEdit.addEventListener("click", (event) => {
  event.preventDefault()
  let orientation = document.querySelector('input[name="img-orientation"]:checked').value
  doEdit(fieldName.value, fieldUrl.value, fieldArtist.value, fieldTechnique.value, fieldDimension.value, orientation, fieldCategory.value, fieldPrice.value, productId)
  
})

function getAllProducts(){
  axios.get(`http://localhost:3000/products/getall`)
  .then(res => {
    let products = res.data;
    documentMap(products)
    console.log(res);
  }).catch(err => {
    console.error(err);
  })
}


//função para mapear os css's e colocar em ordem para a visualização no site
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
    let newCode = document.createElement("div")
    newCode.classList.add("inf")
    newCode.innerText = `Código: ${product.id}`
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
    let newAvailable = document.createElement("div")
    newAvailable.classList.add("inf")
    newAvailable.innerText = `Disponível: ${product.available}`
    let newBtn = document.createElement("button")
    newBtn.innerText = "Editar Informações"
    newBtn.classList.add(`${product.orientation}-cart-btn`)
    let newBtnPrice = document.createElement("div")
    newBtnPrice.classList.add(`btn-price-${product.orientation}`)
    newBtn.addEventListener("click", (event) => {
      showModalEditProduct(product.id)
    })
    let newPrice = document.createElement("div")
    newPrice.classList.add(`${product.orientation}-price`)
    newPrice.innerText = `R$ ${product.price}`

    if(product.orientation == "vertical"){
      newTxt.appendChild(newTitle)
    }

    newTxt.appendChild(newCode)
    newTxt.appendChild(newCategory)
    newTxt.appendChild(newAuthor)
    newTxt.appendChild(newDate)
    newTxt.appendChild(newTechnique)
    newTxt.appendChild(newDimension)
    newTxt.appendChild(newAvailable)

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
      if ((image.naturalWidth / 2) > image.naturalHeight) {
        modalContent.style.width = "100%";
        image.style.width = "80%";
        buttonClose.style.right = "11%";
      }
      else if ((image.naturalWidth / 1.5) > image.naturalHeight) {
        modalContent.style.width = "90%";
        image.style.width = "80%";
        buttonClose.style.right = "11%";
      }
      else {
        image.style.height = "100%";
        image.style.width = '90%'
        buttonClose.style.right = "6%";
      }
    }
    else if (image.naturalHeight == image.naturalWidth) {
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

getAllProducts()
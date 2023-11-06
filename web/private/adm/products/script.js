const addProduct = document.getElementById('add-product')
const addBtn = document.getElementById('add-btn')
const rmvBtn = document.getElementById('remove-btn')
const btnHome = document.getElementById("home");
const btnPurchase = document.getElementById("purchase");
const btnUser = document.getElementById("user");
const btnAccount = document.getElementById("account");

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
function showModalEditProduct() {
  let modalEditProduct = document.getElementById('modal-edit-product')
  modalEditProduct.style.display = 'flex'
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

rmvBtn.addEventListener('click', (event) => {
  event.preventDefault()
  let rmvId = document.getElementById('remove-code').value
  deleteProduct(rmvId)
})

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
const btnHome = document.getElementById("home");
const btnUser = document.getElementById("user");
const btnProducts = document.getElementById("product");
const btnAccount = document.getElementById("account");
let purchases = []
let available
let productsId

btnHome.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToHome()
})

btnUser.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToUser()
})

btnProducts.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToProduct()
})

btnAccount.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToAccount()
})


function redirectToHome() {
  let id = keepId()
  if (id > 0) {
    window.location.href = `/adm?id=${id}`
  }
}

function redirectToUser() {
  let id = keepId()
  if (id > 0) {
    window.location.href = `/adm-users?id=${id}`
  }
}

function redirectToProduct() {
  let id = keepId()
  if (id > 0) {
    window.location.href = `/adm-products?id=${id}`
  }
}

function redirectToAccount() {
  let id = keepId()
  if (id > 0) {
    window.location.href = `/adm-account?id=${id}`
  }
}

function keepId() {
  let id = 0
  let strId = window.location.search.split("=")
  if (strId.length > 1) {
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
let modalAddProduct = document.getElementById('modal-add-product')
function showModalAddProduct() {
  modalAddProduct.style.display = 'flex'
}
//esconder 
function closeModalAddProduct() {
  modalAddProduct.style.display = 'none'
}

//mostrar modal remove product
let modalRemoveProduct = document.getElementById('modal-remove-product')
function showModalRemoveProduct() {
  modalRemoveProduct.style.display = 'flex'
}
//esconder 
function closeModalRemoveProduct() {
  modalRemoveProduct.style.display = 'none'
}

//mostrar modal edit product
let modalEditProduct = document.getElementById('modal-edit-product')
function showModalEditProduct() {
  modalEditProduct.style.display = 'flex'
}
//esconder 
function closeModalEditProduct() {
  modalEditProduct.style.display = 'none'
}

//fazer logout sem que possa voltar
function cantGoBack() {
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

//função faz a requisição para pegar todas as compras
function getAllPurchases() {
  axios.get(`http://localhost:3000/purchases/getall`)
    .then(res => {
      purchases = res.data;
      purchaseMap(purchases)
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
}

function purchaseMap(purchases) {
  console.log(purchases)
  let displayPurchases = document.getElementById("display-purchases")
  for (let purchase of purchases) {
    let isValidPurchase = true
    let newPurchase = document.createElement("div")
    newPurchase.classList.add("purchase")
    newPurchase.setAttribute("id", `purchase-${purchase.id}`)
    let newCode = document.createElement("div")
    newCode.classList.add("Code")
    newCode.innerText = purchase.id
    let newUserName = document.createElement("div")
    newUserName.classList.add("username")
    newUserName.innerText = purchase.userId
    let newProductCode = document.createElement("div")
    newProductCode.classList.add("productCode")
    let newProductName = document.createElement("div")
    newProductName.classList.add("productName")
    for (let product of purchase.Products) {
      newProductCode.innerHTML += `${product.id} <br/>`
      newProductName.innerHTML += `${product.name} <br/>`
      if(!product.available){
        isValidPurchase = false
      }
    }
    let newTotal = document.createElement("div")
    newTotal.classList.add("total")
    newTotal.innerText = `R$ ${purchase.total}`
    let newDate = document.createElement("div")
    newDate.classList.add("inf")
    newDate.innerText = `${purchase.createdAt.split("T")[0]}`
    let newLiberated = document.createElement("div")
    newLiberated.classList.add("liberated")
    let newBtnLiberated = document.createElement("btn")
    newBtnLiberated.classList.add("btn")
    newBtnLiberated.setAttribute("id", `btn-liberate-${purchase.id}`)
    newBtnLiberated.innerText = "Liberar"
    newBtnLiberated.disabled = purchase.liberated
    newBtnLiberated.addEventListener("click", (event) => {
      console.log(purchase)
      doPurchase(purchase)
      Swal.fire({
        icon: 'success',
        iconColor: "#7a64c9",
        title: `A compra ${purchase.id} foi liberada com sucesso!`,
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
          document.location.reload()
      });

    })
    
    if (!purchase.liberated && isValidPurchase) {
      newLiberated.appendChild(newBtnLiberated)

    }
    newPurchase.appendChild(newCode)
    newPurchase.appendChild(newUserName)
    newPurchase.appendChild(newProductCode)
    newPurchase.appendChild(newProductName)
    newPurchase.appendChild(newTotal)
    newPurchase.appendChild(newDate)
    newPurchase.appendChild(newLiberated)

    displayPurchases.appendChild(newPurchase)
  }
}

function doPurchase(purchase) {

  axios.put(`http://localhost:3000/purchases-liberate/${purchase.id}`)
    .then(res => {
      console.log(`Status purchase: ${res.status}`);
      console.log('Body: ', res.data);
      for (let product of purchase.Products) {
        axios.put(`http://localhost:3000/products-liberate/${product.id}`)
          .then(res => {
            console.log(`Status product ${product.id}: ${res.status}`);
            console.log('Body: ', res.data);
          }).catch(err => {
            console.error(err);
          });
      }
    }).catch(err => {
      console.error(err);
    });


}

getAllPurchases()
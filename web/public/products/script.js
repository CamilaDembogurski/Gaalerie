//alert
function message() {
  Swal.fire({
    icon: "error",
    iconColor: "#7a64c9",
    title: "Oops...",
    html: "<b>Você precisa fazer login para desboquear o acesso!</b><br>",
    confirmButtonBackground: "#2d3272",
    footer: '<a href="./login">Fazer login</a>',
  });
}

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
    newBtn.innerText = "Adicionar ao carrinho"
    newBtn.classList.add(`${product.orientation}-cart-btn`)
    let newBtnPrice = document.createElement("div")
    newBtnPrice.classList.add(`btn-price-${product.orientation}`)
    newBtn.addEventListener("click", (event) => {
      message()
    })
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
      modal.style.boxSizing = 'border-box'
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
      buttonClose.style.backgroundImage = "url(../../assets/icons/icon-close-red.svg)";
      buttonClose.style.backgroundSize = "cover";
      buttonClose.style.position = "absolute";
      buttonClose.style.top = "10px";
      buttonClose.style.display = "flex";
      buttonClose.style.transition = ".3s";
      buttonClose.style.cursor = "pointer";

      buttonClose.addEventListener("mouseenter", () => {
        buttonClose.style.backgroundImage = "url(../../assets/icons/icon-close-white.svg)";
      });
      buttonClose.addEventListener("mouseleave", () => {
        buttonClose.style.backgroundImage = "url(../../assets/icons/icon-close-red.svg)";
      });

      buttonClose.addEventListener("click", () => {
        modal.style.display = "none";
      });
    });
});

getAllProducts()
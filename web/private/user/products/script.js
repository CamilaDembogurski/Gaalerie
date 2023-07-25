//mostrar e esconder dropdown
arrow.addEventListener('click', () => {
    arrow.classList.toggle('clicked')
    drop.classList.toggle('drop-visible')
    //toggle: avalia a minha classlist: se no momento da chamada ela já tiver a classe informada na função toggle ele a remove, se não ele a adiciona
})

//fazer logout sem que possa voltar
function cantGoBack(){
    window.location.replace("../../../public/landingPage/index.html");
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
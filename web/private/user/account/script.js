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

function eyeCLick(idInput, idIcon){
  let password = document.getElementById(idInput)
  let icon = document.getElementById(idIcon)

  function showPassword(){
      password.setAttribute('type', 'text')
      icon.classList.add('eye-hide')
  }
  function hidePassword(){
      password.setAttribute('type', 'password')
      icon.classList.remove('eye-hide')
  }

  let inputTypeIsPassword = password.type == 'password'

  if(inputTypeIsPassword){
      showPassword()
  }
  else{
      hidePassword()
  }
}

// alerta deletar conta
function deleteAlert(){
  Swal.fire({
    title: 'Você tem certeza?',
    text: "Não será possível reverter a exclusão da conta!",
    icon: 'warning',
    iconColor: '#FF0000',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#02c778',
    cancelButtonColor: '#FF0000',
    confirmButtonText: 'Sim, deletar conta!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deletada',
        text: "Sua conta foi excluída.",
        icon: 'success',
        iconColor: '#02c778',
        confirmButtonColor: '#2d3272',
        confirmButtonText: 'OK'
      })
    }
  })
}

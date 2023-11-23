const btnHome = document.getElementById("home");
const btnProducts = document.getElementById("product");
const fieldName = document.getElementById("edit-name");
const fieldUser = document.getElementById("edit-user");
const fieldEmail = document.getElementById("edit-email");
const fieldPass = document.getElementById("edit-password");
const fieldConfPass = document.getElementById("edit-confirm-password");
const btnEdit = document.getElementById("edit-button");
let pwd

async function handleUserConnection() {
  let id_arr = window.location.search.split("id=")
  if (id_arr.length > 0) {
    id = id_arr[1].split("&")[0]
    getUser(id)
  } else {
    cantGoBack()
  }
}

btnEdit.addEventListener("click", (event) => {
  event.preventDefault()
  let id_arr = window.location.search.split("id=")
  if (id_arr.length > 0) {
    id = id_arr[1].split("&")[0]
    checkEdit(id)
  } else {
    cantGoBack()
  }
})

btnHome.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToHome()
})

btnProducts.addEventListener("click", (event) => {
  event.preventDefault()
  redirectToProduct()
})

function redirectToHome() {
  let id = keepId()
  if (id > 0) {
    window.location.href = `/landingPage?id=${id}`
  }
}

function redirectToProduct() {
  let id = keepId()
  if (id > 0) {
    window.location.href = `/login-products?id=${id}`
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
//animação da imagem
function disableAnimation() {
  document.getElementById('principal').classList.add("disable-animation");
}

function setAnimation() {
  document.getElementById('principal').classList.add("animate");
}

//mostrar e esconder dropdown
arrow.addEventListener('click', () => {
  arrow.classList.toggle('clicked')
  drop.classList.toggle('drop-visible')
  //toggle: avalia a minha classlist: se no momento da chamada ela já tiver a classe informada na função toggle ele a remove, se não ele a adiciona
})

//fazer logout sem que possa voltar
function cantGoBack() {
  window.location.replace("/");
}

function eyeCLick(idInput, idIcon) {
  let password = document.getElementById(idInput)
  let icon = document.getElementById(idIcon)

  function showPassword() {
    password.setAttribute('type', 'text')
    icon.classList.add('eye-hide')
  }
  function hidePassword() {
    password.setAttribute('type', 'password')
    icon.classList.remove('eye-hide')
  }

  let inputTypeIsPassword = password.type == 'password'

  if (inputTypeIsPassword) {
    showPassword()
  }
  else {
    hidePassword()
  }
}

// alerta deletar conta
function deleteAlert() {
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
      let id_arr = window.location.search.split("id=")

      if (id_arr.length > 0) {
        id = id_arr[1].split("&")[0]
        deleteUser(id)
      }
    }
  })
}

function getUser(id) {
  axios.get(`http://localhost:3000/login-account/${id}`).then(res => {
    fieldName.value = res.data.name
    fieldUser.value = res.data.login
    fieldEmail.value = res.data.email
    pwd = res.data.password
  })
}

function editUser(id) {
  if (fieldPass.value == fieldConfPass) {
    if (fieldPass.value == pwd) {
      checkRegister(fieldName.value, fieldUser.value, fieldEmail.value, id)
    }
  }
}
//Faz a requisição para deletar o usuário
function deleteUser(id) {
  console.log(id)
  axios.delete(`http://localhost:3000/login-account/${id}`)
    .then(res => {
      console.log(`Status: ${res.status}`);
      Swal.fire({
        title: 'Deletada',
        text: "Sua conta foi excluída.",
        icon: 'success',
        iconColor: '#02c778',
        confirmButtonColor: '#2d3272',
        confirmButtonText: 'OK'
      }).then(() => {
        cantGoBack()
      })
    }).catch(err => {
      console.error(err);
      Swal.fire({
        title: 'Erro',
        text: "Ocorreu um erro, sua conta não foi deletada!",
        icon: 'warning',
        iconColor: '#FF0000',
        confirmButtonColor: '#FF0000',
        confirmButtonText: 'OK'
      })
    });
}
//Verifica as condições predefinidas do cadastro
function checkEdit(id) {
  let is_valid = true
  if (fieldName.value.length < 3) {
    is_valid = false
    callError("name")
  }
  let is_valid_email = checkEmail(fieldEmail.value)
  if (!is_valid_email) {
    is_valid = false
    callError("email")
  }
  if (is_valid) {
    doEdit(fieldName.value, fieldEmail.value, fieldPass.value, id)
  }
}

function checkUsername(username) {
  let pattern = /^[a-zA-Z0-9]{4,}$/
  return pattern.test(username)
}

function checkEmail(email) {
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
  return pattern.test(email)
}
//Seta o texto para avisar erro
function callError(field) {
  let error_field = `create-${field}-error`
  let message = "Campo inválido"
  let field_div = document.getElementById(error_field)
  field_div.innerText = message
  console.log(error_field)
}
//Limpa o erro
function clearErrorMessage(fields) {
  for (let field of fields) {
    let error_field = `create-${field}-error`
    let field_div = document.getElementById(error_field)
    field_div.innerText = ""
  }
}
//Edita o usuário no Sqlite por meio do axios
function doEdit(name, email, id) {
  const user = {
    name: name,
    email: email,
  };

  axios.put(`http://localhost:3000/users/${id}`, user)
    .then(res => {
      console.log(`Status: ${res.status}`);
      console.log('Body: ', res.data);
    }).catch(err => {
      console.error(err);
    });
}
handleUserConnection()
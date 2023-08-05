//mostrar e esconder login
const signUp = document.getElementById('sign-up')
const signIn = document.getElementById('sign-in')
const loginIn = document.getElementById('login-in')
const loginUp = document.getElementById('login-up')
const register = document.getElementById('register')

signUp.addEventListener('click', () => {
    //remover classe se ela existe
    loginIn.classList.remove('block')
    loginUp.classList.remove('none')

    //adicionar classes
    loginIn.classList.add('none')
    loginUp.classList.add('block')
})

signIn.addEventListener('click', () => {
    //remover classe se ela existe
    loginIn.classList.remove('none')
    loginUp.classList.remove('block')

    //adicionar classes
    loginIn.classList.add('block')
    loginUp.classList.add('none')
})

register.addEventListener('click', (event) => {
    let password_create = document.getElementById("create-password")
    let password_confirm = document.getElementById("create-confirm-password")
    let email = document.getElementById("create-email")
    let name = document.getElementById("create-name")
    let username = document.getElementById("create-user")
    event.preventDefault()
    let fields = ["name", "user", "email", "password", "password-confirm"]
    clearErrorMessage(fields)
    checkRegister(name, username, email, password_create, password_confirm)
})

function eyeClick(idInput, idIcon) {
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

function checkRegister(name, username, email, password_create, password_confirm) {
    let is_valid = true
    if (name.value.length < 3) {
        is_valid = false
        callError("name")
    }
    let is_valid_string = checkUsername(username.value)
    if (!is_valid_string) {
        is_valid = false
        callError("user")
    }
    let is_valid_email = checkEmail(email.value)
    if (!is_valid_email) {
        is_valid = false
        callError("email")
    }
    if (!password_create.value) {
        is_valid = false
        callError("password")
    }
    if (!password_confirm.value || password_create.value != password_confirm.value) {
        is_valid = false
        callError("password-confirm")
    }

    if (is_valid) {
        doRegister(name.value, username.value, email.value, password_confirm.value)
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

function callError(field) {
    let error_field = `create-${field}-error`
    let message = "Campo inválido"
    let field_div = document.getElementById(error_field)
    field_div.innerText = message
    console.log(error_field)
}

function clearErrorMessage(fields) {
    for (let field of fields) {
        let error_field = `create-${field}-error`
        let field_div = document.getElementById(error_field)
        field_div.innerText = ""
    }
}

function doRegister(name, username, email, password) {
    const user = {
        login: username,
        name: name,
        email: email,
        password: password,
    };

    axios.post('http://localhost:3000/users', user)
        .then(res => {
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);
        }).catch(err => {
            console.error(err);
        });
}
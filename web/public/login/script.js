//mostrar e esconder login
const signUp = document.getElementById('sign-up')
const signIn = document.getElementById('sign-in')
const loginIn = document.getElementById('login-in')
const loginUp = document.getElementById('login-up')

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


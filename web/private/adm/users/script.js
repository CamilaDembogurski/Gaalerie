//mostrar e esconder dropdown
arrow.addEventListener('click', () => {
    arrow.classList.toggle('clicked')
    drop.classList.toggle('drop-visible')
    //toggle: avalia a minha classlist: se no momento da chamada ela já tiver a classe informada na função toggle ele a remove, se não ele a adiciona
})

//mostrar modal add adm
let modalAddAdm = document.getElementById('modal-add-adm')
function showModalAddAdm(){
    modalAddAdm.style.display = 'flex'
}
//esconder 
function closeModalAddAdm(){
    modalAddAdm.style.display = 'none'
}

//mostrar modal remove adm
let modalRemoveAdm = document.getElementById('modal-remove-adm')
function showModalRemoveAdm(){
    modalRemoveAdm.style.display = 'flex'
}
//esconder 
function closeModalRemoveAdm(){
    modalRemoveAdm.style.display = 'none'
}

//mostrar modal de endereço
let modalUserAddress = document.getElementById('modal-user-address')
function showModalUserAddress(){
    modalUserAddress.style.display = 'flex'
}
//esconder 
function closeModalUserAddress(){
    modalUserAddress.style.display = 'none'
}
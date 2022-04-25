//variables
const $btnEnviar = document.querySelector('#enviar')
const $btnLimpiarForm = document.querySelector('#resetBtn')
const $formulario = document.querySelector('#enviar-mail')

const $email = document.querySelector('#email');
const $asunto = document.querySelector('#asunto');
const $mensaje = document.querySelector('#mensaje');

const validaEmail = /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i

eventListener()

function eventListener() {
    //Cuando la app inicie
    document.addEventListener("DomContentLoaded", iniciarApp)

    //Campos del formulario
    $email.addEventListener('blur', validarFormulario)
    $asunto.addEventListener('blur', validarFormulario)
    $mensaje.addEventListener('blur', validarFormulario)

    //limpiar formulario
    $btnLimpiarForm.addEventListener('click', resetearFormulario)
    //enviar formulario
    $formulario.addEventListener("submit", enviarFormulario)
}


//funciones
function iniciarApp(){
    $btnEnviar.disabled = true
    $btnEnviar.style.opacity = .95
}

//valida el formulario
function validarFormulario(e){

    if(e.target.value.length > 0 ) {
        //eliminar todos los erroes
        const error = document.querySelector("p.error")
        if(error) error.remove()

        e.target.classList.remove('border-2', 'border-red-700');
        e.target.classList.add('border-2', 'border-green-700');        
    } else {
        e.target.classList.remove('border-2', 'border-green-700');
        e.target.classList.add ('border-2', 'border-red-700');

        mostrarError('Todos los campos son obligatorios')
    }

    if(e.target.type === 'email'){
        const esEmailValido = validaEmail.test(e.target.value)

        if(esEmailValido){
            //eliminar todos los erroes
            const error = document.querySelector("p.error")
            if(error) error.remove()

            e.target.classList.remove('border-2', 'border-red-700');
            e.target.classList.add('border-2', 'border-green-700');   
        } else{
            e.target.classList.remove('border-2', 'border-green-700');
            e.target.classList.add ('border-2', 'border-red-700');

            mostrarError("El email no es valido")
        }
    }


    //habilitar boton enviar
    if( validaEmail.test($email.value) && $asunto.value !== "" && $mensaje !== ""){
        $btnEnviar.disabled = false
        $btnEnviar.style.opacity = 1
        $btnEnviar.style.cursor = "pointer"
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje
    mensajeError.classList.add ('border', 'border-red-700', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center','error')
    
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        $formulario.appendChild(mensajeError);
    }
}

//funcion que resetea el formulario
function resetearFormulario(e){
    $formulario.reset()
    e.preventDefault()

    iniciarApp()
}

//Simulacion deenvio de formulario
function enviarFormulario(e){
    e.preventDefault()

    //mostrar spinner
    const $spinner = document.querySelector("#spinner")
    $spinner.style.display = 'flex'

    //Despues de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout(() => {
        $spinner.style.display = 'none'
        
        //mensaje que dice que se creeo correctamente
        const parrafo = document.createElement("p")
        parrafo.textContent = 'El mensaje se envio correctamente'
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')


        $formulario.insertBefore(parrafo, $spinner)

        setTimeout(()=>{
            parrafo.remove() //elimina el mensaje de exito

            $formulario.reset()
            iniciarApp()
        }, 5000)
    }, 3000)
}


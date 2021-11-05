const $ = id => document.getElementById(id);//Captura el elemento por ID

let regExLetter = /^[A-Z]+$/i;
let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; //mayuscula, numero y 6 a 12 caracteres
let regExPass2 = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/; //mayuscula, numero, especial y 8 a 16 caracteres
let onlyNumbers = /^([0-9])*$/;//sólo números


//Confirma la conexión con el archivo JS
window.addEventListener('load', () => {
    console.log('users.js success')
});

//Validacion del nombre de usuario

$('name').addEventListener('blur', () => {

    switch (true) {
        case !$('name').value.trim():
            $('name-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> El nombre es obligatorio</span>"
            $('name').classList.add('is-invalid')

            break;
        case $('name').value.trim().length < 2 || $('name').value.trim().length > 50:
            $('name-error').innerHTML = "<span><i class='fas fa-info-circle'></i> Entre 2 y 50 caracteres</span>"
            $('name').classList.add('is-invalid')

            break;
        case !regExLetter.test($('name').value.trim()):
            $('name-error').innerHTML = "<span><i class='fas fa-info-circle'></i>Sólo caracteres alfabéticos</span>"
            $('name').classList.add('is-invalid')

            break;
        default:
            $('name').classList.remove('is-invalid')
            $('name').classList.add('is-valid')
            $('name-error').innerHTML = null
            break;
    }
})
$('name').addEventListener('keydown', () => {
    $('name').classList.remove('is-invalid')
    $('name-error').innerHTML = null
})

$('name').addEventListener('keypress', () => {
    if (!regExLetter.test($('name').value.trim())) {
        $('name-error').innerHTML = "<span><i class='fas fa-info-circle'></i>Sólo caracteres alfabéticos</span>"
        $('name').classList.add('is-invalid')
    }
})

$('name').addEventListener('focus', () => {
    $('name').classList.remove('is-invalid')
    $('name-error').innerHTML = null
})

//Validacion apellido del usuario

$('surname').addEventListener('blur', () => {

    switch (true) {
        case !$('surname').value.trim():
            $('surname-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> El Apellido es obligatorio</span>"
            $('surname').classList.add('is-invalid')

            break;
        case $('surname').value.trim().length < 2 || $('surname').value.trim().length > 50:
            $('surname-error').innerHTML = "<span><i class='fas fa-info-circle'></i> Entre 2 y 50 caracteres</span>"
            $('surname').classList.add('is-invalid')

            break;
        case !regExLetter.test($('surname').value.trim()):
            $('surname-error').innerHTML = "<span><i class='fas fa-info-circle'></i>Sólo caracteres alfabéticos</span>"
            $('surname').classList.add('is-invalid')

            break;
        default:
            $('surname').classList.remove('is-invalid')
            $('surname').classList.add('is-valid')
            $('surname-error').innerHTML = null
            break;
    }
})
$('surname').addEventListener('keydown', () => {
    $('surname').classList.remove('is-invalid')
    $('surname-error').innerHTML = null
})

$('surname').addEventListener('keypress', () => {
    if (!regExLetter.test($('surname').value.trim())) {
        $('surname-error').innerHTML = "<span><i class='fas fa-info-circle'></i>Sólo caracteres alfabéticos</span>"
        $('surname').classList.add('is-invalid')
    }
})

$('surname').addEventListener('focus', () => {
    $('surname').classList.remove('is-invalid')
    $('surname-error').innerHTML = null
})

//validación de la edad del usuario

$('age').addEventListener('focus', () => {
    $('age').classList.remove('is-invalid')
    $('age-error').innerHTML = null
})

$('age').addEventListener('blur', () => {

    switch (true) {
        case !$('age').value:
            $('age-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i>Debe indicar la edad</span>"
            $('age').classList.add('is-invalid')

            break;
        case $('age').value <= 17:
            $('age-error').innerText = "Debe ser mayor de 18 años"
            $('age').classList.add('is-invalid')

            break;
        default:
            $('age').classList.remove('is-invalid')
            $('age').classList.add('is-valid')
            $('age-error').innerText = null
            break;
    }
})
$('age').addEventListener('keydown', () => {
    $('age').classList.remove('is-invalid')
    $('age-error').innerText = null
})

$('age').addEventListener('keypress', () => {
    if (!onlyNumbers.test($('age').value)) {
        $('age-error').innerHTML = "<span><i class='fas fa-info-circle'></i>Sólo números</span>"
        $('age').classList.add('is-invalid')
    }
})

//Validacion ciudad

$('city').addEventListener('blur', () => {

    switch (true) {
        case !$('city').value.trim():
            $('city-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> La Ciudad es obligatoria</span>"
            $('city').classList.add('is-invalid')

            break;
        case $('city').value.trim().length < 2 || $('city').value.trim().length > 50:
            $('city-error').innerHTML = "<span><i class='fas fa-info-circle'></i> Entre 2 y 50 caracteres</span>"
            $('city').classList.add('is-invalid')

            break;
        default:
            $('city').classList.remove('is-invalid')
            $('city').classList.add('is-valid')
            $('city-error').innerHTML = null
            break;
    }
})
$('city').addEventListener('keydown', () => {
    $('city').classList.remove('is-invalid')
    $('city-error').innerHTML = null
})

$('city').addEventListener('focus', () => {
    $('city').classList.remove('is-invalid')
    $('city-error').innerHTML = null
})

//Validacion email

$('email').addEventListener('blur', () => {

    switch (true) {
        case !$('email').value:
            $('email-error').innerText = "El mail es obligatorio"
            $('email').classList.add('is-invalid')
            break;
        case !regExEmail.test($('email').value):
            $('email-error').innerText = "Tiene que ser un email válido"
            $('email').classList.add('is-invalid')
            break;
        default:
            $('email-error').innerText = null
            $('email').classList.remove('is-invalid')
            $('email').classList.add('is-valid')
            break;
    }
})

//Validacion Password

$('pass').addEventListener('blur', () => {
    if (!regExPass.test($('pass').value)) {
        $('pass-error').innerText = "La contraseña debe tener una mayúscula, un número y 8 caracteres"
        $('pass').classList.add('is-invalid')
    } else {
        $('pass-error').innerText = null
        $('pass').classList.remove('is-invalid')
        $('pass').classList.add('is-valid')
    }
})
$('pass').addEventListener('focus', () => {
    $('pass').classList.remove('is-invalid')

})

//Validacion confirmar contraseña

$('pass2').addEventListener('blur', () => {
    if ($('pass').value !== $('pass2').value) {
        $('pass2-error').innerText = "Las contraseñas no coinciden"
        $('pass2').classList.add('is-invalid')
    } else if ($('pass').value == "") {
        $('pass2-error').innerText = "Debes ingresar una contraseña"
        $('pass2').classList.add('is-invalid')
    } else {
        $('pass2-error').innerText = null
        $('pass2').classList.remove('is-invalid')
        $('pass2').classList.add('is-valid')
    }
})
$('pass2').addEventListener('focus', () => {
    $('pass2').classList.remove('is-invalid')

})

//Validacion terminos y condiciones

$('terms').addEventListener('click', () => {
    $('terms').classList.toggle('is-valid');
    $('terms').classList.remove('is-invalid');
    $('terms-error').innerHTML = null

})

//Validacion de avatar


//Validacón del formulario de usuario

$('form-users').addEventListener('submit', event => {
    event.preventDefault();

    let elementsForm = $('form-users').elements;
    //console.log(elementsForm);
    let error = false;

    for (let i = 0; i < elementsForm.length - 2; i++) {

        if (!elementsForm[i].value) {
            elementsForm[i].classList.add('is-invalid')
            $('error-empty').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i>Los campos señalados son obligatorios</span>";
            error = true
        }
    }

    for (let i = 0; i < elementsForm.length - 2; i++) {

        if (elementsForm[i].classList.contains('is-invalid')) {
            error = true
        }
    }

    if (!error) {
        $('form-users').submit()
    }
})





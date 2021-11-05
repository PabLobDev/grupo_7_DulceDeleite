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
Email.addEventListener('blur', () => {
        switch (true) {
            case !Email.value:
                errorEmail.innerHTML = "El email es obligatorio";
                Email.classList.add('is-invalid');
                break;
            case !regExEmail.test(Email.value):
                errorEmail.innerHTML = "Ingrese un email válido";
                Email.classList.add('is-invalid');
                break;
            default:
                errorEmail.innerHTML = "";
                Email.classList.remove('is-invalid');
                Email.classList.add('is-valid');
                break;
        }
    })

    Pass.addEventListener('blur', () => {
        switch (true) {
            case !Pass.value:
                errorPass.innerHTML = "La contraseña es obligatorio";
                Pass.classList.add('is-invalid');
                break;
            default:
                errorPass.innerHTML = "";
                Pass.classList.remove('is-invalid');
                Pass.classList.add('is-valid');
                break;
        }

    })

    formulario.addEventListener('submit', (e) => {
        let error = false;
        e.preventDefault();
        let elementsForm = formulario.elements;

        for (let index = 0; index < elementsForm.length - 2; index++) {
            if (!elementsForm[index].value) {
                elementsForm[index].classList.add('is-invalid')
                msgError.innerHTML = "Los campos señalados son obligatorios"
                error = true;
            }
        }
        if (!error) {
            formulario.submit()
        }
    })
})
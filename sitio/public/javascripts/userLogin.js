const $ = id => document.getElementById(id);//Captura el elemento por ID

//funcionamiento de la visualización de la contraseña(watch)
let btnWatch = document.getElementById('watch');
let inputPass = document.getElementById('pass');

btnWatch.addEventListener('click', () => {
    if (inputPass.getAttribute('type') == 'text') {
        inputPass.setAttribute('type', 'password')
    } else {
        inputPass.setAttribute('type', 'text')
    }
})
/*
   Otra forma de visualizar la contraseña, va en el script del ejs
   y se agreaga en el elemento el evento onclick="showPass()"

 function showPass(){
        let inputPass = document.getElementById("pass");
        if(inputPass.type == "password"){
            inputPass.type = "text";
        }else{
            inputPass.type = "password"
        } 
    }*/

window.addEventListener('load', () => {
    console.log('userLogin.js success');

    let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;//Que sea tipo email
   

    //Validación del email del usuario

    $('email').addEventListener('focus', () => {
        $('email').classList.remove('is-invalid')
        $('email').classList.remove('is-valid')
        $('email-error').innerHTML = null
    })
$('email').addEventListener('blur', () => {

    switch (true) {
        case !$('email').value:
            $('email-error').innerHTML = "<span><i class='fas fa-info-circle'></i> El email es obligatorio</span>"
            $('email').classList.add('is-invalid');
            break;
        case !regExEmail.test($('email').value):
            $('email-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> Tiene que ser un email válido</span>"
            $('email').classList.add('is-invalid')
            break;    
        default:
            $('email-error').innerHTML = null
            $('email').classList.remove('is-invalid')
            $('email').classList.add('is-valid')
            break;
    }
})

     //Validación del password del usuario

     $('pass').addEventListener('focus', () => {
        $('pass').classList.remove('is-invalid')
        $('pass').classList.remove('is-valid')
        $('pass-error').innerHTML = null
    })

     $('pass').addEventListener('blur', () => {
        switch (true) {
            case !$('pass').value:
                $('pass-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> La contraseña es obligatoria</span>";
                $('pass').classList.add('is-invalid');
                break;       
            default:
                $('pass-error').innerHTML = null;
                $('pass').classList.remove('is-invalid');
                
                break;
        }
        

    })
    

              //Validacón del formulario de logueo(ingreso) del usuario

              $('form-userLogin').addEventListener('submit', event => {
                event.preventDefault();
        
                let elementsForm = $('form-userLogin').elements;
                //console.log(elementsForm);
                let error = false;
        
                for (let i = 0; i < elementsForm.length - 2; i++) {
                    
                    if(!elementsForm[i].value){
                        elementsForm[i].classList.add('is-invalid')
                        $('error-empty').innerHTML ="<span><i class='fas fa-exclamation-triangle'></i>Los campos señalados son obligatorios</span>";
                        error = true
                    }
                }
        
                if(!error){
                    $('form-userLogin').submit()
                }
            })
})
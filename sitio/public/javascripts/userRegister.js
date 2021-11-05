const $ = id => document.getElementById(id);//Captura el elemento por ID

let regExLetter = /^[a-zA-Z\sñáéíóúü]*$/;//Solicita que sólo sean letras
let onlyNumbers = /^([0-9])*$/;//Solicita que sólo sean números
let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;//Que sea tipo email
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}$/; //solicita que la contraseña sea mayúscula, número y 8 caracteres


window.addEventListener('load', () => {
    console.log('userRegister.js success');//Confirma la conexión con el archivo JS

     //validación del nombre del usuario

    $('name').addEventListener('focus', () => {
        if($('name').value.trim() === ""){
            $('name-error').innerHTML = "<span><i class='fas fa-info-circle'></i>Sólo caracteres alfabéticos</span>"
        }

    })
    $('name').addEventListener('blur', () => {

        switch (true) {
            case !$('name').value.trim():
                $('name-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> El nombre es obligatorio</span>"
                $('name').classList.add('is-invalid')

                break;
            case $('name').value.trim().length < 2 || $('name').value.trim().length > 50 :
                $('name-error').innerHTML = "<span><i class='fas fa-info-circle'></i> Entre 2 y 50 caracteres</span>"
                $('name').classList.add('is-invalid')

                break;
            case !regExLetter.test($('name').value.trim()):
                $('name-error').innerText = "Sólo caracteres alfabéticos"
                $('name').classList.add('is-invalid')

                break;
            default:
                $('name').classList.remove('is-invalid')
                $('name').classList.add('is-valid')
                $('name-error').innerText = null
                break;
        }
    })
    $('name').addEventListener('keydown', () => {
        $('name').classList.remove('is-invalid')
        $('name-error').innerText = null
        })

        $('name').addEventListener('keypress', () => {
            if(!regExLetter.test($('name').value.trim())){
                $('name-error').innerHTML = "<span><i class='fas fa-info-circle'></i>Sólo caracteres alfabéticos</span>"
                $('name').classList.add('is-invalid')
            }
        })


         //validación del apellido del usuario

         $('surname').addEventListener('focus', () => {
            if($('surname').value.trim() === ""){
                $('surname-error').innerHTML = "<span><i class='fas fa-info-circle'></i>Sólo caracteres alfabéticos</span>"
            }
    
        })
        $('surname').addEventListener('blur', () => {
    
            switch (true) {
                case !$('surname').value.trim():
                    $('surname-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> El apellido es obligatorio</span>"
                    $('surname').classList.add('is-invalid')
    
                    break;
                case $('surname').value.trim().length < 2 || $('surname').value.trim().length > 50 :
                    $('surname-error').innerHTML = "<span><i class='fas fa-info-circle'></i> Entre 2 y 50 caracteres</span>"
                    $('surname').classList.add('is-invalid')
    
                    break;
                case !regExLetter.test($('surname').value.trim()):
                    $('surname-error').innerText = "Sólo caracteres alfabéticos"
                    $('surname').classList.add('is-invalid')
    
                    break;
                default:
                    $('surname').classList.remove('is-invalid')
                    $('surname').classList.add('is-valid')
                    $('surname-error').innerText = null
                    break;
            }
        })
        $('surname').addEventListener('keydown', () => {
            $('surname').classList.remove('is-invalid')
            $('surname-error').innerText = null
            })
    
            $('surname').addEventListener('keypress', () => {
                if(!regExLetter.test($('surname').value.trim())){
                    $('surname-error').innerHTML = "<span><i class='fas fa-info-circle'></i> Sólo caracteres alfabéticos</span>"
                    $('surname').classList.add('is-invalid')
                }
            })
    
             
            //Validación de la edad del usuario

        $('age').addEventListener('blur', () => {
    
            switch (true) {
                case !$('age').value:
                    $('age-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> Debe colocar su edad</span>"
                    $('age').classList.add('is-invalid')
    
                    break;
                case $('age').value.length > 2 :
                    $('age-error').innerText = "Debe tener menos de 3 cifras"
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
                if(!onlyNumbers.test($('age').value)){
                    $('age-error').innerHTML = "<span><i class='fas fa-info-circle'></i>Sólo números</span>"
                    $('age').classList.add('is-invalid')
                }
                })


          //validación de la ciudad del usuario

          $('city').addEventListener('focus', () => {
            if($('city').value.trim() === ""){
                $('city-error').innerHTML = "<span><i class='fas fa-info-circle'></i> Sólo caracteres alfabéticos</span>"
            }
    
        })
        $('city').addEventListener('blur', () => {
    
            switch (true) {
                case !$('city').value.trim():
                    $('city-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> La ciudad es obligatoria</span>"
                    $('city').classList.add('is-invalid')
    
                    break;
                case $('city').value.trim().length < 2 || $('city').value.trim().length > 100 :
                    $('city-error').innerHTML = "<span><i class='fas fa-info-circle'></i> Entre 2 y 100 caracteres</span>"
                    $('city').classList.add('is-invalid')
    
                    break;
                case !regExLetter.test($('city').value.trim()):
                    $('city-error').innerText = "Sólo caracteres alfabéticos"
                    $('city').classList.add('is-invalid')
    
                    break;
                default:
                    $('city').classList.remove('is-invalid')
                    $('city').classList.add('is-valid')
                    $('city-error').innerText = null
                    break;
            }
        })
        $('city').addEventListener('keydown', () => {
            $('city').classList.remove('is-invalid')
            $('city-error').innerText = null
            })
    
            $('city').addEventListener('keypress', () => {
                if(!regExLetter.test($('city').value.trim())){
                    $('city-error').innerHTML = "<span><i class='fas fa-info-circle'></i> Sólo caracteres alfabéticos</span>"
                    $('city').classList.add('is-invalid')
                }
            })

           //Validación del email del usuario

           $('email').addEventListener('focus',()=> {
            $('email').classList.remove('is-invalid')
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

             $('pass').addEventListener('focus',()=> {
                $('pass').classList.remove('is-invalid')
                $('pass-error').innerHTML = null
        
            })

             $('pass').addEventListener('blur', () => {
                switch (true) {
                    case !$('pass').value:
                        $('pass-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> La contraseña es obligatoria</span>";
                        $('pass').classList.add('is-invalid');
                        break;
                    case !regExPass.test($('pass').value):
                        $('pass-error').innerText = "Debe contener 8 caracteres, al menos una mayúscula, minúscula y número"
                        $('pass').classList.add('is-invalid');
                        break
                    default:
                        $('pass-error').innerText = null;
                        $('pass').classList.remove('is-invalid');
                        $('pass').classList.add('is-valid');
                        break;
                }
        
            })
              
            
            //Validación de confirmación de la contraseña del ususario

            $('pass2').addEventListener('focus',()=> {
                $('pass2').classList.remove('is-invalid')
                $('pass2-error').innerHTML = null
        
            })

            $('pass2').addEventListener('blur', () => {
                switch (true) {
                    case !$('pass2').value:
                        $('pass2-error').innerHTML ="Debe repetir su contraseña";
                        $('pass2').classList.add('is-invalid');
                        break;
                    case $('pass2').value != $('pass').value:
                        $('pass2-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> Las contraseñas no coinciden</span>"
                        $('pass2').classList.add('is-invalid');
                        break;
                    default:
                        $('pass2-error').innerHTML = null;
                        $('pass2').classList.remove('is-invalid');
                        $('pass2').classList.add('is-valid');
                        break;
                }
        
            })


           //Validacón del formulario de creación(registro) del usuario

            $('form-userRegister').addEventListener('submit', event => {
                event.preventDefault();
        
                let elementsForm = $('form-userRegister').elements;
                //console.log(elementsForm);
                let error = false;
        
                for (let i = 0; i < elementsForm.length - 2; i++) {
                    
                    if(!elementsForm[i].value){
                        elementsForm[i].classList.add('is-invalid')
                        $('error-empty').innerHTML ="<span><i class='fas fa-exclamation-triangle'></i>Los campos señalados son obligatorios</span>";
                        error = true
                    }
                }

                if(!$('terms').checked) {
            
                    $('terms').classList.add('is-invalid')
                    $('terms-error').innerText = "Debes aceptar los términos y condiciones";
                    error = true
                }
        
                for (let i = 0; i < elementsForm.length - 2; i++) {
                    
                    if(elementsForm[i].classList.contains('is-invalid')){
                        error = true
                        /* $('terms').classList.remove('is-valid') */
                    }
                }
        
                if(!error){
                    $('form-userRegister').submit()
                }
            })

            
})
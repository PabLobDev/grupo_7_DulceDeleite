
let regExLetter = /^[a-zA-Z\sñáéíóúü]*$/;//Solicita que sólo sean letras
let onlyNumbers = /^([0-9])*$/;//Solicita que sólo sean números
let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;//Que sea tipo email
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; //mayuscula, numero y 6 a 12 caracteres
let regExFile = /(.jpg|.jpeg|.png|.gif|.webp)$/i;//Acepta sólo las extensiones de imágenes detalladas

window.addEventListener('load', () => {
    console.log('profileUpdate.js success');//Confirma la conexión con el archivo JS


    //validación del nombre del usuario

    $('name').addEventListener('focus', () => {
        $('name').classList.remove('is-invalid')
        $('name').classList.remove('is-valid')
        $('name-error').innerHTML = null
    })

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

    $('name').addEventListener('keypress', () => {
        if (!regExLetter.test($('name').value.trim())) {
            $('name-error').innerHTML = "<span><i class='fas fa-info-circle'></i>Sólo caracteres alfabéticos</span>"
            $('name').classList.add('is-invalid')
        }
    })


    //validación del apellido del usuario

    $('surname').addEventListener('focus', () => {
        $('surname').classList.remove('is-invalid')
        $('surname').classList.remove('is-valid')
        $('surname-error').innerHTML = null
    })

    $('surname').addEventListener('blur', () => {

        switch (true) {
            case !$('surname').value.trim():
                $('surname-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> El apellido es obligatorio</span>"
                $('surname').classList.add('is-invalid')

                break;
            case $('surname').value.trim().length < 2 || $('surname').value.trim().length > 50:
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

    $('surname').addEventListener('keypress', () => {
        if (!regExLetter.test($('surname').value.trim())) {
            $('surname-error').innerHTML = "<span><i class='fas fa-info-circle'></i> Sólo caracteres alfabéticos</span>"
            $('surname').classList.add('is-invalid')
        }
    })


    //Validación de la edad del usuario

    $('age').addEventListener('focus', () => {
        $('age').classList.remove('is-invalid')
        $('age').classList.remove('is-valid')
        $('age-error').innerHTML = null
    })

    $('age').addEventListener('blur', () => {

        switch (true) {
            case !$('age').value:
                $('age-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> Debe colocar su edad</span>"
                $('age').classList.add('is-invalid')
                break;
            case $('age').value.trim() < 18:
                $('age-error').innerText = "Debe ser mayor de 18 años"
                $('age').classList.add('is-invalid')
                break;
            case $('age').value.length > 2:
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

    $('age').addEventListener('keypress', () => {
        if (!onlyNumbers.test($('age').value)) {
            $('age-error').innerHTML = "<span><i class='fas fa-info-circle'></i>Sólo números</span>"
            $('age').classList.add('is-invalid')
        }
    })


    //validación de la ciudad del usuario

    $('city').addEventListener('focus', () => {
        $('city').classList.remove('is-invalid')
        $('city').classList.remove('is-valid')
        $('city-error').innerHTML = null
    })

    $('city').addEventListener('blur', () => {

        switch (true) {
            case !$('city').value.trim():
                $('city-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> La ciudad es obligatoria</span>"
                $('city').classList.add('is-invalid')
                break;
            case $('city').value.trim().length < 2 || $('city').value.trim().length > 100:
                $('city-error').innerHTML = "<span><i class='fas fa-info-circle'></i> Entre 2 y 100 caracteres</span>"
                $('city').classList.add('is-invalid')
                break;
            default:
                $('city').classList.remove('is-invalid')
                $('city').classList.add('is-valid')
                $('city-error').innerText = null
                break;
        }
    })


    //Validación de la contraseña actual del usuario

    $('passOld').addEventListener('blur', () => {
        switch (true) {
            case !$('passOld').value:
                $('passOld-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> La contraseña es obligatoria</span>";
                $('passOld').classList.add('is-invalid');
                break;
            default:
                $('passOld-error').innerText = null;
                $('passOld').classList.remove('is-invalid');
                $('passOld').classList.add('is-valid');
                break;
        }

    })

    $('passOld').addEventListener('focus', () => {
        $('passOld').classList.remove('is-invalid')
        $('passOld').classList.remove('is-valid')
        $('passOld-error').innerHTML = null
    })


    //Validación de la contraseña nueva del usuario

    $('pass').addEventListener('focus', () => {
        $('pass').classList.remove('is-invalid')
        $('pass').classList.remove('is-valid')
        $('pass-error').innerHTML = null

    })

    $('pass').addEventListener('blur', () => {
        switch (true) {
            case !$('pass').value:
                $('pass').classList.remove('is-invalid')
                $('pass').classList.remove('is-valid')
                $('pass-error').innerHTML = null
                break;
            case !regExPass.test($('pass').value):
                $('pass-error').innerText = "Debe contener entre 6 y 12 caracteres, al menos una mayúscula, minúscula y número"
                $('pass').classList.add('is-invalid');
                break
            default:
                $('pass-error').innerText = null;
                $('pass').classList.remove('is-invalid');
                $('pass').classList.add('is-valid');
                break;
        }

    })


    //Validación de confirmación de la contraseña del usuario

    $('pass2').addEventListener('focus', () => {
        $('pass2').classList.remove('is-invalid')
        $('pass2').classList.remove('is-valid')
        $('pass2-error').innerHTML = null

    })

    $('pass2').addEventListener('blur', () => {
        switch (true) {
            case $('pass').value != '' && !$('pass2').value:
                $('pass2-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> Debe repetir su contraseña</span>";
                $('pass2').classList.add('is-invalid');
                break;
            case $('pass2').value != $('pass').value:
                $('pass2-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> Las contraseñas no coinciden</span>"
                $('pass2').classList.add('is-invalid');
                break;
            case !$('pass2').value:
                $('pass2').classList.remove('is-invalid')
                $('pass2').classList.remove('is-valid')
                $('pass2-error').innerHTML = null
                break;
            default:
                $('pass2-error').innerHTML = null;
                $('pass2').classList.remove('is-invalid');
                $('pass2').classList.add('is-valid');
                break;
        }

    })


    //Validación de agragado del avatar del usuario

    $('avatar').addEventListener('blur', (e) => {
        switch (true) {
            case !$('avatar').value:
                $('avatar').classList.remove('is-invalid')
                $('avatar').classList.remove('is-valid')
                $('avatar-error').innerHTML = null
                break;
            default:
                $('avatar').classList.remove('is-invalid');
                $('avatar').classList.add('is-valid');
                $('avatar-error').innerHTML = null;
                //Intento de vista previa, no funciona
                let reader = new FileReader();
                reader.readAsDataURL(e.target.file)

                reader.onload = () => {
                    preView.src = reader.result
                }
                break;
        }
    })


    //Validación del cambio de avatar del usuario

    $('avatar').addEventListener('change', (e) => {
        switch (true) {
            case !regExFile.exec($('avatar').value):
                $('avatar-error').innerText = "Sólo imágenes jpg, png, gif, webp"
                $('avatar').classList.add('is-invalid')

                break;
            default:
                $('avatar').classList.remove('is-invalid');
                $('avatar').classList.add('is-valid');
                $('avatar-error').innerHTML = null;
                //Intento de vista previa, no funciona
                let reader = new FileReader();
                reader.readAsDataURL(e.target.file)

                reader.onload = () => {
                    preView.src = reader.result
                }
                break;
        }
    })


    //Validacón del formulario de creación(registro) del usuario

    $('form-profileUpdate').addEventListener('submit', event => {
        event.preventDefault();

        let elementsForm = $('form-profileUpdate').elements;
        //console.log(elementsForm);

        let error = false;


        /*for (let i = 0; i < elementsForm.length - 2; i++) {
            
            if(!elementsForm[i].value){
                elementsForm[i].classList.add('is-invalid')
                $('error-empty').innerHTML ="<span><i class='fas fa-exclamation-triangle'></i>Los campos señalados son obligatorios</span>";
                error = true
            }
        }*/

        if (!$('passOld').value) {
            $('passOld').classList.add('is-invalid');
            error = true
        }

        if ($('pass').value && !$('pass2').value) {
            $('pass2').classList.add('is-invalid');
            error = true
        }

        for (let i = 0; i < elementsForm.length - 2; i++) {

            if (elementsForm[i].classList.contains('is-invalid')) {
                $('error-empty').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i>Los campos señalados son obligatorios</span>";
                error = true

            }
        }


        if (!error) {
            $('form-profileUpdate').submit()
        }
    })
})
window.addEventListener('load', () => {
    let forms = document.querySelectorAll('#eliminar-usuario');
    for (let i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', event => {
        event.preventDefault();
        Swal.fire({
          customClass: {
            confirmButton: 'swalBtnColor',
            cancelButton: 'swalBtnColor'
          },

          title: '¿Estas seguro que quieres eliminar esta cuenta?',
          text: "Esta accion es irreversible!",
          icon: 'warning',
          background: "#ffe4ec",
          showCancelButton: true,
          confirmButtonColor: '#f5deb3',
          cancelButtonColor: '#f5deb3',
          confirmButtonText: 'Eliminar',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },

        }).then((result) => {
          if (result.isConfirmed) {



            forms[i].submit();
          }

        })

      })

    }
  })
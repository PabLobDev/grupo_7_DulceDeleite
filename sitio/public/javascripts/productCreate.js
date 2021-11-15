const $ = id => document.getElementById(id);//Captura el elemto por ID

let regExLetter = /^[a-zA-Z\sñáéíóúü]*$/;//sólo letras
let onlyNumbers = /^([0-9])*$/;//sólo números
let regExFile = /(.jpg|.jpeg|.png|.webp)$/i;//Acepta sólo las extensiones de imágenes detalladas


window.addEventListener('load', () => {
    console.log('ProductsCreate.js success');//Confirma la conexión con el archivo JS

    //validación del nombre del producto


    $('name').addEventListener('blur', () => {

        switch (true) {
            case !$('name').value.trim():
                $('name-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> El nombre es obligatorio</span>"
                $('name').classList.add('is-invalid')

                break;
            case $('name').value.trim().length < 3 || $('name').value.trim().length > 30:
                $('name-error').innerHTML = "<span><i class='fas fa-info-circle'></i> Entre 3 y 30 caracteres</span>"
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
        $('name').classList.remove('is-valid')
        $('name-error').innerHTML = null
    })


    //validación del precio del producto

    $('price').addEventListener('focus', () => {
        $('price').classList.remove('is-invalid')
        $('price').classList.remove('is-valid')
        $('price-error').innerHTML = null
    })

    $('price').addEventListener('blur', () => {

        switch (true) {
            case !$('price').value:
                $('price-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> El precio es obligatorio</span>"
                $('price').classList.add('is-invalid')

                break;
            case $('price').value.length <= 2:
                $('price-error').innerText = "Precio de 3 cifras o más"
                $('price').classList.add('is-invalid')

                break;
            default:
                $('price').classList.remove('is-invalid')
                $('price').classList.add('is-valid')
                $('price-error').innerText = null
                break;
        }
    })
    $('price').addEventListener('keydown', () => {
        $('price').classList.remove('is-invalid')
        $('price-error').innerText = null
    })

    $('price').addEventListener('keypress', () => {
        if (!onlyNumbers.test($('price').value)) {
            $('price-error').innerHTML = "<span><i class='fas fa-info-circle'></i>Sólo números</span>"
            $('price').classList.add('is-invalid')
        }
    })



    //validación del descuento del producto

    $('discount').addEventListener('focus', () => {
        $('discount').classList.remove('is-invalid')
        $('discount').classList.remove('is-valid')
        $('discount-error').innerHTML = null
    })

    $('discount').addEventListener('blur', () => {

        switch (true) {
            case !$('discount').value:
                $('discount-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i>Debe poner un número</span>"
                $('discount').classList.add('is-invalid')

                break;
            case $('discount').value.length >= 3:
                $('discount-error').innerText = "Debe tener menos de 3 cifras"
                $('discount').classList.add('is-invalid')

                break;
            default:
                $('discount').classList.remove('is-invalid')
                $('discount').classList.add('is-valid')
                $('discount-error').innerText = null
                break;
        }
    })
    $('discount').addEventListener('keydown', () => {
        $('discount').classList.remove('is-invalid')
        $('discount-error').innerText = null
    })

    $('discount').addEventListener('keypress', () => {
        if (!onlyNumbers.test($('discount').value)) {
            $('discount-error').innerHTML = "<span><i class='fas fa-info-circle'></i>Sólo números</span>"
            $('discount').classList.add('is-invalid')
        }
    })


    //Validación de la categoría del producto

    $('category').addEventListener('blur', () => {

        switch (true) {
            case !$('category').value:
                $('category-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i>Debe elegir una categoría</span>"
                $('category').classList.add('is-invalid')

                break;
            default:
                $('category').classList.remove('is-invalid')
                $('category').classList.add('is-valid')
                $('category-error').innerText = null
                break;
        }
    })
    $('category').addEventListener('focus', () => {
        $('category').classList.remove('is-invalid')
        $('category').classList.remove('is-valid')
        $('category-error').innerHTML = null
    })

    // Vista previa de la imágen del producto

    document.getElementById('image').onchange = function (e) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            let preview = document.getElementById('preview');
            image = document.createElement('img');
            image.src = reader.result;
            image.width = 150
            image.height = 110
            image.style.objectFit = "cover"
            image.style.borderRadius = "5px"
            preview.innerHTML = null;
            preview.append(image);
        }
    }


    //Validación de la imágen del producto

    $('image').addEventListener('blur', (e) => {
        switch (true) {
            case !regExFile.exec($('image').value):
                $('image-error').innerText = "Sólo imágenes jpg, jpeg, png, webp"
                $('image').classList.add('is-invalid')
                image.src = null
                break;
            case !$('image').value:
                $('image-error').innerText = "La imágen es obligatoria"
                $('image').classList.add('is-invalid')
                break;
            default:
                $('image').classList.remove('is-invalid');
                $('image').classList.add('is-valid');
                $('image-error').innerText = null;
                break;
        }
    })

    //Intento validar el cambio de imágen al editar el producto
    $('image').addEventListener('change', (e) => {
        switch (true) {
            case !regExExtensions.exec($('image').value):
                $('image-error').innerText = "Sólo imágenes jpg, png, webp"
                $('image').classList.add('is-invalid')
                preView.src = null
                break;

            default:
                $('image').classList.remove('is-invalid');
                $('image').classList.add('is-valid');
                $('image-error').innerHTML = null;
                break;

        }
    })


    //Validación de la descripción del producto

    $('description').addEventListener('blur', () => {
        switch (true) {
            case !$('description').value.trim():
                $('description-error').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i>La descripción es obligatoria</span>"
                $('description').classList.add('is-invalid')
                break;

            case $('description').value.trim().length <= 20:
                $('description-error').innerText = "La descripción debe tener más de 20 caracteres"
                $('description').classList.add('is-invalid')

                break;
            default:
                $('description-error').innerHTML = null
                $('description').classList.remove('is-invalid')
                $('description').classList.add('is-valid')
                break;
        }
    })

    $('description').addEventListener('focus', () => {
        $('description').classList.remove('is-invalid')
        $('description').classList.remove('is-valid')
        $('description-error').innerHTML = null
    })


    //Validacón del formulario de creación del producto

    $('form-product').addEventListener('submit', event => {
        event.preventDefault();

        let elementsForm = $('form-product').elements;
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
            $('form-product').submit()
        }
    })


})
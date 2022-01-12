const tarjeta = document.getElementById('tarjeta');
const abrirForm = document.getElementById('btn-abrir-form');
const formulario = document.getElementById('form-tarjeta');
const numTarjeta = document.querySelector('#tarjeta .numero');
const nomTarjeta = document.querySelector('#tarjeta .nombre');
const logoMarca = document.getElementById('logo-marca');
const firma = document.querySelector('#tarjeta .firma p');
const mesVence = document.querySelector('#tarjeta .mes');
const yearVence = document.querySelector('#tarjeta .year');
const ccv = document.querySelector('#tarjeta .ccv');


//Voltea la tarjeta para mostrar el frente
const mostrarFrente = () => {
    if (tarjeta.classList.contains('active')) {
        tarjeta.classList.remove('active')
    }
}
  
//Rotación de la tarjeta
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});

//Boton de abrir el formulario
abrirForm.addEventListener('click', () => {
    abrirForm.classList.toggle('active');
    formulario.classList.toggle('active');
});

//select del mes dinámico
for (let i = 1; i <= 12; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}

//select del año dinámico
const yearActual = new Date().getFullYear();

for (let i = yearActual; i <= yearActual + 8 ; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

// Input número de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
   let valorInput = e.target.value;

   formulario.inputNumero.value = valorInput
   //Elimina los espacios
   .replace(/\s/g, '')
   //Elimina las letras
   .replace(/\D/g, '')
   //Agrega espacio cada 4 números
   .replace(/([0-9]{4})/g, '$1 ')
   //Elimina el ultimo espacio
   .trim();

   numTarjeta.textContent = valorInput;

   if (valorInput == '') {
       numTarjeta.textContent = '#### #### #### ####';

       logoMarca.innerHTML = '';
   }

   if (valorInput[0] == 4) {
       logoMarca.innerHTML = '';
       const imagen = document.createElement('img');
       imagen.src = '../../../images/buy/visa.png';
       logoMarca.appendChild(imagen);

   } else if (valorInput[0] == 5) {
    logoMarca.innerHTML = '';
    const imagen = document.createElement('img');
    imagen.src = '../../../images/buy/mastercard.png';
    logoMarca.appendChild(imagen);
} 

//Voltea la tarjeta para que el usuario vea el frente
mostrarFrente();

});

//Input nombre en la tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nomTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if (valorInput == '') {
        nomTarjeta.textContent = 'Jhon Doe'
    }

    mostrarFrente();
});

//Select del mes
formulario.selectMes.addEventListener('change', (e) => {
   mesVence.textContent = e.target.value;
   mostrarFrente();
});

//Select del año
formulario.selectYear.addEventListener('change', (e) => {
    yearVence.textContent = e.target.value.slice(2);
    mostrarFrente();
 });
 
 //Input del código de seguridad CCV
 formulario.inputCCV.addEventListener('keyup', () => {
     if (!tarjeta.classList.contains('active')) {
         tarjeta.classList.toggle('active');
     }

     formulario.inputCCV.value = formulario.inputCCV.value
     //Elimina los espacios
     .replace(/\s/g, '')
     //Elimina las letras
     .replace(/\D/g, '');

     ccv.textContent = formulario.inputCCV.value;
 });

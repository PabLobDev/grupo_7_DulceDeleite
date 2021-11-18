console.log('Product_user.js success');

let spanCantidad = $('span-cantidad');
let listCart = $('list-cart');
let cartShop = $('cart-shop');
let spanTotal = $('total');
let cartHead = $('cart-head');
let cartFooter = $('cart-footer');
let cartEmpty = $('cart-empty');
let btnCartEmpty = $('btn-cart-empty');
let btnNextBuy = $('btn-next-buy');

const urlBase = window.origin +'/'; //url base del sitio

const showQuantity = listCart => {
    var cantidad = 0;
    var total = 0;
    

    if(listCart){
        listCart.forEach(item => {
            cantidad += item.cantidad;
            total += item.subtotal
        });
    }
    
    spanCantidad.innerHTML = cantidad
    spanTotal.innerHTML = `<span>$</span> <span class="float-end">${total}</span>`
    

    if(cantidad === 0){
        cartHead.style.display = "none"
        cartFooter.style.display = "none"
        cartEmpty.style.display = "block"
        btnCartEmpty.classList.add('disabled')
        btnNextBuy.classList.add('disabled')
    }else{
        cartHead.style.display = "table-header-group"
        cartFooter.style.display = "table-footer-group"
        cartEmpty.style.display = "none"
        btnCartEmpty.classList.remove('disabled')
        btnNextBuy.classList.remove('disabled')
    }
}

const tableLoad = cart => {
    cartShop.innerHTML = null
    cart.forEach(product => {
        let item = `
            <td class="col-2">
            <img  width="90" height="65" src="/images/productos/${product.image}" id="imgProduct"> 
            </td>
            <td class="text-center col-3 align-middle p-1">
            <a class="text-danger h6" onClick="removeItem(event,${product.id})"><i class="fas fa-minus-circle"></i></a>
            <span class="h5">${product.cantidad}<span>
            <a class="text-success h6" onClick="addItem(event,${product.id})"><i class="fas fa-plus-circle"></i></a>
            </td>
            <td class="align-middle p-1">
            ${product.name}
            </td>
           
            <td class="align-middle p-1">
            <span>$</span><span class="float-end">${product.price}</span>
            </td>
            <td class="align-middle">
            <span>$</span><span class="float-end ">${product.subtotal}</span>
            </td>
            `;
        cartShop.innerHTML += item
    });
    return false
}

const getCarrito = async () => {
    try {
        let response = await fetch('/api/product_user/show');
        let result = await response.json();
        if(result.data.length > 0) {
            tableLoad(result.data)
            showQuantity(result.data)

        }else{
            showQuantity(result.data)

        }

    } catch (error) {
        console.log(error)
    }
}

const addItem = async (e,id) => {
    e.preventDefault()

    try {
        let response = await fetch('/api/product_user/add/' + id)
        let result = await response.json()
        tableLoad(result.data);
        showQuantity(result.data);

    } catch (error) {
        console.log(error)
    }
}

const removeItem = async (e,id) => {
    e.preventDefault()
    try {
        let response = await fetch(urlBase + 'api/product_user/remove/' + id)
        let result = await response.json()
        showQuantity(result.data);
        tableLoad(result.data);

    } catch (error) {
        console.log(error)
    }
}

const emptyCart = async () => {
    try {
        let response = await fetch(urlBase + 'api/product_user/empty')
        let result = await response.json()
        cartShop.innerHTML = null
        showQuantity(result.data);
        
    } catch (error) {
        console.log(error)
    }
}

btnCartEmpty.addEventListener('click',() => emptyCart())


getCarrito()
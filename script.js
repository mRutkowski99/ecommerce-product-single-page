const nav = document.querySelector('.nav')
const carousel = document.querySelector('#carousel')
const carouselImages = carousel.querySelectorAll('img')
const gallery = document.querySelector('#gallery')
const galleryImages = gallery.querySelectorAll('img')
const addToCartQuantity = document.querySelector('.add-to-cart__quantity')
const inCartInfo = document.querySelector('#in-cart')
const cart = document.querySelector('.cart')
const cartContent = document.querySelector('.cart__content')
const popup = document.querySelector('.popup')
const popupCarousel = document.querySelector('#popup-carousel')
const popupGallery = document.querySelector('#popup-gallery')
const popupGalleryImages = popupGallery.querySelectorAll('.popup__gallery-img')

//Buttons
const btnHamburger = document.querySelector('#btn-hamburger')
const btnClose = document.querySelector('#btn-close')
const btnLeft = document.querySelector('#btn-left')
const btnRigth = document.querySelector('#btn-rigth')
const btnPlus = document.querySelector('#btn-plus')
const btnMinus = document.querySelector('#btn-minus')
const btnAddToCart = document.querySelector('#btn-add-to-cart')
const btnCart = document.querySelector('#btn-cart')
const btnPopupClose = document.querySelector('#btn-popup-close')
const btnPopupLeft = document.querySelector('#btn-popup-left')
const btnPopupRigth = document.querySelector('#btn-popup-rigth')

let imgIndex = 0
let popupIndex = 0
let addToCart = 0
let inCart = 0

//Mobile menu
btnHamburger.addEventListener('click', () => {
    nav.classList.add('show-nav')
})

btnClose.addEventListener('click', () => {
    nav.classList.remove('show-nav')
})

//Images navigation
const moveCarosuel = function() {
    const imgWidth = carouselImages[0].getBoundingClientRect().width
    carousel.style.transform = `translateX(${-imgIndex * imgWidth}px)`
}

const changeActiveImg = function() {
    galleryImages.forEach((img, index) => {
        img.classList.remove('small-img--active')
        if (index == imgIndex) img.classList.add('small-img--active')
    })
}

btnLeft.addEventListener('click', () => {
    imgIndex > 0 ? imgIndex-- : imgIndex = carouselImages.length - 1
    moveCarosuel()
})

btnRigth.addEventListener('click', () => {
    imgIndex < carouselImages.length - 1 ? imgIndex++ : imgIndex = 0
    moveCarosuel()
})

gallery.addEventListener('click', e => {
    if (!e.target.classList.contains('small-img')) return 
    imgIndex = +e.target.dataset.index
    moveCarosuel()
    changeActiveImg()
})

//Adding items to cart
const updateAddToCartQuantity = function() {
    addToCartQuantity.innerText = addToCart
}

const updateCartContent = function() {
    if (inCart === 0) {
        cartContent.innerHTML = '<span class="cart__empty">Your cart is empty</span>'
    } else {
        cartContent.innerHTML = `
        <div class="cart__product">
          <img src="images/image-product-1-thumbnail.jpg" alt="Cart product img" class="cart__product-img">
          <p class="cart__product-name">Autumn Limited Edition Sneakers</p>
          <p class="cart__product-price">$125.00 x ${inCart} <span class="cart__product-price-bold">$${(inCart * 125).toFixed(2)}</span></p>
          <div class="cart__product-bin">
            <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use id="btn-bin" fill="currentColor" fill-rule="nonzero" xlink:href="#a"/></svg>
          </div>
        </div>

        <button class="btn">Checkout</button>`
    }
}

btnMinus.addEventListener('click', () => {
    addToCart === 0 ? addToCart = 0 : addToCart--
    updateAddToCartQuantity()
})

btnPlus.addEventListener('click', () => {
    addToCart++
    updateAddToCartQuantity()
})

btnAddToCart.addEventListener('click', () => {
    if (addToCart === 0) return

    inCart += addToCart
    inCartInfo.innerText = inCart
    inCartInfo.classList.remove('hidden')

    addToCart = 0
    updateAddToCartQuantity()
    updateCartContent()
})

//Cart 
btnCart.addEventListener('click', () => {
    cart.classList.toggle('hidden')
    updateCartContent()
})

cartContent.addEventListener('click', e => {
    if (!e.target.id === 'btn-bin') return

    inCart = 0
    inCartInfo.classList.add('hidden')
    cart.classList.add('hidden')
})

//Popup 
const movePopupCarosuel = function() {
    const imgWidth = popupCarousel.querySelector('img').getBoundingClientRect().width
    popupCarousel.style.transform = `translateX(${-popupIndex * imgWidth}px)`
}

const changePopupActiveImg = function() {
    popupGalleryImages.forEach((el, index) => {
        el.classList.remove('popup__gallery-img--active')
        if (index == popupIndex) el.classList.add('popup__gallery-img--active')
    })
}

carousel.addEventListener('click', () => {
    if (window.innerWidth < 850) return 
    popup.classList.remove('hidden')
    popupIndex = imgIndex
    movePopupCarosuel()
})

btnPopupClose.addEventListener('click', e => {
    popup.classList.add('hidden')
})

btnPopupLeft.addEventListener('click', () => {
    popupIndex > 0 ? popupIndex-- : popupIndex = popupGalleryImages.length - 1
    movePopupCarosuel()
    changePopupActiveImg()
})

btnPopupRigth.addEventListener('click', () => {
    popupIndex < popupGalleryImages.length - 1 ? popupIndex++ : popupIndex = 0
    movePopupCarosuel()
    changePopupActiveImg()
})

popupGallery.addEventListener('click', e => {
    if (!e.target.classList.contains('popup__gallery-img')) return 
    popupIndex = +e.target.dataset.index
    movePopupCarosuel()
    changePopupActiveImg()
})
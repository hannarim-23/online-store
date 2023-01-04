import { createHtmlElement } from "./createlement";
import { cartObject } from "../pages/cart";
import { renderCart } from "../pages/cart";
import { logoBank } from "./logoBank";

let inputNumberCart = createHtmlElement('input', 'modal-input-number-cart modal-input', 'modal-input-number-cart');
const inputValid = createHtmlElement('input', 'modal-input-valid modal-input', 'modal-input-valid');
const inputCcv = createHtmlElement('input', 'modal-input-ccv modal-input', 'modal-input-ccv');

export function showModal(){
    const overlay = document.querySelector('.overlay');
    if(overlay){
    overlay.classList.add("active");
    const modalWindow = createHtmlElement('div', 'modal-window');
    const personaDatalWindow = createHtmlElement('div', 'personal-data-window');
    const personalDataText = createHtmlElement('h2', 'modal-personal-data-text', '', 'Personal details');
    const inputName = createHtmlElement('input', 'modal-input-name modal-input', 'modal-input-name');
    const nameTextError = createHtmlElement('div', 'name-text-error', '', "Enter at least two words beginning with a capital letter, each at least 3 characters long");
    const inputPhone = createHtmlElement('input', 'modal-input-phone modal-input', 'modal-input-phone');
    const phoneTextError = createHtmlElement('div', 'phone-text-error', '', "Must begin with '+', contain only digits, and be no shorter than 9 digits");
    const inputAddress = createHtmlElement('input', 'modal-input-address modal-input', 'modal-input-adress');
    const addressTextError = createHtmlElement('div', 'address-text-error', '', "Enter at least three words, each at least 5 characters long");
    const inputEmail = createHtmlElement('input', 'modal-input-email modal-input', 'modal-input-email');
    const emailTextError = createHtmlElement('div', 'email-text-error', '', "Enter a valid email");
    const cardInfoContainer = createHtmlElement('div', 'modal-cart-info-container');
    const cardInfoTitle = createHtmlElement('h2', 'modal-cart-info-title', '', 'Credit card details');
    const cardContainer = createHtmlElement('div', 'modal-card-container');
    const imgNumberCardBox = createHtmlElement('div', 'modal-img-number-card-box');
    const imgCardContainer = createHtmlElement('div', 'img-card-container');
    const imgBankCard = createHtmlElement('img', 'modal-img-bank-card');
    if(imgBankCard instanceof HTMLImageElement) imgBankCard.src = logoBank[0];
    const cardNumberContainer = createHtmlElement('div', 'modal-card-number-container');
    const cardNumberTextError = createHtmlElement('div', 'card-number-text-error', '', "Enter 16 digits");
    const validCcvContainer = createHtmlElement('div', 'modal-valid-ccv-container');
    const validContainer = createHtmlElement('div', 'modal-valid-container');
    const validText = createHtmlElement('p', 'modal-valid-text','', 'Valid:');
    const validTextError = createHtmlElement('div', 'valid-text-error', '', "The month cannot be more than 12");
    const ccvText = createHtmlElement('p', 'modal-ccv-text','','CCV:');
    const ccvContainer = createHtmlElement('div', 'ccv-container');
    const ccvTextError = createHtmlElement('div', 'ccv-text-error', '', "Enter 3 digits");
    const btnConfirm = createHtmlElement('button', 'modal-btn-confirm', '', 'Confirm');

    if(inputName instanceof HTMLInputElement){
        inputName.type = 'text';
        inputName.placeholder = 'first and last name';
        inputName.setAttribute("required", "");
        inputName.pattern = "^([A-ZА-Я]{1}[a-zа-яA-ZА-Я\-?]{2,}) ([A-ZА-Я]{1}[a-zа-яA-ZА-Я\-?]{2,}) ?([A-ZА-Я]{1}[a-zа-яA-ZА-Я\-?]{2,})?";
        btnConfirm.addEventListener('click', ()=>{
            if(!inputName.checkValidity() && !nameTextError.classList.contains('active')){
                nameTextError.classList.add('active');
            }else if(inputName.checkValidity() && nameTextError.classList.contains('active')){
                nameTextError.classList.remove('active');
            }
    })
    }
    if(inputPhone instanceof HTMLInputElement){
        inputPhone.type = 'text';
        inputPhone.setAttribute("required", "");
        inputPhone.placeholder = 'phone number start with +';
        inputPhone.pattern = "^[+][0-9]{9,}$";
        btnConfirm.addEventListener('click', ()=>{
            if(!inputPhone.checkValidity() && !phoneTextError.classList.contains('active')){
                phoneTextError.classList.add('active');
            }else if(inputPhone.checkValidity() && phoneTextError.classList.contains('active')){
                phoneTextError.classList.remove('active');
            }
    })
    }
    if(inputAddress instanceof HTMLInputElement){
        inputAddress.type = 'text';
        inputAddress.setAttribute("required", "");
        inputAddress.placeholder = 'three-word delivery address';
        inputAddress.pattern = "^([0-9a-zа-яA-ZА-Я\,]{5,}) ([0-9a-zа-яA-ZА-Я\,]{5,}) ([0-9a-zа-яA-ZА-Я\-]{5,})$";
        btnConfirm.addEventListener('click', ()=>{
            if(!inputAddress.checkValidity() && !addressTextError.classList.contains('active')){
                addressTextError.classList.add('active');
            }else if(inputAddress.checkValidity() && addressTextError.classList.contains('active')){
                addressTextError.classList.remove('active');
            }
    })
    }
    if(inputEmail instanceof HTMLInputElement){
        inputEmail.type = 'email';
        inputEmail.placeholder = 'e-mail';
        inputEmail.setAttribute("required", "");
        btnConfirm.addEventListener('click', ()=>{
            if(!inputEmail.checkValidity() && !emailTextError.classList.contains('active')){
                emailTextError.classList.add('active');
            }else if(inputEmail.checkValidity() && emailTextError.classList.contains('active')){
                emailTextError.classList.remove('active');
            }
    })
    }
    if(inputNumberCart instanceof HTMLInputElement){
        inputNumberCart.type = 'text';
        inputNumberCart.placeholder = 'card number';
        inputNumberCart.setAttribute("required", "");
        inputNumberCart.pattern = '^([0-9]{4}) ([0-9]{4}) ([0-9]{4}) ([0-9]{4})$';
        inputNumberCart.addEventListener('input', formatNum, false);
        inputNumberCart.addEventListener('input', (event)=>{
            if(event.target && event.target instanceof HTMLInputElement && imgBankCard instanceof HTMLImageElement){
                let key: number = Number(event.target.value[0]);
                if(isNaN(key)){
                    imgBankCard.src = logoBank[0];
                }else{
                    imgBankCard.src = logoBank[key];
                }
            }
        })
        btnConfirm.addEventListener('click', ()=>{
            if(inputNumberCart instanceof HTMLInputElement){
                if(!inputNumberCart.checkValidity() && !cardNumberTextError.classList.contains('active')){
                    cardNumberTextError.classList.add('active');
                }else if(inputNumberCart.checkValidity() && cardNumberTextError.classList.contains('active')){
                    cardNumberTextError.classList.remove('active');
                }
            }
        })
    }
    if(inputValid instanceof HTMLInputElement){
        inputValid.type = 'text';
        inputValid.placeholder = 'valid thru';
        inputValid.setAttribute("required", "");
        inputValid.pattern = '^(0[1-9]|1[0-2])\/?([0-9]{2})$';
        inputValid.addEventListener('input', formatDate, false);
        btnConfirm.addEventListener('click', ()=>{
                if(!inputValid.checkValidity() && !validTextError.classList.contains('active')){
                    validTextError.classList.add('active');
                }else if(inputValid.checkValidity() && validTextError.classList.contains('active')){
                    validTextError.classList.remove('active');
                }
        })
    }
    if(inputCcv instanceof HTMLInputElement){
        inputCcv.type = 'text';
        inputCcv.placeholder = 'CCV';
        inputCcv.setAttribute("required", "");
        inputCcv.pattern = '^([0-9]{3})$';
        inputCcv.addEventListener('input', formatCcv, false);
        btnConfirm.addEventListener('click', ()=>{
            if(!inputCcv.checkValidity() && !ccvTextError.classList.contains('active')){
                ccvTextError.classList.add('active');
            }else if(inputCcv.checkValidity() && ccvTextError.classList.contains('active')){
                ccvTextError.classList.remove('active');
            }
    })
    }
    
    modalWindow.append(personaDatalWindow);
    personaDatalWindow.append(personalDataText);
    personalDataText.after(inputName);
    inputName.after(nameTextError);
    nameTextError.after(inputPhone);
    inputPhone.after(phoneTextError);
    phoneTextError.after(inputAddress);
    inputAddress.after(addressTextError);
    addressTextError.after(inputEmail);
    inputEmail.after(emailTextError);
    personaDatalWindow.after(cardInfoContainer);
    cardInfoContainer.append(cardInfoTitle);
    cardInfoTitle.after(cardContainer);
    cardContainer.append(imgNumberCardBox);
    imgNumberCardBox.append(imgCardContainer);
    imgCardContainer.append(imgBankCard);
    imgCardContainer.after(cardNumberContainer);
    cardNumberContainer.append(inputNumberCart);
    inputNumberCart.after(cardNumberTextError);
    imgNumberCardBox.after(validCcvContainer);
    validCcvContainer.append(validText);
    validText.after(validContainer);
    validContainer.append(inputValid);
    inputValid.after(validTextError);
    validContainer.after(ccvText);
    ccvText.after(ccvContainer);
    ccvContainer.append(inputCcv);
    inputCcv.after(ccvTextError);
    modalWindow.append(btnConfirm);
    const inputs = modalWindow.querySelectorAll('.modal-input');
    btnConfirm.addEventListener('click', (event)=>{
        const textEr = document.createElement('p');
        let numberOfInvalid = 0;
        inputs.forEach(el =>{
            if(el instanceof HTMLInputElement){
      if(!el.checkValidity()){
        numberOfInvalid +=1;
      }else{
          numberOfInvalid = numberOfInvalid;
      }
        }})
        if(numberOfInvalid === 0){
            modalWindow.innerHTML = '';
            const redirectText = createHtmlElement('div', 'redirect-text', '', 'Thank you for the order. You will now be redirected to the store')
            modalWindow.append(redirectText);
            setTimeout(function(){
                window.location.href = '/';
                localStorage.clear();
                Object.keys(cartObject).forEach(key => delete cartObject[key]);
                renderCart(cartObject);
                modalWindow.innerHTML = '';
              }, 3 * 1000);
        }
    }
    )
        return overlay.append(modalWindow);
    }
}

function formatNum(event: Event) {
    let valueInput;
    if(event.target && event.target instanceof HTMLInputElement){
        valueInput = event.target.value;
    }
   if(valueInput !== undefined){
     let val = valueInput.replace(/[^\d]/g, '').substring(0,16);
     val = val !== '' ? val.match(/.{1,4}/g)!.join(` `) : ``;
     if(inputNumberCart instanceof HTMLInputElement){
        inputNumberCart.value = val;
    }
}
}
function formatDate(event: Event) {
    let valueInput;
    if(event.target && event.target instanceof HTMLInputElement){
        valueInput = event.target.value;
    }
   if(valueInput !== undefined){
     let val = valueInput.replace(/[^\d]/g, '').substring(0,4);
     val = val !== '' ? val.match(/.{1,2}/g)!.join(`/`) : ``;
     if(inputValid instanceof HTMLInputElement){
        inputValid.value = val;
    }
}
}
function formatCcv(event: Event) {
    let valueInput;
    if(event.target && event.target instanceof HTMLInputElement){
        valueInput = event.target.value;
    }
   if(valueInput !== undefined){
     let val = valueInput.replace(/[^\d]/g, '').substring(0,3);
     val = val !== '' ? val.match(/.{1,3}/g)!.join(``) : ``;
     if(inputCcv instanceof HTMLInputElement){
        inputCcv.value = val;
    }
}
}


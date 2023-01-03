import { createHtmlElement } from "./createlement";

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
    const inputPhone = createHtmlElement('input', 'modal-input-phone modal-input', 'modal-input-phone');
    const inputAddress = createHtmlElement('input', 'modal-input-address modal-input', 'modal-input-adress');
    const inputEmail = createHtmlElement('input', 'modal-input-email modal-input', 'modal-input-email');
    const cardInfoContainer = createHtmlElement('div', 'modal-cart-info-container');
    const cardInfoTitle = createHtmlElement('h2', 'modal-cart-info-title', '', 'Credit card details');
    const cardContainer = createHtmlElement('div', 'modal-card-container');
    const imgNumberCardBox = createHtmlElement('div', 'modal-img-number-card-box');
    const imgBankCard = createHtmlElement('img', 'modal-img-bank-card');
    const validCcvContainer = createHtmlElement('div', 'modal-valid-ccv-container');
    const validText = createHtmlElement('p', 'modal-valid-text','', 'Valid:');
    const ccvText = createHtmlElement('p', 'modal-ccv-text','','CCV:');
    const textErrorBox = createHtmlElement('div', 'modal-text-error-box');
    const btnConfirm = createHtmlElement('button', 'modal-btn-confirm', '', 'Confirm');

    if(inputName instanceof HTMLInputElement){
        inputName.type = 'text';
        inputName.placeholder = 'first and last name';
        inputName.setAttribute("required", "");
        inputName.pattern = "^([A-ZА-Я]{1}[a-zа-яA-ZА-Я\-?]{2,}) ([A-ZА-Я]{1}[a-zа-яA-ZА-Я\-?]{2,}) ?([A-ZА-Я]{1}[a-zа-яA-ZА-Я\-?]{2,})?";
        
    }
    if(inputPhone instanceof HTMLInputElement){
        inputPhone.type = 'text';
        inputPhone.setAttribute("required", "");
        inputPhone.placeholder = 'phone number start with +';
        inputPhone.pattern = "^[+][0-9]{9,}$";
    }
    if(inputAddress instanceof HTMLInputElement){
        inputAddress.type = 'text';
        inputAddress.setAttribute("required", "");
        inputAddress.placeholder = 'three-word delivery address';
        inputAddress.pattern = "^([0-9a-zа-яA-ZА-Я\,]{5,}) ([0-9a-zа-яA-ZА-Я\,]{5,}) ([0-9a-zа-яA-ZА-Я\-]{5,})$";
    }
    if(inputEmail instanceof HTMLInputElement){
        inputEmail.type = 'email';
        inputEmail.placeholder = 'e-mail';
        inputEmail.setAttribute("required", "");
    }
    if(inputNumberCart instanceof HTMLInputElement){
        inputNumberCart.type = 'text';
        inputNumberCart.placeholder = 'card number';
        inputNumberCart.setAttribute("required", "");
        inputNumberCart.pattern = '^([0-9]{4}) ([0-9]{4}) ([0-9]{4}) ([0-9]{4})$';
        inputNumberCart.addEventListener('input', formatNum, false);
    }
    if(inputValid instanceof HTMLInputElement){
        inputValid.type = 'text';
        inputValid.placeholder = 'valid thru';
        inputValid.setAttribute("required", "");
        inputValid.pattern = '^(0[1-9]|1[0-2])\/?([0-9]{2})$';
        inputValid.addEventListener('input', formatDate, false);
    }
    if(inputCcv instanceof HTMLInputElement){
        inputCcv.type = 'text';
        inputCcv.placeholder = 'CCV';
        inputCcv.setAttribute("required", "");
        inputCcv.pattern = '^([0-9]{3})$';
        inputCcv.addEventListener('input', formatCcv, false);
    }
    
    modalWindow.append(personaDatalWindow);
    personaDatalWindow.append(personalDataText);
    personalDataText.after(inputName);
    inputName.after(inputPhone);
    inputPhone.after(inputAddress);
    inputAddress.after(inputEmail);
    personaDatalWindow.after(cardInfoContainer);
    cardInfoContainer.append(cardInfoTitle);
    cardInfoTitle.after(cardContainer);
    cardContainer.append(imgNumberCardBox);
    imgNumberCardBox.append(imgBankCard);
    imgBankCard.after(inputNumberCart);
    imgNumberCardBox.after(validCcvContainer);
    validCcvContainer.append(validText);
    validText.after(inputValid);
    inputValid.after(ccvText);
    ccvText.after(inputCcv);
    modalWindow.append(textErrorBox);
    modalWindow.append(btnConfirm);
    const inputs = modalWindow.querySelectorAll('.modal-input');
    console.log(inputs);
    btnConfirm.addEventListener('click', (event)=>{
        const textEr = document.createElement('p');
        console.log(inputs);
        inputs.forEach(el =>{
            if(el instanceof HTMLInputElement){
      if(!el.checkValidity()){
          console.log(el.checkValidity());
          //alert(`${el}`);
          textEr.textContent = 'Username should only contain lowercase letters. e.g. john';
              el.after(textEr);
              
        
      }else{
          //textEr.innerHTML = '';
      }
        }})
       
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
     console.log(val);
     val = val !== '' ? val.match(/.{1,3}/g)!.join(``) : ``;
     console.log(val);
     if(inputCcv instanceof HTMLInputElement){
        inputCcv.value = val;
    }
}
}


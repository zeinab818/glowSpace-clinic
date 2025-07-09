let nameInput = document.getElementById('name');
let number = document.getElementById('number');
let mail = document.getElementById('mail');
let service = document.getElementById('services-select');
let message = document.getElementById('message');
let closeBtn = document.getElementById('closeBtn');
let sucess = document.getElementById('sucess');
let incorrect=document.getElementById("incorrect");

const storageKey = 'BookDataStorage';

let bookList = [];

if (localStorage.getItem(storageKey)) {
    bookList = JSON.parse(localStorage.getItem(storageKey));
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('sp'));
        this.classList.add('sp');
    });
});

closeBtn.addEventListener('click', function () {
    sucess.classList.replace('d-flex', 'd-none');
});
setTimeout(() => {
    sucess.classList.replace('d-flex', 'd-none');
}, 5000); // بعد 5 ثواني


function validation(element) {
    let vailInputs = {
        name:/^[\u0600-\u06FFa-zA-Z\s]{3,50}$/,
        mail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        number: /^(002|\+2)?01[0125][0-9]{8}$/,
    };

    let val = vailInputs[element.id].test(element.value.trim());

    if (val) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        document.getElementById(element.id + 'Error').classList.add('d-none');
        return true;
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        document.getElementById(element.id + 'Error').classList.remove('d-none');
        return false;
    }
}


function book() {
    if (
        validation(nameInput) &&
        validation(number) &&
        validation(mail) &&
        service.value !== ''
    ) {
        let bookData = {
            name: nameInput.value,
            number: number.value,
            mail: mail.value,
            service: service.value,
            message: message.value,
        };

        bookList.push(bookData);
        localStorage.setItem(storageKey, JSON.stringify(bookList));
        sucess.classList.replace('d-none', 'd-flex');
        incorrect.classList.add("d-none");
        saveToSuggestions('previousNumbersList', number.value);


        cleardata();
    } else {
        console.log("Validation failed!");
        incorrect.classList.remove("d-none");

    }
}

function cleardata() {
    nameInput.value = '';
    mail.value = '';
    number.value = '';
    service.value = '';
    message.value = '';
}


function saveToSuggestions(key, value) {
    let list = JSON.parse(localStorage.getItem(key)) || [];
    if (!list.includes(value)) {
        list.push(value);
        localStorage.setItem(key, JSON.stringify(list));
    }
}


function populateSuggestions() {
    let list = JSON.parse(localStorage.getItem('previousNumbersList')) || [];
    let dataList = document.getElementById('previousNumbers');
    dataList.innerHTML = ''; 

    list.forEach(num => {
        let option = document.createElement('option');
        option.value = num;
        dataList.appendChild(option);
    });
}
populateSuggestions(); // call on load


//declarations used in functions and event listeners
    
        //field constaing basic info
const fieldSet = document.querySelector('.basic-info');
    const name = document.getElementById('name');
        let userValue = name.value;
        name.focus(); //places focus on first input field
    const emailLabel = fieldSet.querySelectorAll('label')[1];
        const email= document.getElementById('email');
            const emailValue = email.value;
    const jobRole = document.getElementById('title');
    const otherJobRole = document.getElementById('other-job-role');
    

    //T-shirt Input
const design = document.getElementById('design');
const color = document.getElementById('color');
    

    //activities Field Set
const activities = document.getElementById('activities');
    const activitiesBox = document.getElementById('activities-box'); //activities div
        const activity = activitiesBox.querySelectorAll('input'); //all activity inputs in one object
    
        //payment info
const payment = document.getElementById('payment'); //what user will pay with input
const paypal = document.getElementById('paypal'); //paypal div option shown only if paypal option is selected
const bitcoin = document.getElementById('bitcoin'); //bitcoin div option shown only if paypal option is selected
const creditCard = document.getElementById('credit-card'); //credit card payment div for credit card information\
    const expDate = document.getElementById('exp-month'); // expiration date input
    const yearBox = document.querySelector('.year-box'); //expiration year box
        year = document.getElementById('exp-year'); // expiration year input 
    const creditCardBox = document.querySelector('.credit-card-box'); //credit card box div excluding the exp date and year 
    const zipBox = document.querySelector('.zip-box');  //zipcode box
        const zip = document.getElementById('zip'); //zipcode input
    const cvvBox = document.querySelector('.cvv-box');  //cvv box
    const cvv = document.getElementById('cvv'); //cvv input
    
    
let actualCost = 0; //tracks the cost of total activities selcted

    //registar button located at the bottom of the page
const submit = document.getElementsByTagName('button')[0];

    

color.disabled = true;



    //hides the otherJobRole display when the browser is first loaded
otherJobRole.style.display = 'none';
   
    //shows the job Role if its selected in the job role input field
jobRole.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
    otherJobRole.style.display = 'block';
} else {
    otherJobRole.style.display = 'none';
}
});

// function that hides the divs of none selected payments
const hideDiv = function(element) {
    element.style.display = 'none';
};
    const showDiv = function(element) {
    element.style.display = 'block'
}
    // start program with showing the Credit card input's as default
showDiv(creditCard);
showDiv(yearBox);
showDiv(creditCardBox);
showDiv(zipBox);
showDiv(cvvBox);
hideDiv(paypal);
hideDiv(bitcoin);



//validates the username input to true or false
function userValidation(text) {
    const regex = /\w+/;
    return regex.test(text);
}

//validates the email input to true or false
function emailValidation(text) {
    const regex = /^\w+@\w+(.com|.net|.org)$/;
    return regex.test(text);
}

//validates that the user has selected atleast one activity
function acitvitiesValidation(text) {
    let activitiesChecked = ['false'];
     for (let i = 0; i < text.length; i++) {
             let isChecked = text[i].checked;
             if (isChecked) {
                 activitiesChecked.push('true');
             } 
     }
     return activitiesChecked.includes('true');
 }
 const CNumber = creditCardBox.querySelector('input');

 //validates credit Information
 function creditCardNumberValidation () {
    const regexCN = /^\d{13,16}$/;
    
    
    return regexCN.test(CNumber.value);
 }
 
 function zipCodeValidation () {
    const regexZip = /^\d{5}$/;
    return regexZip.test(zip.value);
 }

function cvvValidation () {
    const regexCVV = /^\d{3}$/;
    return regexCVV.test(cvv.value);
}

function yearExpValidation () {
    if (year.value === 'Select Year') {
    return false;
    } else {
        return true;
    }
}

function dateExpValidation () {
    if (expDate.value === 'Select Date') {
        return false
    } else {
        return true;
    } 
}
 function creditCardValidation() {
    allCorrectInputs = [];
    const regexCN = /^\d{13,16}$/;
    
    
    if (regexCN.test(CNumber.value)) {
        allCorrectInputs.push('true');
    } else {
        allCorrectInputs.push('false');
    }

    const regexZip = /^\d{5}$/;
    if (regexZip.test(zip.value)) {
        allCorrectInputs.push('true');
    } else {
        allCorrectInputs.push('false');
    }

    const regexCVV = /^\d{3}$/;
    if (regexCVV.test(cvv.value)) {
        allCorrectInputs.push('true');
    } else {
        allCorrectInputs.push('false');
    }

     if (year.value === 'Select Year') {
        allCorrectInputs.push('false');
    } else {
        allCorrectInputs.push('true');
    }  

    if (expDate.value === 'Select Date') {
        allCorrectInputs.push('false');
    } else {
        allCorrectInputs.push('true');
    } 
    

    return allCorrectInputs.includes('false');
 }

 
// listens to what design is selected and shows that designs colors in the select color field
design.addEventListener('change', (e) => {
    if (e.target.value === 'js puns') {
        color.disabled = false;
        const options = color.querySelectorAll('option');
        for (let i = 0; i < options.length; i++) {
            if (options[i].dataset.theme === 'heart js') {
                options[i].style.display = 'none'; 
            } else {
                options[i].style.display = 'block';
            }
        }
       
    } else {
        color.disabled = false;
        const options = color.querySelectorAll('option');
        for (let i = 0; i < options.length; i++) {
            if (options[i].dataset.theme === 'js puns') {
                options[i].style.display = 'none';
            } else {
                options[i].style.display = 'block';
            }
        }

    }
});

//makes focus and blur events more clear
for (let i = 0; i < activity.length; i++) {
    activity[i].addEventListener('focus', (e) => {
        if (e.target.type == 'checkbox') {
            e.target.parentNode.className = 'focus';
        }
    })

    activity[i].addEventListener('blur', (e) => {
        if (e.target.type == 'checkbox') {
            e.target.parentNode.className = 'blur';
        }
    } )
}

//checks and unchecks boxes as well as keeps track of the total cost
activities.addEventListener('change', (e) => {
    if (e.target.type == 'checkbox') {
        const cost =  e.target.dataset.cost 
        const totalCost = document.getElementById('activities-cost');
        let isChecked = e.target.checked;
       
        e.target.addEventListener('change', () => {
            if (isChecked =='false') {
                isChecked = true;
            } else {
                isChecked = false;
            }
        });

        if (isChecked) {
            actualCost += +cost;
            totalCost.textContent = `Total: $${actualCost}`;
        } else {
            actualCost -= +cost;
            totalCost.textContent = `Total: $${actualCost}`;
        }
    }
});





//shows certain payment options based on select payment method input
payment.addEventListener('change', () => {
    if (payment.value == 'credit-card') {
        const creditCard = document.getElementById('credit-card');
        const yearBox = document.querySelector('.year-box');
        const creditCardBox = document.querySelector('.credit-card-box');
        const zipBox = document.querySelector('.zip-box');
        const cvvBox = document.querySelector('.cvv-box');

        showDiv(creditCard);
        showDiv(yearBox);
        showDiv(creditCardBox);
        showDiv(zipBox);
        showDiv(cvvBox);
        hideDiv(paypal);
        hideDiv(bitcoin);
    } else if (payment.value == 'paypal') {
        showDiv(paypal);
        hideDiv(bitcoin);
        hideDiv(creditCard);
        hideDiv(yearBox);
        hideDiv(creditCardBox);
        hideDiv(zipBox);
        hideDiv(cvvBox);

    } else {
        showDiv(bitcoin);
        hideDiv(paypal);
        hideDiv(creditCard);
        hideDiv(yearBox);
        hideDiv(creditCardBox);
        hideDiv(zipBox);
        hideDiv(cvvBox);
    }
});


//name user Error
const nameLabel = document.querySelector('label');
const nameUserError  = document.createElement('label');
nameUserError.textContent = '* Please add your name.';
nameUserError.style.color = 'red';
nameLabel.insertBefore(nameUserError, name);
nameUserError.style.display = 'none';

 //email user Error
const userError = document.createElement('label');
userError.textContent = '* Please enter a valid email address.';
userError.style.color = 'red';
emailLabel.insertBefore(userError, email);
userError.style.display = 'none';

//activity User Error
const activityUserError = document.createElement('span');
activityUserError.textContent = '* Please select a minumum of one activity';
activityUserError.style.color = 'red';
const legend = activities.querySelector('legend');
legend.appendChild(activityUserError);
activityUserError.style.display = 'none';

//Payment User Error
const creditUserError = document.createElement('label');
creditUserError.textContent = '* If you are using a credit card please use valid information.'
creditUserError.style.color = 'red' 
const paymentFieldSet = document.querySelector('.payment-methods');
const firstDivpayment = paymentFieldSet.querySelector('.payment-method-box');
paymentFieldSet.insertBefore(creditUserError, firstDivpayment);
creditUserError.style.display = 'none';
 


 
// before submition validates username email, activities selected, and credit card information
submit.addEventListener('click', (e) => {
//displays Error if username is incorrectly submitted
    if (userValidation(name.value)) {
        name.style.border = 'solid lightgray 1px';
        nameUserError.style.display = 'none';
        name.parentNode.className = 'valid';
        name.parentNode.lastElementChild.style.display = 'none';
    } else { 
        e.preventDefault();
        name.style.border = 'solid red 2px';
        nameUserError.style.display = 'block';
        name.parentNode.className = 'not-valid'
        name.parentNode.lastElementChild.style.display = 'block';
    }
    
// displays Error if email is incorrectly submitted
    if (emailValidation(email.value)) {
        email.style.border = 'solid lightgray 1px'
        userError.style.display = 'none';
        email.parentNode.className = 'valid'
        email.parentNode.lastElementChild.style.display = 'none';
    } else {
        e.preventDefault();
        email.style.border = 'solid red 2px';
        email.parentNode.className = 'not-valid'
        userError.style.display = 'block';
        email.parentNode.lastElementChild.style.display = 'block';

    }

// displays Error if no activities are selected
    if (acitvitiesValidation(activity)) {
        activityUserError.style.display = 'none';
        activities.className = 'activities valid';
        activities.lastElementChild.style.display = 'none';

    } else {
        e.preventDefault();
        activityUserError.style.display = 'block'
        activities.className = 'activities not-valid'
        activities.lastElementChild.style.display = 'block';
    }


//diplays Error if credit card information was selected and credit info is missing
    if (creditCardNumberValidation()) {
        CNumber.parentNode.lastElementChild.style.display = 'none'
        CNumber.parentNode.className = 'valid';
    } else {
        e.preventDefault();
        CNumber.parentNode.lastElementChild.style.display = 'block'
        CNumber.parentNode.className = 'not-valid';
    }

    if (zipCodeValidation()) {
        zip.parentNode.lastElementChild.style.display = 'none';
        zip.parentNode.className = 'valid';
    } else {
        e.preventDefault();
        zip.parentNode.lastElementChild.style.display = 'block';
        zip.parentNode.className = 'not-valid';
    }

    if (cvvValidation()) {
        cvv.parentNode.lastElementChild.style.display = 'none';
        cvv.parentNode.className = 'valid';
    } else {
        e.preventDefault();
        cvv.parentNode.lastElementChild.style.display = 'block';
        cvv.parentNode.className = 'not-valid';
    } 
});
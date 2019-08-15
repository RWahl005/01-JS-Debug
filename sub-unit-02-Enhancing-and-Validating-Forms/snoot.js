"use strict";

var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();
var formValidity = true;
/**
 * Sets up the dates for the drop downs
 */
function setUpDays(){
    var dates = document.getElementById("delivDy").getElementsByTagName("option");
    twentyNine.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[28].cloneNode(true));
    thirtyOne.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[30].cloneNode(true));
}

/**
 * Updates the dropdowns to include the correct day data.
 */
function updateDays(){
    var deliveryDay = document.getElementById("delivDy");
    var dates = deliveryDay.getElementsByTagName("option");
    var deliveryMonth = document.getElementById("delivMo");
    var deliveryYear = document.getElementById("delivYr");
    if(deliveryMonth.selectedIndex === -1) return;
    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;
    while(dates[28]){
        deliveryDay.removeChild(dates[28]);
    }
    if(deliveryYear.selectedIndex === -1){
        deliveryYear.selectedIndex = 0;
    }
    if(selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2020"){
        deliveryDay.appendChild(twentyNine.cloneNode(true));
    }
    else if(selectedMonth == "4" || selectedMonth === "6" || selectedMonth === "9"
        || selectedMonth === "11"){
        deliveryDay.appendChild(thirty.cloneNode(true));
    }
    else if(selectedMonth == "1" || selectedMonth === "3" || selectedMonth === "5"
        || selectedMonth === "7" || selectedMonth === "8" || selectedMonth === "10" 
        || selectedMonth === "12"){
        deliveryDay.appendChild(thirtyOne.cloneNode(true));
    }
}

/**
 * When the javascript is loaded call the setUpPage function.
 */
if(window.addEventListener){
    window.addEventListener("load", setUpPage, false);
}
else if(window.attachEvent){
    window.attachEvent("onload", setUpPage);
}

function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    for(var i = 0; i < emptyBoxes.length; i++){
        emptyBoxes[i].selectedIndex = -1;
    }
}

/**
 * Call all of the other events.
 */
function setUpPage(){
    setUpDays();
    createEventListeners();
    removeSelectDefaults();
    createEventListener();
}

/**
 * Validate the address form section
 * @param {*} fieldsetId 
 */
function validateAddress(fieldsetId){
    var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
    var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
    console.log(errorDiv);
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement;
    try{
        for(var i = 0; i < elementCount; i++){
            currentElement = inputElements[i];
            if(currentElement.value === ""){
                currentElement.style.background = "rgb(255,233,233)";
                fieldsetValidity = false;
            }
            else{
                currentElement.style.background = "white";
            }
        }
        currentElement = document.querySelector("#" + fieldsetId + " select");
        if(currentElement.selectedIndex === -1){
            currentElement.style.border = "1px solid red";
            fieldsetValidity = false;
        }else{
            currentElement.style.border = "";
        }
        if(fieldsetValidity === false){
            if(fieldsetId === "billingAddress"){
                throw "Please complete all Billing Address infromation.";
            }
            else{
                throw "Please complete all Delivery Address information.";
            }
        }
        else{
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    }catch(msg){
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

/**
 * Validate the Delivery Form Section
 */
function validateDeliveryDate(){
    var selectElements = document.querySelectorAll("#deliveryDate select");
    var errorDiv = document.querySelector("#deliveryDate .errorMessage");
    var fieldsetValidity = true;
    var elementCount = selectElements.length;
    var currentElement;
    try{
        for(var i = 0; i < elementCount; i++){
            currentElement = selectElements[i];
            if(currentElement.selectedIndex === -1){
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false;
            }
            else{
                currentElement.style.border = "";
            }
        }
        if(fieldsetValidity === false){
            throw "Please specify a Delivery Date.";
        }
        else{
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    }catch(msg){
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

/**
 * Validate the Message
 */
function validateMessage(){
    var errorDiv = document.querySelector("#message .errorMessage");
    var msgBox = document.getElementById("customText");
    try{
        if(document.getElementById("custom").checked && 
            ((msgBox.value === "") || (msgBox.value === msgBox.placeholder))){
            throw "Please enter your Message text.";
        }else{
            errorDiv.style.display = "none";
            msgBox.style.background = "white";
        }
    }catch(msg){
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        msgBox.style.background = "rgb(255, 233, 233)";
        formValidity = false;
    }
}

/**
 * Validate the Create Account form section
 */
function validateCreateAccount(){
    var errorDiv = document.querySelector("#createAccount .errorMessage");
    var usernameElement = document.getElementById("username");
    var pass1Element = document.getElementById("pass1");
    var pass2Element = document.getElementById("pass2");
    var passwordMismatch = false;
    var invColor = "rgb(255, 233, 233)";
    var fieldsetValidity = true;
    try{
        usernameElement.style.background = "";
        pass1Element.style.background = "";
        pass2Element.style.background = "";
        errorDiv.style.display = "none";
        if(usernameElement.value !== "" && pass1Element.value !== "" && pass2Element.value !== ""){
            if(pass1Element.value !== pass2Element.value){
                passwordMismatch = true;
                throw "Passwords entered do not match, please reenter.";
            }
        }
    }catch(msg){
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
        if(passwordMismatch){
            usernameElement.style.background = "";
            pass1Element.style.background = invColor;
            pass2Element.style.background = invColor;
        }
        else if(usernameElement.value === "" && pass1Element.value === "" && pass2Element.value === ""){
            fieldsetValidity = true;
        }else{
            usernameElement.style.background = invColor;
            fieldsetValidity = false;
            throw "Please enter all fields to Create Account.";
        }
    }
}

/**
 * Validate the form payment section
 */
function validatePayment(){
    var errorDiv = document.querySelector("#paymentInfo .errorMessage");
    var fieldsetValidity = true;
    var ccNumElement = document.getElementById("ccNum");
    var selectElements = document.querySelectorAll("#paymentInfo select");
    var elementCount = selectElements.length;
    var cvvElement = document.getElementById("cvv");
    var cards = document.getElementsByName("PaymentType");
    var currentElement;

    if(!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked){
        for(var i = 0; i < cards.length; i++){
            cards[i].style.outline = "1px solid red";
        }
        fieldsetValidity = false;
    }else{
        for(var i = 0; i < cards.length; i++){
            cards[i].style.outline = "";
        }
    }
    if(ccNumElement.value === ""){
        ccNumElement.style.background = "rgb(255, 233, 233)";
        fieldsetValidity = false;
    }else{
        ccNumElement.style.background = "white";
    }
    for(var i = 0; i < selectElements.length; i++){
        currentElement = selectElements[i];
        if(currentElement.selectedIndex === -1){
            currentElement.style.border = "1px solid red";
            fieldsetValidity = false;
        }
        else{
            currentElement.style.border = "";
        }
    }
    if(cvvElement.value === ""){
        cvvElement.style.background = "rgb(255, 233, 233)";
        fieldsetValidity = false;
    }else{
        cvvElement.style.background = "white";
    }

    try{
        if(fieldsetValidity === false){
            throw "Please complete all Payment information.";
        }
        else{
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    }catch(msg){
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

/**
 * Called when the form is submitted
 * @param {*} evt 
 */
function validateForm(evt){
    if(evt.preventDefault){
        evt.preventDefault();
    }
    else{
        evt.returnValue = false;
    }
    formValidity = true;
    validateAddress("billingAddress");
    validateAddress("deliveryAddress");
    validateDeliveryDate();
    validatePayment();
    validateMessage();
    validateCreateAccount();
    if(formValidity === true){
        document.getElementById("errorText").innerHTML = "";
        document.getElementById("errorText").style.display = "none";
        document.getElementsByTagName("form")[0].submit();
    }else{
        document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order.";
        document.getElementById("errorText").style.display = "block";
        scroll(0,0);
    }
    
}

/**
 * Add event listeners to items.
 */
function createEventListeners(){
    var deliveryMonth = document.getElementById("delivMo");
    if(deliveryMonth.addEventListener){
        deliveryMonth.addEventListener("change", updateDays, false);
    }
    else if(deliveryMonth.attachEvent){
        deliveryMonth.attachEvent("onchange", updateDays);
    }

    var deliveryYear = document.getElementById("delivYr");
    if(deliveryYear.addEventListener){
        deliveryYear.addEventListener("change", updateDays, false);
    }
    else if(deliveryYear.attachEvent){
        deliveryYear.attachEvent("onchange", updateDays);
    }

    var same = document.getElementById("sameAddr");
    if(same.addEventListener){
        same.addEventListener("change", copyBillingAddress, false);
    }
    else if(same.attachEvent){
        same.attachEvent("onchange", copyBillingAddress);
    }

    var form = document.getElementsByTagName("form")[0];
    if(form.addEventListener){
        form.addEventListener("submit", validateForm, false);
    }
    else if(form.attachEvent){
        form.attachEvent("onsubmit", validateForm);
    }
}

/**
 * copy all of the data for billing address
 */
function copyBillingAddress(){
    var billingInputElements = document.querySelectorAll("#billingAddress input");
    var deliveryInputElements = document.querySelectorAll("#deliveryAddress input");
    
    if(document.getElementById("sameAddr").checked){
        for (var i = 0; i < billingInputElements.length; i++){
            deliveryInputElements[i+1].value = billingInputElements[i].value;
        }
        document.querySelector("#deliveryAddress select").value = document.querySelector("#billingAddress select").value;
    }
    else{
        for(var i = 0; i < billingInputElements.length; i++){
            deliveryInputElements[i + 1].value = "";
        }
        document.querySelector("#deliveryAddress select").selectedIndex = -1;
    }
}

/**
 * Auto check the Custom Message option if it contains a value.
 */
function autoCheckCustom(){
    var messageBox = document.getElementById("customText");
    if(messageBox.value !== "" && messageBox.value !== messageBox.placeholder){
        document.getElementById("custom").checked = "checked";
    }
    else{
        document.getElementById("custom").checked = "";
    }
}

/**
 * Add in other event listeners.
 */
function createEventListener(){
    var submitButton = document.getElementById("orderButton"); // It is not submit.
    if(submitButton.addEventListener){
        submitButton.addEventListener("click", removeSelectDefaults, false);
    }
    else if(submitButton.attachEvent){
        submitButton.attachEvent("onclick", removeSelectDefaults);
    }
    var messageBox = document.getElementById("customText");
    if(messageBox.addEventListener){
        messageBox.addEventListener("change", autoCheckCustom, false);
    }
    else if(messageBox.attachEvent){
        messageBox.attachEvent("onchange", autoCheckCustom);
    }
}
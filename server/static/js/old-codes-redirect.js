// If user leaves code box with 4-digit code
// Display a message telling them to contact CS

let codeInput = document.getElementById('code');
let redirectMessage = document.getElementById('old-codes-redirect-message');

codeInput.addEventListener('blur', (e) => {
    console.log('User left the code box.');
    let codeValue = e.target.value;
    redirectMessage.style.display = (codeValue.length < 8) ? "block" : "none";
});
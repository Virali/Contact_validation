const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone-number");
const submitButton = document.getElementById('submit-button');
const [nameBlock, emailBlock, phoneBlock] = document.getElementsByClassName('item');
const regExpForName = /[a-zA-Z]+|[а-яА-Я]+/;
const regExpForMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regExpForPhone = /^(\+7)|^(07)|^8/;

function showWarning(warningText, node) {
   let warning = (node.querySelector('div.item p')) ? node.querySelector('div.item p') : document.createElement('p');

   warning.innerText = warningText;
   warning.style.cssText='color: rgb(231, 16, 16);'
   node.appendChild(warning);

   return warning;
}

async function sendData() {

}

submitButton.addEventListener("click", function(e) {
   e.preventDefault();
   let validationStatus = true;
   Array.from(document.querySelectorAll('div.item p')).forEach(block => block.innerText = '');

   {  
      let warningText = '';
      if(regExpForName.test(nameInput.value)) {
         const fio = nameInput.value.split(" ");
         if( fio.length != 3) {
            warningText = 'Fename, Name and Fathers name are required. ';
         } 
         else {
            fio.forEach(element => {
               if(element[0] !== element[0].toUpperCase()) {
                  warningText = 'All names require to start with a capital letter.'
               }
            });
         }
      } else warningText = 'Write with letters'

      if(warningText) {
         showWarning(warningText, nameBlock);
         validationStatus = false;
      }
   }

   
   if(!regExpForMail.test(emailInput.value)) {
      showWarning('Wrong email input', emailBlock);
      validationStatus = false;
   }
   
   if(!regExpForPhone.test(phoneInput.value) || !(/\d/.test(phoneInput.value))) {
      showWarning('Wrong number input', phoneBlock);
      validationStatus = false;
   }

   if(validationStatus) {
      let fd = new FormData();

      fd.append('name', nameInput.value);
      fd.append('email', emailInput.value);
      fd.append('phone', phoneInput.value);

      fetch('https://example.com/contacts', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(fd),
      })
      .then(response => response.json())
      .then(data => {
         console.log('Success:', data);
      })
      .catch((error) => {
         console.error('Error:', error);
      });
   }
})

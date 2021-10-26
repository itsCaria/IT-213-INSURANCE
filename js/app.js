//Variable
const form = document.getElementById('request-quote');

const html = new HTMLUI();



// Event Listeners
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', function() {
        // Create the <option> for the years
        
        html.displayYears();
    });
    
    // when the form is submitted
    form.addEventListener('sumbit', function (e) {
        e.preventDefault();

        // Read the values from the FORM
        const make = document.getElementById('make').value;
        const year = document.getElementById('year').value;
        // Read the radio buttons
        const level = document.querySelector('input[name="level"]:checked').value;

        // Check that all the fields have something
        if(make === '' || year === '' || level === '') {
            html.displayError('All the fields are mandatory');
        } else {
            // Make the quotation
            const insurance = new Insurance(make, year, level );
            const price = insurance.calculateQoutation(insurance);
        }  
    });
}


 

// Objects


// Everything related to the quotation and calculations is Insurance
function Insurance(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
}
// Calculate the price for the current quotation
Insurance.prototype.calculateQuotation = function (insurance) {
    let price;
    const base = 2000;

    // get the make
    const make= insurance.make;

    /*
        1 = American 15%
        2 = Asian 5%
        3 = European 35%
    */
   switch(make) {
       case '1':
           price = base * 1.15;
           break;
       case '2':
           price = base * 1.05;
           break;
       case '3':
            price = base * 1.35;
            break;
   }
   console.log(price);
}

// Everuthing related to the HTML
function HTMLUI() {}

// Displays the latest 20 years in the select
HTMLUI.prototype.displayYears = function() {
    // Max & minimum years
    const max = new Date().getFullYear(),
          min = max - 20;

   // Generate the list with the latest 20 years
   const selectYears = document.getElementById('year');

   // Print the values
   for( let i = max; i > min; i-- ) {
       const option = document.createElement('option');
       option.value = i;
       option.textContent = i;
       selectYears.appendChild(option);
   }
}
// Prints an error

HTMLUI.prototype.displayError = function(message) {
    // create a div
    const div = document.createElement('div');
    div.classList = 'error';

    // insert the message
    div.innerHTML = `
        <p>${message}</p>
    `;

    form.insertBefore(div, document.querySelector('.form-group'));

    // Remove the error
    setTimeout(function () {
        document.querySelector('.error').remove();
    }, 3000);

}
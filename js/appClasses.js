

//Variable
const form = document.getElementById('request-quote');
const html = new HTMLUI();



// Event Listeners
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', function() {
        // Create the <option> for the years
        
        const html = new HTMLUI();
        html.displayYears();
    });
    
    // when the form is submitted
    form.addEventListener('sumbit', function(e) {
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
                
            // Clear the previous quotes
            const prevResult = document.querySelector('#result div');
            if(prevResult != null) {
                prevResult.remove();
            }
    
            // Print the result from HTMLUI();
            html.showResults(price, insurance);
        }  
    });
}
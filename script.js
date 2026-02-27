// 1. Grab the form element and the message container from our HTML
const form = document.getElementById('appointmentForm');
const statusMessage = document.getElementById('statusMessage');

// 2. IMPORTANT: Replace this placeholder with your actual Web App URL
// It must start with https://script.google.com/... and end with /exec
const scriptURL = 'https://script.google.com/macros/s/AKfycbzKBGfqlwPQ6qWC9ZX6YSDXC9ZqYoHK9JsO-jwUnLScPk2Z2a6nc6yG3BSiFq-y6ums/exec'; 

// 3. Listen for the moment the user clicks the "Request Appointment" button
form.addEventListener('submit', function(event) {
    
    // Stop the browser from reloading the page instantly
    event.preventDefault(); 
    
    // Show a loading message so the patient knows it's working
    statusMessage.style.display = 'block';
    statusMessage.style.color = '#3498db'; // The clinic's blue color
    statusMessage.textContent = 'Sending appointment request...';
    
    // Automatically package all the data from the form fields
    const formData = new FormData(form);
    
    // 4. Send the packaged data securely to your Google Sheet
    fetch(scriptURL, { 
        method: 'POST', 
        body: formData 
    })
    .then(response => {
        // If the drop-off is successful, show a green success message
        statusMessage.style.color = '#27ae60'; 
        statusMessage.textContent = 'Success! The appointment request has been sent to the clinic.';
        
        // Clear all the text boxes so the form is clean again
        form.reset(); 
    })
    .catch(error => {
        // If the internet drops or something breaks, show a red error
        statusMessage.style.color = '#e74c3c'; 
        statusMessage.textContent = 'Oops! Something went wrong connecting to the server. Please try again.';
        console.error('Submission Error:', error.message);
    });
});
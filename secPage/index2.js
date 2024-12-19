document.addEventListener('DOMContentLoaded', function() {
    // Get data from previous page
    const personalInfo = JSON.parse(localStorage.getItem('personalInfo'));
    if (personalInfo) {
        console.log('Data from first page:', personalInfo);
    }

    // Function to check if form has been modified
    function isFormModified() {
        const departureDate = document.getElementById('departureDate').value;
        const returnDate = document.getElementById('returnDate').value;
        const accommodation = document.getElementById('accommodation').value;
        const specialRequests = document.getElementById('specialRequests').value;
    
        return departureDate || returnDate || accommodation || specialRequests.trim().length > 0;
    }



    // Get form elements
    const form = document.getElementById('travelPreferencesForm');
    const departureDateInput = document.getElementById('departureDate');
    const returnDateInput = document.getElementById('returnDate');

    // Set minimum dates
    const today = new Date();
    const minDepartureDate = new Date(today);
    minDepartureDate.setDate(today.getDate() + 1); // Minimum 1 day from today
    
    departureDateInput.min = minDepartureDate.toISOString().split('T')[0];

    // Update return date minimum when departure date changes
    departureDateInput.addEventListener('change', function() {
        const selectedDeparture = new Date(this.value);
        const minReturnDate = new Date(selectedDeparture);
        minReturnDate.setDate(selectedDeparture.getDate() + 1);
        returnDateInput.min = minReturnDate.toISOString().split('T')[0];
        
        // Clear return date if it's before departure date
        if (returnDateInput.value && new Date(returnDateInput.value) <= selectedDeparture) {
            returnDateInput.value = '';
        }
    });

    // Add accommodation price display
    const accommodationSelect = document.getElementById('accommodation');
    const prices = {
        'standard': '5,000',
        'deluxe': '8,000',
        'suite': '12,000',
        'family': '15,000'
    };

    accommodationSelect.addEventListener('change', function() {
        const selectedOption = this.value;
        if (selectedOption && prices[selectedOption]) {
            alert(`Selected accommodation price: $${prices[selectedOption]} per night`);
        }
    });

    // Character counter for special requests
    const specialRequestsTextarea = document.getElementById('specialRequests');
    const maxLength = 500;

    specialRequestsTextarea.maxLength = maxLength;
    
    specialRequestsTextarea.addEventListener('input', function() {
        const remaining = maxLength - this.value.length;
        let message = `${remaining} characters remaining`;
        
        if (this.value.length >= maxLength) {
            message = 'Maximum length reached';
        }
        
        // Create or update character counter
        let counter = document.getElementById('char-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.id = 'char-counter';
            counter.style.textAlign = 'right';
            counter.style.fontSize = '0.8em';
            counter.style.color = '#666';
            this.parentNode.appendChild(counter);
        }
        counter.textContent = message;
    });

        // Back Button Handler 

        const backButton = document.getElementById('backButton');
    
        backButton.addEventListener('click', function() {
            // Ask for confirmation if form has been modified
            const formModified = isFormModified(); // You can implement this check
            
            if (formModified) {
                if (confirm('Are you sure you want to go back? Any unsaved changes will be lost.')) {
                    window.location.href = '/index.html';
                }
            } else {
                window.location.href = '/index.html';
            }
        });
    
    
        // Next Button Handler 
    
        const nextButton = document.getElementById('nextButton');
    
        nextButton.addEventListener('click', function(event) {
            // Prevent default form submission
            event.preventDefault();
            
            const departureDate = document.getElementById('departureDate').value;
            const returnDate = document.getElementById('returnDate').value;
            const accommodation = document.getElementById('accommodation').value;
            const specialRequests = document.getElementById('specialRequests').value;
    
            // validate required fields
            if (!departureDate || !returnDate || !accommodation) {
                alert('Please fill in all required fields');
                return;
            }
    
            // validate dates
            if (new Date(returnDate) <= new Date(departureDate)) {
                alert('Return date must be after departure date');
                return;
            }
    
            // collect form data
            const travelData = {
                departureDate: departureDate,
                returnDate: returnDate,
                accommodation: accommodation,
                specialRequests: specialRequests,
                personalInfo: personalInfo
            };
    
    
            try {
                // Store in localStorage
                localStorage.setItem('travelData', JSON.stringify(travelData));
    
                // Redirect to next page        
                window.location.href = '/thirPage/index3.html';
            } catch (error) {
                console.error('Error storing data:', error);
                alert('An error occured while saving your data. Please try again.');
            }
            
        });
    
});


// Next Button 

// nextButton.addEventListener('click', function() {
//     const departureDate = document.getElementById('departureDate').value;
//     const returnDate = document.getElementById('returnDate').value;
//     const accommodation = document.getElementById('accommodation').value;
//     const specialRequests = document.getElementById('specialRequests').value;
    







//     window.location.href = '/thirPage/index3.html';
// }); 



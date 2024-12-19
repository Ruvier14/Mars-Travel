document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('healthDeclarationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const healthData = {
            healthIssues: document.querySelector('input[name="healthIssues"]:checked')?.value,
            emergencyContact: {
                name: document.getElementById('emergencyName').value,
                relationship: document.getElementById('emergencyRelation').value,
                phone: document.getElementById('emergencyPhone').value
            },
            medicalConditions: document.getElementById('medicalConditions').value
        };

        // Validate required fields
        if (!healthData.healthIssues || !healthData.emergencyContact.name || 
            !healthData.emergencyContact.relationship || !healthData.emergencyContact.phone) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            // Store in localStorage
            localStorage.setItem('healthData', JSON.stringify(healthData));
            
            // Show success message
            showSuccessMessage();
        } catch (error) {
            console.error('Error storing data:', error);
            alert('An error occurred. Please try again.');
        }
    });

    function showSuccessMessage() {
        const container = document.querySelector('.container');
        container.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 20px;">
                <h2 style="color: #28a745;">Submitted Successfully! Thanks!</h2>
                <p>Your health declaration has been recorded.</p>
                <button onclick="window.location.href='/'" 
                        style="margin-top: 20px; padding: 10px 20px; 
                               background-color: #007bff; color: white; 
                               border: none; border-radius: 5px; 
                               cursor: pointer;">
                    Return Home
                </button>
            </div>
        `;
    }

    // Back button functionality (keep your existing back button code)
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function() {
        window.location.href = '/secPage/index2.html';
    });
});
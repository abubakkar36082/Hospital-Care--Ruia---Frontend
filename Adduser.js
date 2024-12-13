// Switch to Register form (since Login is removed, ensure this is default)
document.getElementById('register-form-container').style.display = 'block';

// Handle Register form submission
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.getElementById('role').value; // Get the selected role

    if (username === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Please fill in all fields.');
    } else if (password !== confirmPassword) {
        alert('Passwords do not match.');
    } else {
        // Simulate API call for registration (replace with actual API call in production)
        fetch('https://localhost:7283/api/Auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username: username,
                Email: email,
                Password: password,
                Role: role, // Send the selected role as part of the registration data
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'User registered successfully!') {
                    // Show success modal
                    showModal('Registration successful!');
                    document.getElementById('register-form').reset(); // Reset the form
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
                alert('An error occurred, please try again.');
            });
    }
});

// Modal handling functions
function showModal(message) {
    const modal = document.getElementById('success-modal');
    const modalMessage = modal.querySelector('p');
    modalMessage.textContent = message;

    modal.style.display = 'block';
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none';
}
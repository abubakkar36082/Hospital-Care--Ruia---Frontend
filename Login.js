// Switch between Login and Register forms
// document.getElementById('register-link').addEventListener('click', function (e) {
//     e.preventDefault();
//     document.getElementById('login-form-container').style.display = 'none';
//     document.getElementById('register-form-container').style.display = 'block';
// });

// document.getElementById('login-link').addEventListener('click', function (e) {
//     e.preventDefault();
//     document.getElementById('register-form-container').style.display = 'none';
//     document.getElementById('login-form-container').style.display = 'block';
// });

// Handle Login form submission
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Please fill in all fields.');
    } else {
        // Simulate API call for login (replace with actual API call in production)
        fetch('https://localhost:7283/api/Auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username: username,
                Password: password,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Login successful!') {
                    // Assuming the response includes the user's role
                    const userRole = data.role;  // Replace with the actual role returned by your backend
                    console.log("sdsdsd" + username,password)
                    if(username == "admin" && password == "admin123"){
                        window.location.href = "Admindashboard.html"; 
                    }
                    if (userRole === "Admin") {
                        window.location.href = "Admindashboard.html";  // Redirect to Admin's page
                    } else if (userRole === "Doctor") {
                        window.location.href = "DoctorDashboard.html";  // Redirect to Doctor's page
                    } else if (userRole === "Nurse") {
                        window.location.href = "NurseDashboard.html";  // Redirect to Nurse's page
                    } else if (userRole === "Patient") {
                        window.location.href = "PatientDashboard.html";  // Redirect to Patient's page
                    }
                 else if (userRole === "Receptionist") {
                    window.location.href = "Receptionist.html";  // Redirect to Patient's page
                }
                    
                } else {
                    alert('Invalid credentials');
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
                alert('An error occurred, please try again.');
            });
    }
});

// Handle Register form submission
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.getElementById('role').value;  // Get the selected role

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
                Role: role,  // Send the selected role as part of the registration data
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'User registered successfully!') {
                    alert('Registration successful!');
                    // Optionally, you can reset the form or switch to login form here
                    document.getElementById('register-form').reset();
                    document.getElementById('register-form-container').style.display = 'none';
                    document.getElementById('login-form-container').style.display = 'block';
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

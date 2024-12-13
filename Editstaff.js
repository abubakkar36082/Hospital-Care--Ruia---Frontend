// Function to get the URL parameter (staff ID)
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fetch staff data from the API for editing
async function fetchStaffForEditing() {
    const urlParams = new URLSearchParams(window.location.search);
    const staffId = urlParams.get('id'); // Get the staff ID from the URL

    if (staffId) {
        try {
            const response = await fetch(`https://localhost:7283/api/Staff/${staffId}`);
            const staff = await response.json();
            if (response.ok) {
                populateEditForm(staff);  // Populate the form with staff data
            } else {
                alert('Staff member not found');
            }
        } catch (error) {
            console.error('Error fetching staff data:', error);
            alert('Error fetching staff data');
        }
    } else {
        alert('Invalid staff ID');
    }
}



// Populate the form fields with staff data
function populateEditForm(staff) {
    document.getElementById('staffId').value = staff.id;
    document.getElementById('firstName').value = staff.firstName;
    document.getElementById('lastName').value = staff.lastName;
    document.getElementById('email').value = staff.email;
    document.getElementById('phone').value = staff.phone;
    document.getElementById('role').value = staff.role;
    document.getElementById('gender').value = staff.gender;
    document.getElementById('department').value = staff.department;
    document.getElementById('address').value = staff.address;
}

// Call the fetch function on page load
window.onload = fetchStaffForEditing;

// Function to save the changes made to the staff member
async function saveChanges() {
    const staffId = document.getElementById('staffId').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('role').value;
    const gender = document.getElementById('gender').value;
    const department = document.getElementById('department').value;
    const address = document.getElementById('address').value;

    const updatedStaff = {
        id: staffId,
        firstName,
        lastName,
        email,
        phone,
        role,
        gender,
        department,
        address
    };

    try {
        const response = await fetch(`https://localhost:7283/api/Staff/${staffId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedStaff),
        });

        if (response.ok) {
            alert('Staff details updated successfully!');
            window.location.href = 'listall.html';  // Redirect back to the staff list
        } else {
            alert('Failed to update staff details.');
        }
    } catch (error) {
        console.error('Error updating staff details:', error);
    }
}

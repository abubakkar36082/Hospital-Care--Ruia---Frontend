// Base API URL
const apiUrl = 'https://localhost:7283/api/Staff';

// Fetch and display staff members
async function fetchStaff() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch staff members.');

        const staffList = await response.json();
        const staffTableBody = document.getElementById('staffTableBody');
        staffTableBody.innerHTML = '';

        staffList.forEach(staff => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${staff.firstName} ${staff.lastName}</td>
                <td>${staff.email}</td>
                <td>${staff.phone}</td>
                <td>${staff.role}</td>
                <td>${staff.gender}</td>
                <td>${staff.department}</td>
                <td>${staff.address}</td>
                <td>
                    <button class="update" onclick="loadUpdateForm(${staff.id})">Update</button>
                    <button class="delete" onclick="deleteStaff(${staff.id})">Delete</button>
                </td>
            `;
            staffTableBody.appendChild(row);
        });
        console.log("Staff members fetched successfully.");
    } catch (error) {
        console.error("Error fetching staff members:", error.message);
    }
}

// Add a new staff member
async function addStaff() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const role = document.getElementById('role').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const department = document.getElementById('department').value.trim();
    const address = document.getElementById('address').value.trim();

    // Validate form inputs
    if (!firstName || !lastName || !email || !phone || !role || !gender || !department || !address) {
        alert("Please fill out all fields.");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, phone, role, gender, department, address })
        });

        if (!response.ok) throw new Error('Failed to add staff member.');

        alert('Staff member added successfully!');
        clearForm();
        fetchStaff();
    } catch (error) {
        alert('Error adding--------------: ' + error.message);
    }
}

// Delete a staff member
async function deleteStaff(id) {
    if (!confirm('Are you sure you want to delete this staff member?')) return;

    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete staff member.');

        alert('Staff member deleted successfully!');
        fetchStaff();
    } catch (error) {
        alert('Error deleting staff member: ' + error.message);
    }
}

// Clear input fields
function clearForm() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('role').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('department').value = '';
    document.getElementById('address').value = '';
}

// Load form with existing data for updating staff
async function loadUpdateForm(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) throw new Error('Failed to load staff data.');

        const staff = await response.json();
        document.getElementById('firstName').value = staff.firstName;
        document.getElementById('lastName').value = staff.lastName;
        document.getElementById('email').value = staff.email;
        document.getElementById('phone').value = staff.phone;
        document.getElementById('role').value = staff.role;
        document.getElementById('gender').value = staff.gender;
        document.getElementById('department').value = staff.department;
        document.getElementById('address').value = staff.address;

        document.getElementById('addButton').innerText = 'Update Staff';
        document.getElementById('addButton').onclick = function () {
            updateStaff(id);
        };
    } catch (error) {
        alert('Error loading staff data for update: ' + error.message);
    }
}

// Update an existing staff member
async function updateStaff(id) {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const role = document.getElementById('role').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const department = document.getElementById('department').value.trim();
    const address = document.getElementById('address').value.trim();

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, firstName, lastName, email, phone, role, gender, department, address })
        });

        if (!response.ok) throw new Error('Failed to update staff member.');

        alert('Staff member updated successfully!');
        clearForm();
        document.getElementById('addButton').innerText = 'Add Staff';
        document.getElementById('addButton').onclick = addStaff;
        fetchStaff();
    } catch (error) {
        alert('Error updating staff member: ' + error.message);
    }
}

// Initial load
fetchStaff();

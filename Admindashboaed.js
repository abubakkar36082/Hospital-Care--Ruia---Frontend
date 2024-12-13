const apiUrl = 'https://localhost:7283/api/Staff';

// Show specific section in the form
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

// Fetch and display staff members
async function fetchStaff() {
    const response = await fetch(apiUrl);
    const staffList = await response.json();
    const staffTableBody = document.getElementById('staffTableBody');
    staffTableBody.innerHTML = '';
    staffList.forEach(staff => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${staff.id}</td>
            <td>${staff.fullName}</td>
            <td>${staff.email}</td>
            <td>${staff.phone}</td>
            <td>${staff.role}</td>
            <td>${staff.gender}</td>
            <td>${staff.department}</td>
            <td>${staff.address}</td>
            <td>
                <button class="preview-button" onclick="previewStaff(${staff.id})">Preview</button>
                <button class="update-button" onclick="loadUpdateForm(${staff.id})">Update</button>
                <button class="delete-button" onclick="deleteStaff(${staff.id})">Delete</button>
            </td>
        `;
        staffTableBody.appendChild(row);
    });
}

// Add a new staff member
async function addStaff() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('role').value;
    const gender = document.getElementById('gender').value;
    const department = document.getElementById('department').value;
    const address = document.getElementById('address').value;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, role, gender, department, address })
    });

    if (response.ok) {
        alert('Staff added successfully');
        fetchStaff();
    } else {
        alert('Failed to add staff');
    }
}

// Delete a staff member
async function deleteStaff(id) {
    if (!confirm('Are you sure?')) return;

    const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    if (response.ok) {
        alert('Staff deleted successfully');
        fetchStaff();
    } else {
        alert('Failed to delete staff');
    }
}

// Search staff by ID
async function searchStaff() {
    const id = document.getElementById('searchId').value;
    const result = document.getElementById('searchResult');
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (response.ok) {
            const staff = await response.json();
            result.innerHTML = `
                <p><strong>ID:</strong> ${staff.id}</p>
                <p><strong>Name:</strong> ${staff.firstName} ${staff.lastName}</p>
                <p><strong>Email:</strong> ${staff.email}</p>
                <p><strong>Role:</strong> ${staff.role}</p>
                <p><strong>Gender:</strong> ${staff.gender}</p>
                <p><strong>Department:</strong> ${staff.department}</p>
                <p><strong>Address:</strong> ${staff.address}</p>
            `;
        } else {
            result.innerHTML = '<p style="color: red;">Staff not found</p>';
        }
    } catch (error) {
        console.error('Error fetching staff data:', error);
        result.innerHTML = '<p style="color: red;">Failed to fetch staff details. Please try again.</p>';
    }
}


// Preview the staff details in a modal
function previewStaff(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(staff => {
            const previewContent = document.getElementById('previewContent');
            previewContent.innerHTML = `
                <p><strong>Name:</strong> ${staff.firstName} ${staff.lastName}</p>
                <p><strong>Email:</strong> ${staff.email}</p>
                <p><strong>Phone:</strong> ${staff.phone}</p>
                <p><strong>Role:</strong> ${staff.role}</p>
                <p><strong>Gender:</strong> ${staff.gender}</p>
                <p><strong>Department:</strong> ${staff.department}</p>
                <p><strong>Address:</strong> ${staff.address}</p>
            `;
            openModal();
        });
}

// Open the preview modal
function openModal() {
    document.getElementById('previewModal').style.display = 'block';
}

// Close the preview modal
function closeModal() {
    document.getElementById('previewModal').style.display = 'none';
}

// Initial staff list fetch
fetchStaff();

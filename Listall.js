const apiUrl = 'https://localhost:7283/api/Staff';

// Fetch staff data from the API
async function fetchStaff() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching staff: ${response.statusText}`);
        }

        const staffList = await response.json();
        populateTable(staffList);
    } catch (error) {
        console.error('Error fetching staff:', error);
        document.getElementById('staffTable').innerHTML =
            `<tr><td colspan="9">Error loading staff data. Please try again later.</td></tr>`;
    }
}

// Populate the staff table with data
function populateTable(staffList) {
    const tableBody = document.getElementById('staffTable');
    tableBody.innerHTML = ''; // Clear existing data

    if (staffList.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9">No staff members found.</td></tr>';
        return;
    }

    staffList.forEach(staff => {
        const row = `
            <tr>
                <td>${staff.id}</td>
                <td>${staff.fullName}</td>
                <td>${staff.role}</td>
                <td>${staff.email}</td>
                <td>${staff.phone}</td>
                <td>${staff.department}</td>
                <td>${staff.gender}</td>
                <td>${staff.dateJoined}</td>
                <td>
                    <button onclick="openEditModal(${staff.id})" id="editbtn">Edit</button>
                    <button onclick="openDeleteModal(${staff.id})" id="deletebtn">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Function to filter the table based on the search input
function filterTable() {
    const input = document.getElementById('searchInput').value.toLowerCase(); // Get search input
    const rows = document.querySelectorAll('#staffTable tr'); // Get all table rows

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const id = cells[0]?.textContent.toLowerCase() || '';  // ID column
        const name = cells[1]?.textContent.toLowerCase() || ''; // Name column

        // Check if the ID or Name matches the search input
        if (id.includes(input) || name.includes(input)) {
            row.style.display = ''; // Show matching row
        } else {
            row.style.display = 'none'; // Hide non-matching row
        }
    });
}

// Variables for delete modal
let selectedStaffId = null;

// Function to open the delete modal
function openDeleteModal(id) {
    selectedStaffId = id; // Store the ID of the staff member to be deleted
    document.getElementById('deleteModal').style.display = 'block';
}

// Function to close the delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
}

// Function to delete a staff member
async function deleteStaff() {
    if (selectedStaffId) {
        try {
            const response = await fetch(`${apiUrl}/${selectedStaffId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Staff member deleted successfully.');
                fetchStaff(); // Refresh the staff table
            } else {
                alert('Failed to delete the staff member.');
            }
        } catch (error) {
            console.error('Error deleting staff member:', error);
        } finally {
            closeDeleteModal();
        }
    }
}

// Function to open the edit modal (for now, simply logs the ID)
// Function to open the edit modal (now redirects to Editstaff.html)
function openEditModal(id) {
    // Redirect to Editstaff.html with the staff ID as a query parameter
    window.location.href = `Editstaff.html?id=${id}`;
}


// Attach event listeners for the modal buttons
document.getElementById('confirmDelete').addEventListener('click', deleteStaff);
document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);

// Load staff data on page load
window.onload = fetchStaff;  
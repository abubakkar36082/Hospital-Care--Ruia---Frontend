// Dummy patient data
const patients = [
    { id: 1, name: "John Doe", age: 45, condition: "Diabetes" },
    { id: 2, name: "Jane Smith", age: 50, condition: "Hypertension" },
    { id: 3, name: "Robert Johnson", age: 65, condition: "Arthritis" },
];

// Populate patient data into the table
function loadPatients() {
    const patientTableBody = document.getElementById("patient-table-body");
    patientTableBody.innerHTML = ""; // Clear existing rows

    patients.forEach((patient) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.condition}</td>
            <td>
                <button id="editbtn">Edit</button>
                <button id="deletebtn" onclick="showModal(${patient.id})">Delete</button>
            </td>
        `;
        patientTableBody.appendChild(row);
    });
}

// Search functionality
document.getElementById("search-btn").addEventListener("click", () => {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchInput)
    );
    const patientTableBody = document.getElementById("patient-table-body");
    patientTableBody.innerHTML = "";

    if (filteredPatients.length > 0) {
        filteredPatients.forEach((patient) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.condition}</td>
                <td>
                    <button id="editbtn">Edit</button>
                    <button id="deletebtn" onclick="showModal(${patient.id})">Delete</button>
                </td>
            `;
            patientTableBody.appendChild(row);
        });
    } else {
        patientTableBody.innerHTML = "<tr><td colspan='5'>No patients found.</td></tr>";
    }
});

// Modal management
function showModal(patientId) {
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    modalText.innerText = `Are you sure you want to delete patient with ID ${patientId}?`;
    modal.style.display = "block";

    document.getElementById("confirm-btn").onclick = () => {
        alert(`Patient with ID ${patientId} deleted.`);
        modal.style.display = "none";
        loadPatients();
    };

    document.getElementById("cancel-btn").onclick = () => {
        modal.style.display = "none";
    };

    document.getElementById("close-modal").onclick = () => {
        modal.style.display = "none";
    };
}

// Load initial data
document.addEventListener("DOMContentLoaded", loadPatients);

// Logout button functionality
document.getElementById("logout-btn").addEventListener("click", () => {
    alert("Logged out successfully!");
    window.location.href = "Login.html";
});

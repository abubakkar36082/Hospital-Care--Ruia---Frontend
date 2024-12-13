const apiBaseUrl = "https://localhost:7283/api/Patient";

// Populate medical history options dynamically
function loadMedicalHistoryOptions() {
    fetch(`${apiBaseUrl}/medicalHistory`)
        .then((response) => response.json())
        .then((data) => {
            const medicalHistorySelect = document.getElementById("medicalHistory");
            data.forEach((history) => {
                const option = document.createElement("option");
                option.value = history;
                option.textContent = history;
                medicalHistorySelect.appendChild(option);
            });
        })
        .catch((error) => console.error("Error loading medical history options:", error));
}

// Add a new patient
document.getElementById("patient-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const patientData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phone: document.getElementById("phone").value,
        dateOfBirth: document.getElementById("dateOfBirth").value,
        gender: document.getElementById("gender").value,
        address: document.getElementById("address").value,
        medicalHistory: document.getElementById("medicalHistory").value,
        wardNumber: parseInt(document.getElementById("wardNumber").value),
        roomNumber: parseInt(document.getElementById("roomNumber").value) || null,
        admissionDate: document.getElementById("admissionDate").value || null,
    };

    fetch(apiBaseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientData),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Patient added successfully!");
            document.getElementById("patient-form").reset();
            loadPatients();
        })
        .catch((error) => console.error("Error adding patient:", error));
});

// Load patients into the table
function loadPatients() {
    fetch(apiBaseUrl)
        .then((response) => response.json())
        .then((data) => {
            const tableBody = document.getElementById("patient-table-body");
            tableBody.innerHTML = ""; // Clear the table

            data.forEach((patient) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${patient.id}</td>
                    <td>${patient.firstName} ${patient.lastName}</td>
                    <td>${patient.phone}</td>
                    <td>${patient.wardNumber}</td>
                    <td>${patient.roomNumber || "N/A"}</td>
                    <td>
                        <button onclick="deletePatient(${patient.id})" class="btn-delete">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch((error) => console.error("Error loading patients:", error));
}

// Delete a patient
function deletePatient(id) {
    if (confirm("Are you sure you want to delete this patient?")) {
        fetch(`${apiBaseUrl}/${id}`, { method: "DELETE" })
            .then(() => {
                alert("Patient deleted successfully!");
                loadPatients();
            })
            .catch((error) => console.error("Error deleting patient:", error));
    }
}

// Load initial data
document.addEventListener("DOMContentLoaded", () => {
    loadMedicalHistoryOptions();
    loadPatients();
});

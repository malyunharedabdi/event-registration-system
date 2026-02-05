const form = document.getElementById('registrationForm');
const tableBody = document.getElementById('attendeesTable');
const apiURL = 'http://localhost:3000/attendees';

// Load attendees from JSON Server
async function getAttendees() {
    const res = await fetch(apiURL);
    const attendees = await res.json();
    renderAttendees(attendees);
}

// Register attendee
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    });
    form.reset();
    getAttendees();
});

// Render attendees
function renderAttendees(attendees) {
    tableBody.innerHTML = '';
    attendees.forEach((attendee, index) => {
        tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${attendee.name}</td>
        <td>${attendee.email}</td>
        <td>
          <button class="btn btn-sm btn-dark" onclick="editAttendee(${attendee.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteAttendee(${attendee.id})">Delete</button>
        </td>
      </tr>
    `;
    });
}

// Delete attendee
async function deleteAttendee(id) {
    await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
    getAttendees();
}

// Edit attendee
async function editAttendee(id) {
    const newName = prompt("Edit Name:");
    const newEmail = prompt("Edit Email:");
    if (newName && newEmail) {
        await fetch(`${apiURL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, email: newEmail })
        });
        getAttendees();
    }
}

// Initial load
getAttendees();

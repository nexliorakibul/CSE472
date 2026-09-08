// Store the number of seats currently available for the workshop.
let availableSeats = 12;

// Display the current registration status on the webpage.
function checkRegistration() {
    let message = document.getElementById("registrationStatus");
    message.textContent = "Registration is currently open.";
}

// Use a simple decision to show whether seats are available.
function checkSeats() {
    let message = document.getElementById("seatMessage");

    if (availableSeats > 0) {
        message.textContent = "Seats are available. Remaining seats: " + availableSeats;
    } else {
        message.textContent = "Sorry, no seats are available.";
    }

}

// Read the student's typed name and show a personalised greeting.
function showGreeting() {
    let name = document.getElementById("studentName").value;
    let output = document.getElementById("greetingMessage");

    output.textContent = "Welcome, " + name + "!";
}

// Independent improvement: display a short workshop venue reminder.
function showVenue() {
    let message = document.getElementById("venueMessage");
    message.textContent = "Venue: Computer Lab 2, Southeast University.";
}

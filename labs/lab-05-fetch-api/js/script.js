// Lab 03 feature: keep a simple seat counter for browser interaction.
let availableSeats = 12;

// Display the current registration status.
function checkRegistration() {
    const message = document.getElementById("registrationStatus");
    message.textContent = "Registration is currently open.";
}

// Show whether seats are available.
function checkSeats() {
    const message = document.getElementById("seatMessage");

    if (availableSeats > 0) {
        message.textContent = "Seats are available. Remaining seats: " + availableSeats;
    } else {
        message.textContent = "Sorry, no seats are available.";
    }
}

// Read the student's typed name and show a personalised greeting.
function showGreeting() {
    const name = document.getElementById("studentName").value.trim();
    const output = document.getElementById("greetingMessage");

    if (name === "") {
        output.textContent = "Please enter your name first.";
    } else {
        output.textContent = "Welcome, " + name + "!";
    }
}

// Lab 04 continuity: collect form data, convert it to JSON and save it in localStorage.
function saveRegistration() {
    const name = document.getElementById("studentName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const department = document.getElementById("department").value;
    const output = document.getElementById("saveMessage");

    if (name === "" || studentId === "" || email === "" || department === "") {
        output.textContent = "Please complete all required registration fields.";
        return;
    }

    const registration = {
        name: name,
        studentId: studentId,
        email: email,
        department: department
    };

    localStorage.setItem("workshopRegistration", JSON.stringify(registration));
    output.textContent = "Registration data saved in localStorage.";
}

// Read the saved registration back from localStorage.
function loadSavedRegistration() {
    const savedText = localStorage.getItem("workshopRegistration");
    const output = document.getElementById("savedRegistration");

    if (savedText === null) {
        output.textContent = "No saved registration was found.";
        return;
    }

    const registration = JSON.parse(savedText);
    output.textContent = registration.name + " (" + registration.studentId + ") - " + registration.department;
}

// Lab 05: request the local JSON file, check status 200, read JSON and display it.
async function loadWorkshop() {
    document.getElementById("loadMessage").textContent =
        "Please wait. Loading workshop information...";

    const response = await fetch("data/workshop.json");
    console.log("workshop.json status:", response.status);

    if (response.status === 200) {
        const workshop = await response.json();

        document.getElementById("workshopTitle").textContent = workshop.title;
        document.getElementById("workshopDate").textContent = workshop.date;
        document.getElementById("workshopVenue").textContent = workshop.venue;
        document.getElementById("workshopSeats").textContent = workshop.seats;
        document.getElementById("workshopInstructor").textContent = workshop.instructor;
        document.getElementById("workshopDuration").textContent = workshop.duration;
        document.getElementById("loadMessage").textContent =
            "Workshop data loaded successfully (HTTP 200).";
    } else {
        document.getElementById("loadMessage").textContent =
            "Could not load workshop data. HTTP status: " + response.status;
    }
}

// Lab 05 public API practice: request user 2 from JSONPlaceholder.
async function loadSampleUser() {
    document.getElementById("apiUser").textContent = "Loading public API data...";

    const response = await fetch("https://jsonplaceholder.typicode.com/users/2");
    console.log("JSONPlaceholder status:", response.status);

    if (response.status === 200) {
        const user = await response.json();
        document.getElementById("apiUser").textContent =
            user.name + " - " + user.email;
    } else {
        document.getElementById("apiUser").textContent =
            "Could not load API data. HTTP status: " + response.status;
    }
}

// Earlier-lab independent improvement retained in the final page.
function showVenue() {
    const message = document.getElementById("venueMessage");
    message.textContent = "Venue details can also be loaded from data/workshop.json above.";
}

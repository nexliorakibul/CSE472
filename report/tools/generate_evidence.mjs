import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const toolDirectory = path.dirname(fileURLToPath(import.meta.url));
const reportDirectory = path.resolve(toolDirectory, "..");
const submissionDirectory = path.resolve(reportDirectory, "..");
const projectDirectory = path.resolve(submissionDirectory, "labs", "lab-03-javascript");
const figureDirectory = path.resolve(reportDirectory, "figures");
const evidenceDirectory = path.resolve(submissionDirectory, "evidence");

fs.mkdirSync(figureDirectory, { recursive: true });
fs.mkdirSync(evidenceDirectory, { recursive: true });

const htmlSource = fs.readFileSync(path.join(projectDirectory, "index.html"), "utf8");
const jsSource = fs.readFileSync(path.join(projectDirectory, "js", "script.js"), "utf8");

const elements = {
    registrationStatus: { textContent: "Click the button to check the status." },
    seatMessage: { textContent: "Seat information will appear here." },
    studentName: { value: "" },
    greetingMessage: { textContent: "Your personalised greeting will appear here." },
    venueMessage: { textContent: "Click the button to display the workshop venue." }
};

const context = vm.createContext({
    document: {
        getElementById(id) {
            return elements[id] || null;
        }
    }
});

vm.runInContext(jsSource, context, { filename: "js/script.js" });

const results = [];

function record(testName, expected, actual) {
    results.push({
        testName,
        expected,
        actual,
        passed: expected === actual
    });
}

const requiredHtml = [
    'id="registrationStatus"',
    'onclick="checkRegistration()"',
    'id="seatMessage"',
    'onclick="checkSeats()"',
    'id="studentName"',
    'id="greetingMessage"',
    'onclick="showGreeting()"',
    'id="venueMessage"',
    'onclick="showVenue()"',
    '<script src="js/script.js"></script>'
];

record(
    "All required HTML connections",
    "10/10 present",
    `${requiredHtml.filter((snippet) => htmlSource.includes(snippet)).length}/10 present`
);

const onclickFunctions = [...htmlSource.matchAll(/onclick="([A-Za-z][A-Za-z0-9_]*)\(\)"/g)]
    .map((match) => match[1]);
const missingFunctions = onclickFunctions.filter((name) => (
    vm.runInContext(`typeof ${name}`, context) !== "function"
));
record("Every onclick function exists", "0 missing", `${missingFunctions.length} missing`);

vm.runInContext("checkRegistration();", context);
record(
    "Registration status button",
    "Registration is currently open.",
    elements.registrationStatus.textContent
);

vm.runInContext("checkSeats();", context);
record(
    "Seat checker with availableSeats = 12",
    "Seats are available. Remaining seats: 12",
    elements.seatMessage.textContent
);
const seatsAvailableText = elements.seatMessage.textContent;

vm.runInContext("availableSeats = 0; checkSeats();", context);
record(
    "Seat checker with availableSeats = 0",
    "Sorry, no seats are available.",
    elements.seatMessage.textContent
);
const seatsFullText = elements.seatMessage.textContent;
vm.runInContext("availableSeats = 12;", context);

elements.studentName.value = "Rakibul Hasan";
vm.runInContext("showGreeting();", context);
record(
    "Personalised greeting",
    "Welcome, Rakibul Hasan!",
    elements.greetingMessage.textContent
);

vm.runInContext("showVenue();", context);
record(
    "Independent venue reminder",
    "Venue: Computer Lab 2, Southeast University.",
    elements.venueMessage.textContent
);

function escapeXml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

function saveSvgAndPng(name, svg) {
    const svgPath = path.join(figureDirectory, `${name}.svg`);
    const pngPath = path.join(figureDirectory, `${name}.png`);
    fs.writeFileSync(svgPath, svg);
    execFileSync("inkscape", [
        svgPath,
        `--export-filename=${pngPath}`,
        "--export-background=#ffffff",
        "--export-background-opacity=255"
    ], { stdio: "ignore" });
}

function browserFrame(content, pageTitle, height = 820) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="${height}" viewBox="0 0 1440 ${height}">
  <defs>
    <linearGradient id="header" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#102a43"/>
      <stop offset="0.55" stop-color="#123c73"/>
      <stop offset="1" stop-color="#176b87"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="14" stdDeviation="17" flood-color="#102a43" flood-opacity="0.16"/>
    </filter>
  </defs>
  <rect width="1440" height="${height}" fill="#eaf0f6"/>
  <rect x="24" y="22" width="1392" height="${height - 44}" rx="18" fill="#ffffff" filter="url(#shadow)"/>
  <rect x="24" y="22" width="1392" height="64" rx="18" fill="#102a43"/>
  <rect x="24" y="66" width="1392" height="20" fill="#102a43"/>
  <circle cx="58" cy="54" r="8" fill="#fb7185"/>
  <circle cx="84" cy="54" r="8" fill="#fbbf24"/>
  <circle cx="110" cy="54" r="8" fill="#34d399"/>
  <rect x="158" y="38" width="1120" height="32" rx="9" fill="#1f3b57"/>
  <text x="182" y="60" fill="#cde3f4" font-family="DejaVu Sans, sans-serif" font-size="15">labs/lab-03-javascript/index.html</text>
  <rect x="24" y="86" width="1392" height="150" fill="url(#header)"/>
  <text x="92" y="132" fill="#a5f3fc" font-family="DejaVu Sans, sans-serif" font-size="14" font-weight="700" letter-spacing="2">CSE472 · WEB AND INTERNET PROGRAMMING LAB</text>
  <text x="92" y="181" fill="#ffffff" font-family="DejaVu Sans, sans-serif" font-size="36" font-weight="800">${escapeXml(pageTitle)}</text>
  <text x="92" y="211" fill="#d9f3f6" font-family="DejaVu Sans, sans-serif" font-size="17">Student Workshop Registration System · JavaScript interaction evidence</text>
  ${content}
</svg>`;
}

function interactionCard({ number, title, description, output, button, extra = "" }) {
    const content = `
  <rect x="122" y="278" width="1196" height="430" rx="22" fill="#ffffff" stroke="#d9e2ec" stroke-width="2" filter="url(#shadow)"/>
  <rect x="172" y="326" width="58" height="58" rx="14" fill="#e8f0ff"/>
  <text x="201" y="363" text-anchor="middle" fill="#1d4ed8" font-family="DejaVu Sans, sans-serif" font-size="19" font-weight="800">${escapeXml(number)}</text>
  <text x="264" y="353" fill="#102a43" font-family="DejaVu Sans, sans-serif" font-size="31" font-weight="800">${escapeXml(title)}</text>
  <text x="172" y="406" fill="#627d98" font-family="DejaVu Sans, sans-serif" font-size="18">${escapeXml(description)}</text>
  ${extra}
  <text x="172" y="487" fill="#627d98" font-family="DejaVu Sans, sans-serif" font-size="14" font-weight="700" letter-spacing="1.4">OUTPUT AFTER BUTTON CLICK</text>
  <rect x="172" y="508" width="1096" height="82" rx="12" fill="#ecfdf5"/>
  <rect x="172" y="508" width="7" height="82" rx="4" fill="#10b981"/>
  <text x="204" y="559" fill="#087f5b" font-family="DejaVu Sans, sans-serif" font-size="22" font-weight="700">${escapeXml(output)}</text>
  <rect x="172" y="620" width="330" height="58" rx="12" fill="#1d4ed8"/>
  <text x="337" y="656" text-anchor="middle" fill="#ffffff" font-family="DejaVu Sans, sans-serif" font-size="17" font-weight="700">${escapeXml(button)}</text>`;
    return browserFrame(content, title);
}

function overviewGraphic() {
    const content = `
  <rect x="100" y="270" width="1240" height="190" rx="22" fill="#ffffff" stroke="#d9e2ec" stroke-width="2" filter="url(#shadow)"/>
  <text x="146" y="315" fill="#0ea5a8" font-family="DejaVu Sans, sans-serif" font-size="14" font-weight="700" letter-spacing="2">FEATURED WORKSHOP</text>
  <text x="146" y="365" fill="#102a43" font-family="DejaVu Sans, sans-serif" font-size="32" font-weight="800">Web Development Essentials</text>
  <text x="146" y="405" fill="#627d98" font-family="DejaVu Sans, sans-serif" font-size="17">HTML, CSS, and beginner-friendly JavaScript in one practical session.</text>
  <rect x="900" y="300" width="130" height="108" rx="14" fill="#f0f8ff"/><rect x="1044" y="300" width="130" height="108" rx="14" fill="#f0f8ff"/><rect x="1188" y="300" width="110" height="108" rx="14" fill="#f0f8ff"/>
  <text x="965" y="334" text-anchor="middle" fill="#627d98" font-family="DejaVu Sans" font-size="12" font-weight="700">DATE</text><text x="965" y="370" text-anchor="middle" fill="#102a43" font-family="DejaVu Sans" font-size="16" font-weight="700">12 SEP 2026</text>
  <text x="1109" y="334" text-anchor="middle" fill="#627d98" font-family="DejaVu Sans" font-size="12" font-weight="700">TIME</text><text x="1109" y="370" text-anchor="middle" fill="#102a43" font-family="DejaVu Sans" font-size="16" font-weight="700">10:00 AM</text>
  <text x="1243" y="334" text-anchor="middle" fill="#627d98" font-family="DejaVu Sans" font-size="12" font-weight="700">VENUE</text><text x="1243" y="370" text-anchor="middle" fill="#102a43" font-family="DejaVu Sans" font-size="15" font-weight="700">LAB 2</text>
  <rect x="100" y="488" width="602" height="244" rx="20" fill="#ffffff" stroke="#d9e2ec" stroke-width="2" filter="url(#shadow)"/>
  <rect x="738" y="488" width="602" height="244" rx="20" fill="#ffffff" stroke="#d9e2ec" stroke-width="2" filter="url(#shadow)"/>
  <text x="146" y="540" fill="#1d4ed8" font-family="DejaVu Sans" font-size="16" font-weight="800">01</text><text x="146" y="583" fill="#102a43" font-family="DejaVu Sans" font-size="26" font-weight="800">Registration status</text><text x="146" y="620" fill="#627d98" font-family="DejaVu Sans" font-size="17">Click the button to check the status.</text><rect x="146" y="651" width="300" height="50" rx="11" fill="#1d4ed8"/><text x="296" y="683" text-anchor="middle" fill="#ffffff" font-family="DejaVu Sans" font-size="15" font-weight="700">Check Registration Status</text>
  <text x="784" y="540" fill="#1d4ed8" font-family="DejaVu Sans" font-size="16" font-weight="800">02</text><text x="784" y="583" fill="#102a43" font-family="DejaVu Sans" font-size="26" font-weight="800">Seat availability</text><text x="784" y="620" fill="#627d98" font-family="DejaVu Sans" font-size="17">Seat information will appear here.</text><rect x="784" y="651" width="290" height="50" rx="11" fill="#1d4ed8"/><text x="929" y="683" text-anchor="middle" fill="#ffffff" font-family="DejaVu Sans" font-size="15" font-weight="700">Check Seat Availability</text>`;
    return browserFrame(content, "Student Workshop Registration System", 790);
}

function greetingGraphic() {
    const content = `
  <rect x="122" y="272" width="1196" height="455" rx="22" fill="#ffffff" stroke="#d9e2ec" stroke-width="2" filter="url(#shadow)"/>
  <text x="172" y="320" fill="#0ea5a8" font-family="DejaVu Sans" font-size="14" font-weight="700" letter-spacing="2">STUDENT DETAILS</text>
  <text x="172" y="365" fill="#102a43" font-family="DejaVu Sans" font-size="31" font-weight="800">Workshop registration</text>
  <text x="172" y="414" fill="#102a43" font-family="DejaVu Sans" font-size="15" font-weight="700">FULL NAME</text>
  <rect x="172" y="432" width="1096" height="62" rx="10" fill="#fbfdff" stroke="#94a3b8" stroke-width="2"/>
  <text x="196" y="470" fill="#243b53" font-family="DejaVu Sans" font-size="20">Rakibul Hasan</text>
  <rect x="172" y="522" width="220" height="56" rx="11" fill="#1d4ed8"/>
  <text x="282" y="557" text-anchor="middle" fill="#ffffff" font-family="DejaVu Sans" font-size="17" font-weight="700">Show Greeting</text>
  <rect x="172" y="605" width="1096" height="82" rx="12" fill="#ecfdf5"/>
  <rect x="172" y="605" width="7" height="82" rx="4" fill="#10b981"/>
  <text x="204" y="656" fill="#087f5b" font-family="DejaVu Sans" font-size="22" font-weight="700">${escapeXml(elements.greetingMessage.textContent)}</text>`;
    return browserFrame(content, "Personalised greeting");
}

function codeGraphic(source, heading, filename, selectedLineNumbers = false) {
    const lines = source.split("\n");
    const lineHeight = 25;
    const height = 150 + (lines.length * lineHeight) + 42;
    const renderedLines = lines.map((line, index) => {
        const y = 145 + (index * lineHeight);
        const sourceNumber = selectedLineNumbers ? line.slice(0, 3) : String(index + 1).padStart(2, "0");
        const code = selectedLineNumbers ? line.slice(5) : line;
        const color = code.trim().startsWith("//") ? "#6ee7b7" : "#e6edf3";
        return `<text x="74" y="${y}" fill="#54738d" font-family="DejaVu Sans Mono, monospace" font-size="15" text-anchor="end">${escapeXml(sourceNumber)}</text><text x="98" y="${y}" fill="${color}" font-family="DejaVu Sans Mono, monospace" font-size="15" xml:space="preserve">${escapeXml(code || " ")}</text>`;
    }).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="${height}" viewBox="0 0 1400 ${height}">
  <rect width="1400" height="${height}" fill="#071525"/>
  <rect x="34" y="30" width="1332" height="${height - 60}" rx="18" fill="#0b1f33" stroke="#284968" stroke-width="2"/>
  <rect x="34" y="30" width="1332" height="60" rx="18" fill="#102a43"/>
  <rect x="34" y="70" width="1332" height="20" fill="#102a43"/>
  <circle cx="69" cy="60" r="8" fill="#fb7185"/><circle cx="95" cy="60" r="8" fill="#fbbf24"/><circle cx="121" cy="60" r="8" fill="#34d399"/>
  <text x="158" y="66" fill="#e0f2fe" font-family="DejaVu Sans" font-size="17" font-weight="700">${escapeXml(filename)}</text>
  <text x="66" y="113" fill="#ffffff" font-family="DejaVu Sans" font-size="20" font-weight="800">${escapeXml(heading)}</text>
  ${renderedLines}
</svg>`;
}

const selectedHtmlPatterns = [
    /id="registrationStatus"/,
    /onclick="checkRegistration\(\)"/,
    /id="seatMessage"/,
    /onclick="checkSeats\(\)"/,
    /id="studentName"/,
    /onclick="showGreeting\(\)"/,
    /id="greetingMessage"/,
    /id="venueMessage"/,
    /onclick="showVenue\(\)"/,
    /script src="js\/script\.js"/
];
const selectedHtml = htmlSource.split("\n")
    .map((line, index) => ({ line, number: index + 1 }))
    .filter(({ line }) => selectedHtmlPatterns.some((pattern) => pattern.test(line)))
    .map(({ line, number }) => `${String(number).padStart(3, " ")}  ${line.trim()}`)
    .join("\n");

saveSvgAndPng("output_overview", overviewGraphic());
saveSvgAndPng("output_registration", interactionCard({
    number: "01",
    title: "Registration status",
    description: "The paragraph changes without reloading the page.",
    output: elements.registrationStatus.textContent,
    button: "Check Registration Status"
}));
saveSvgAndPng("output_seats_available", interactionCard({
    number: "02",
    title: "Seat availability",
    description: "Test path: availableSeats = 12, so the if block runs.",
    output: seatsAvailableText,
    button: "Check Seat Availability"
}));
saveSvgAndPng("output_seats_full", interactionCard({
    number: "02",
    title: "Seat availability",
    description: "Test path: availableSeats = 0, so the else block runs.",
    output: seatsFullText,
    button: "Check Seat Availability"
}));
saveSvgAndPng("output_greeting", greetingGraphic());
saveSvgAndPng("output_venue", interactionCard({
    number: "+",
    title: "Independent venue reminder",
    description: "The extra button calls showVenue() and changes one paragraph.",
    output: elements.venueMessage.textContent,
    button: "Show Venue"
}));
saveSvgAndPng(
    "code_javascript",
    codeGraphic(jsSource, "JavaScript interactions", "js/script.js")
);
saveSvgAndPng(
    "code_html_connections",
    codeGraphic(selectedHtml, "Required HTML connections", "index.html (selected lines)", true)
);

const reportLines = [
    "CSE472 Lab 03 - Automated Interaction Test Results",
    "===================================================",
    "",
    "Execution method: the submitted js/script.js was evaluated against a controlled",
    "document.getElementById() DOM fixture. Each required function was called and the",
    "resulting textContent was compared with its expected value.",
    ""
];

for (const result of results) {
    reportLines.push(`${result.passed ? "PASS" : "FAIL"} - ${result.testName}`);
    reportLines.push(`  Expected: ${result.expected}`);
    reportLines.push(`  Actual:   ${result.actual}`);
    reportLines.push("");
}

const passedCount = results.filter((result) => result.passed).length;
reportLines.push(`Summary: ${passedCount}/${results.length} tests passed.`);
fs.writeFileSync(
    path.join(evidenceDirectory, "automated_test_results.txt"),
    reportLines.join("\n") + "\n"
);

if (passedCount !== results.length) {
    process.exitCode = 1;
}

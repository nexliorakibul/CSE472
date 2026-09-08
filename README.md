# CSE472 Lab 03 Submission Package

This package contains the completed weekly practical task, LaTeX report source,
compiled PDF, implementation evidence, and practice answers for:

**Lab Report 03: JavaScript Foundations and Simple Interaction**

## Important details to replace before submission

The student name has been set to **Rakibul Hasan**. Open
`report/CSE472_Lab03_Report.tex` and replace these three values near the top:

- `REPLACE_STUDENT_ID`
- `REPLACE_SECTION`
- `https://github.com/USERNAME/cse472-web-lab-STUDENTID`

Then compile the report again and rename the PDF to
`CSE472_Lab03_YourStudentID.pdf`.

## Required code location

The implementation is stored at the exact course path:

`labs/lab-03-javascript/`

Open `labs/lab-03-javascript/index.html` in a modern browser. No package
installation or web server is required.

## Features implemented

- External JavaScript file at `js/script.js`
- Registration-status button and page-text update
- Seat-availability button using `availableSeats` and `if...else`
- Personalised greeting using the Full Name input
- Independent venue-reminder button
- `getElementById()` for required element selection
- `textContent` for required page updates
- Responsive Lab 02-style CSS retained in a separate stylesheet

## Report compilation

From the `report` directory, run:

```bash
latexmk -pdf -interaction=nonstopmode -halt-on-error CSE472_Lab03_Report.tex
```

The compiled report uses only common LaTeX packages.

## Suggested Git commit message

`Complete Lab 03 JavaScript interactions`

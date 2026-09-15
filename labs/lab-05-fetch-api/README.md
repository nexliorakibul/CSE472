# CSE472 Lab 05 - HTTP, Fetch and Simple API Use

This folder contains the **Student Workshop Registration System** for Lab 05.

## Run

1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Do not test `fetch()` using a `file://` URL.

## Lab 05 features

- `data/workshop.json` stores workshop data separately.
- `loadWorkshop()` uses `fetch()`, `async` / `await`, `response.status === 200`, and `response.json()`.
- The page displays six JSON values: title, date, venue, seats, instructor, and duration.
- A public JSONPlaceholder request loads the name and email of `/users/2`.
- Earlier browser interaction and localStorage registration features are kept in the page.

## Network evidence

Open Chrome Developer Tools -> **Network**, click **Load Workshop Details**, select `workshop.json`, and verify **Status 200**.

## Controlled 404 test

Temporarily change `data/workshop.json` in `js/script.js` to `data/missing.json`, refresh through Live Server, click the button, and observe **404**. Restore the correct path after the test.

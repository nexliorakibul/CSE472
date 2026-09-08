# Lab 03 Practice Answers

## 17.1 Predict the result

1. `remaining` is `5` because `8 - 3 = 5`.
2. The browser shows `Full` because `availableSeats` is `0`, so the condition
   `availableSeats > 0` is false.

## 17.2 Small coding tasks

### Task 1

```javascript
let courseName = "CSE472";
alert(courseName);
```

### Tasks 2 and 3

```javascript
function showCourse() {
    alert("Web and Internet Programming Lab");
}
```

```html
<button type="button" onclick="showCourse()">Show Course</button>
```

### Task 4

```html
<p id="notice">Waiting for the lab notice.</p>
<button type="button" onclick="showNotice()">Show Notice</button>
```

```javascript
function showNotice() {
    let notice = document.getElementById("notice");
    notice.textContent = "Lab starts at 9:00 AM.";
}
```

### Task 5

```html
<input type="text" id="studentId">
<button type="button" onclick="showStudentId()">Show Student ID</button>
<p id="idOutput"></p>
```

```javascript
function showStudentId() {
    let id = document.getElementById("studentId").value;
    let output = document.getElementById("idOutput");
    output.textContent = "Student ID: " + id;
}
```

## 17.3 Explain in your own words

1. JavaScript adds behaviour and interaction to a webpage. It can respond to a
   click, read input, make a decision, and update visible content.
2. The HTML `id` and the text inside `getElementById()` must match exactly so
   the browser can locate the intended element.
3. Creating a function defines and names a group of instructions. Calling the
   function with parentheses runs those instructions.
4. `.value` reads the current content of an input field.
5. `.textContent` reads or changes the text displayed inside an HTML element.

## AI-assisted practice check

The final independent venue feature uses only a button with `onclick`,
`getElementById()`, and `textContent`. It does not use `addEventListener`,
`querySelector`, arrays, or objects.

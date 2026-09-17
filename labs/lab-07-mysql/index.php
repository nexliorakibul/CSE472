<?php
$pageTitle = "Workshop Registration";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="hero">
        <div class="hero-inner">
            <span class="eyebrow">CSE472 • Lab 07</span>
            <h1>Student Workshop Registration System</h1>
            <p>Choose a workshop, submit your details, and save the registration securely in MySQL.</p>
            <a class="hero-link" href="registrations.php">View Saved Registrations</a>
        </div>
    </header>

    <main class="page-shell">
        <section class="feature-grid" aria-label="Project features">
            <article class="feature-card">
                <span class="feature-number">01</span>
                <h3>PHP + PDO</h3>
                <p>PHP receives the form data and PDO connects safely to MySQL.</p>
            </article>
            <article class="feature-card">
                <span class="feature-number">02</span>
                <h3>Prepared Statements</h3>
                <p>User values are inserted through placeholders instead of direct SQL strings.</p>
            </article>
            <article class="feature-card">
                <span class="feature-number">03</span>
                <h3>Saved Records</h3>
                <p>Every successful registration can be viewed from a separate records page.</p>
            </article>
        </section>

        <section class="card form-card">
            <div class="section-heading">
                <div>
                    <span class="section-kicker">Workshop Enrollment</span>
                    <h2>Registration Form</h2>
                </div>
                <span class="required-note">* Required fields</span>
            </div>

            <form action="save_registration.php" method="POST">
                <div class="form-grid">
                    <div class="field-group">
                        <label for="fullName">Full Name *</label>
                        <input type="text" id="fullName" name="full_name" placeholder="e.g. Ayesha Rahman" required>
                    </div>

                    <div class="field-group">
                        <label for="studentId">Student ID *</label>
                        <input type="text" id="studentId" name="student_id" placeholder="e.g. 202312345" required>
                    </div>

                    <div class="field-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" placeholder="name@example.com" required>
                    </div>

                    <div class="field-group">
                        <label for="department">Department *</label>
                        <select id="department" name="department" required>
                            <option value="">Select Department</option>
                            <option value="CSE">CSE</option>
                            <option value="EEE">EEE</option>
                            <option value="Textile Engineering">Textile Engineering</option>
                            <option value="English">English</option>
                            <option value="BBA">BBA</option>
                        </select>
                    </div>

                    <div class="field-group field-full">
                        <label for="workshop">Workshop *</label>
                        <select id="workshop" name="workshop" required>
                            <option value="">Select Workshop</option>
                            <option value="HTML and CSS Foundations">HTML and CSS Foundations</option>
                            <option value="JavaScript Basics">JavaScript Basics</option>
                            <option value="PHP and MySQL Basics">PHP and MySQL Basics</option>
                            <option value="Database Foundations">Database Foundations</option>
                        </select>
                    </div>

                    <div class="field-group field-full">
                        <label for="expectation">What do you expect to learn?</label>
                        <textarea id="expectation" name="expectation" rows="4" placeholder="Write a short learning expectation..."></textarea>
                        <small class="helper-text">Optional: briefly describe what you want to learn from the workshop.</small>
                    </div>
                </div>

                <button type="submit" class="primary-button">Submit Registration</button>
            </form>
        </section>
    </main>

    <footer>
        <p>CSE472 Web and Internet Programming Lab • PHP &amp; MySQL Database Connection</p>
    </footer>
</body>
</html>

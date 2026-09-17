<?php
require "db.php";

$fullName = trim($_POST["full_name"] ?? "");
$studentId = trim($_POST["student_id"] ?? "");
$email = trim($_POST["email"] ?? "");
$department = trim($_POST["department"] ?? "");
$workshop = trim($_POST["workshop"] ?? "");
$expectation = trim($_POST["expectation"] ?? "");

if ($fullName === "" || $studentId === "" || $email === "" || $department === "" || $workshop === "") {
    die("Please complete all required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Please enter a valid email address.");
}

$sql = "INSERT INTO registrations
        (full_name, student_id, email, department, workshop, expectation)
        VALUES
        (:full_name, :student_id, :email, :department, :workshop, :expectation)";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":full_name" => $fullName,
    ":student_id" => $studentId,
    ":email" => $email,
    ":department" => $department,
    ":workshop" => $workshop,
    ":expectation" => $expectation
]);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Saved</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="hero">
        <div class="hero-inner">
            <span class="eyebrow">Registration Complete</span>
            <h1>Your Registration Was Saved</h1>
            <p>The submitted workshop information has been inserted into the MySQL database.</p>
        </div>
    </header>

    <main class="page-shell">
        <section class="card">
            <span class="success-badge">Success</span>
            <h1>Thank you, <?php echo htmlspecialchars($fullName); ?>!</h1>
            <p>Your registration for <strong><?php echo htmlspecialchars($workshop); ?></strong> has been saved successfully.</p>
            <p><strong>Student ID:</strong> <?php echo htmlspecialchars($studentId); ?><br>
               <strong>Department:</strong> <?php echo htmlspecialchars($department); ?></p>

            <div class="action-row">
                <a class="secondary-link" href="registrations.php">View Saved Registrations</a>
                <a class="secondary-link" href="index.php">Submit Another Registration</a>
            </div>
        </section>
    </main>

    <footer>
        <p>CSE472 Web and Internet Programming Lab • Registration stored using PHP PDO</p>
    </footer>
</body>
</html>

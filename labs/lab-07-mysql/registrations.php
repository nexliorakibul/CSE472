<?php
require "db.php";

$stmt = $pdo->query("SELECT id, full_name, student_id, email, department, workshop, created_at
                     FROM registrations
                     ORDER BY id DESC");
$registrations = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Saved Registrations</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="hero">
        <div class="hero-inner">
            <span class="eyebrow">CSE472 • Lab 07</span>
            <h1>Saved Workshop Registrations</h1>
            <p>Records below are loaded directly from the MySQL registrations table.</p>
            <a class="hero-link" href="index.php">New Registration</a>
        </div>
    </header>

    <main class="page-shell">
        <section class="card">
            <div class="section-heading">
                <div>
                    <span class="section-kicker">Database Records</span>
                    <h1>Saved Registrations</h1>
                </div>
                <span class="required-note"><?php echo count($registrations); ?> record(s)</span>
            </div>

            <?php if (count($registrations) === 0): ?>
                <p>No registration has been saved yet.</p>
            <?php else: ?>
                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Student ID</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Workshop</th>
                                <th>Submitted</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($registrations as $row): ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($row["id"]); ?></td>
                                    <td><?php echo htmlspecialchars($row["full_name"]); ?></td>
                                    <td><?php echo htmlspecialchars($row["student_id"]); ?></td>
                                    <td><?php echo htmlspecialchars($row["email"]); ?></td>
                                    <td><?php echo htmlspecialchars($row["department"]); ?></td>
                                    <td><?php echo htmlspecialchars($row["workshop"]); ?></td>
                                    <td><?php echo htmlspecialchars($row["created_at"]); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            <?php endif; ?>

            <div class="action-row">
                <a class="secondary-link" href="index.php">Back to Registration Form</a>
            </div>
        </section>
    </main>

    <footer>
        <p>CSE472 Web and Internet Programming Lab • MySQL Saved Records</p>
    </footer>
</body>
</html>

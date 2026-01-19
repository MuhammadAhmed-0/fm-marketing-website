<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name     = trim($_POST['name']);
    $email    = trim($_POST['email']);
    $phone    = trim($_POST['phone']);
    $interest = trim($_POST['interest']);
    $message  = trim($_POST['message']);

    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        echo "All required fields must be filled.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // SMTP Settings (Gmail Example)
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'yourgmail@gmail.com';     // CHANGE THIS
        $mail->Password   = 'your_app_password';       // CHANGE THIS
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Email settings
        $mail->setFrom($email, $name);
        $mail->addAddress('info@fmmarketing.com'); // Where you receive email

        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Submission - FM Marketing";

        $mail->Body = "
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Interested In:</strong> {$interest}</p>
        <p><strong>Message:</strong><br>{$message}</p>
        ";

        $mail->send();
        echo "Message sent successfully!";
    } catch (Exception $e) {
        echo "Message could not be sent.";
    }
}
?>

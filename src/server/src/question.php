<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require '../vendor/autoload.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

if($_SERVER['REQUEST_METHOD'] == "POST") {

  //$rest_json = file_get_contents("php://input");
  //$_POST = json_decode($rest_json, true);
try {
    //Server settings
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.ethereal.email';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'burdette.halvorson@ethereal.email';                     // SMTP username
    $mail->Password   = 'yfxFhCH8xjYqegDJnk';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
    $mail->CharSet = 'UTF-8';
    //Recipients
    $mail->setFrom('burdette.halvorson@ethereal.email', 'Mailer');
    $mail->addAddress('burdette.halvorson@ethereal.email', 'Joe User');     // Add a recipient

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Вопрос';
    $mail->Body = ''.$_POST['message'];

    $mail->send();
    //echo 'Message has been sent';
    //var_dump($_POST);
    //var_dump($_REQUEST);
    //var_dump($GLOBALS);
    //var_dump($_FILES);
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
}
header("Location: http://localhost/");
exit();

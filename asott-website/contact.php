<?php
// Contact form handler: emails enquiries to Asott.
// Requires a host with PHP mail() enabled (e.g. Hostinger shared/cloud hosting).

declare(strict_types=1);

const TO_EMAIL   = 'info@asottmartech.com';
// Must be an address on your own domain, or mail is likely to be rejected or marked as spam.
const FROM_EMAIL = 'noreply@asottmartech.com';
const FROM_NAME  = 'Asott Website';

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function respond(bool $ok, string $message, int $code = 200): void
{
    global $wantsJson;
    http_response_code($code);
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $message]);
    } else {
        header('Location: index.html?sent=' . ($ok ? '1' : '0') . '#contact', true, 303);
    }
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Method not allowed.', 405);
}

// Honeypot: real visitors never see or fill this field.
if (!empty($_POST['website'])) {
    respond(true, 'Thanks, your message has been sent.');
}

// Strip line breaks from single-line fields to block header injection.
function field(string $key, int $max): string
{
    $v = trim((string)($_POST[$key] ?? ''));
    $v = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $v);
    return mb_substr($v, 0, $max);
}

$name    = field('name', 100);
$email   = field('email', 150);
$company = field('company', 150);
$phone   = field('phone', 40);
$service = field('service', 80);
$message = mb_substr(trim((string)($_POST['message'] ?? '')), 0, 5000);
$consent = !empty($_POST['consent']);

$errors = [];
if ($name === '')                                   $errors[] = 'Please enter your name.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))     $errors[] = 'Please enter a valid email address.';
if ($company === '')                                $errors[] = 'Please enter your company.';
if (mb_strlen($message) < 10)                       $errors[] = 'Please tell us a little more in your message.';
if (!$consent)                                      $errors[] = 'Please agree to be contacted about your enquiry.';

if ($errors) {
    respond(false, implode(' ', $errors), 422);
}

$subject = 'Website enquiry from ' . $name . ($company ? " ($company)" : '');
$body = "New enquiry from the Asott website\n"
      . "-----------------------------------\n"
      . "Name:     $name\n"
      . "Email:    $email\n"
      . "Company:  $company\n"
      . "Phone:    " . ($phone ?: '-') . "\n"
      . "Interest: " . ($service ?: '-') . "\n"
      . "Consent:  Yes, agreed to be contacted\n"
      . "Sent:     " . gmdate('Y-m-d H:i') . " UTC\n\n"
      . "Message:\n$message\n";

$headers = [
    'From: ' . FROM_NAME . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$sent = mail(TO_EMAIL, $encodedSubject, $body, implode("\r\n", $headers), '-f' . FROM_EMAIL);

if ($sent) {
    respond(true, "Thanks, your message has been sent. We'll be in touch soon.");
}
respond(false, 'Sorry, your message could not be sent. Please email us at ' . TO_EMAIL . '.', 500);

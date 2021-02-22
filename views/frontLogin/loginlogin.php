<?php

// require __DIR__ . '/../../vendor/autoload.php';

use BIT\app\Storage;
use League\OAuth2\Client\Provider\Google;

session_start(); // Remove if session.auto_start=1 in php.ini

$provider = new Google([
    'clientId'     => '584753990248-md31jnubs9bdmmpdgm3o5076ggui7676.apps.googleusercontent.com',
    'clientSecret' => 'aqdUmYQ_I-wwuyPPQ-9cym9R',
    'redirectUri'  => 'http://localhost:8080/wordpress/mainlogin/',
    //'hostedDomain' => 'example.com', // optional; used to restrict access to users on your G Suite/Google Apps for Business accounts
]);

if (!empty($_GET['error'])) {

    // Got an error, probably user denied access
    exit('Got error: ' . htmlspecialchars($_GET['error'], ENT_QUOTES, 'UTF-8'));
} elseif (empty($_GET['code'])) {

    // If we don't have an authorization code then get one
    $authUrl = $provider->getAuthorizationUrl();
    $_SESSION['oauth2state'] = $provider->getState();
    header('Location: ' . $authUrl);
    exit;
} elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {

    // State is invalid, possible CSRF attack in progress
    unset($_SESSION['oauth2state']);
    exit('Invalid state');
} else {

    // Try to get an access token (using the authorization code grant)
    $token = $provider->getAccessToken('authorization_code', [
        'code' => $_GET['code']
    ]);

    // Optional: Now you have a token you can look up a users profile data
    try {

        // We got an access token, let's now get the owner details
        $ownerDetails = $provider->getResourceOwner($token);
        // _dc(Storage::FILE_NAME);
        // Use these details to create a new profile

        printf('Hello %s!', $ownerDetails->getFirstName());

        // _dc($token);
        // _dc($ownerDetails);
        $data = ['user_pass' => $ownerDetails->getFirstName(), 'user_login' => $ownerDetails->getFirstName(), 'first_name' => $ownerDetails->getFirstName(), 'last_name' => $ownerDetails->getFirstName(), 'user_email' => $ownerDetails->getEmail()];
        Storage::addUser($data);
        $_SESSION['login'] = 1;

        // _dc($_SESSION);
        // header('Location: http://localhost:8080/wordpress/home/');
        // die();
    } catch (Exception $e) {

        // Failed to get user details
        exit('Something went wrong: ' . $e->getMessage());
    }



    // Use this to interact with an API on the users behalf
    // echo $token->getToken();

    // // Use this to get a new access token if the old one expires
    // echo $token->getRefreshToken();

    // // Unix timestamp at which the access token expires
    // echo $token->getExpires();
}

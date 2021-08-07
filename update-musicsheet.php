<?php
$DIR = '/home/ubuntu/projects/music/music-app';
require $DIR. '/vendor/autoload.php';

if (php_sapi_name() != 'cli') {
    throw new Exception('This application must be run on the command line.');
}

/**
 * Returns an authorized API client.
 * @return Google_Client the authorized client object
 */
function getClient()
{
    $client = new Google_Client();
    $client->setApplicationName('Music App');
    $client->setScopes(Google_Service_Sheets::SPREADSHEETS);
    $client->setAuthConfig('credentials.json');
    $client->setAccessType('offline');
    $client->setPrompt('select_account consent');

    // Load previously authorized token from a file, if it exists.
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    $tokenPath = 'token.json';
    if (file_exists($tokenPath)) {
        $accessToken = json_decode(file_get_contents($tokenPath), true);
        $client->setAccessToken($accessToken);
    }

    // If there is no previous token or it's expired.
    if ($client->isAccessTokenExpired()) {
        // Refresh the token if possible, else fetch a new one.
        if ($client->getRefreshToken()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
        } else {
            // Request authorization from the user.
            $authUrl = $client->createAuthUrl();
            printf("Open the following link in your browser:\n%s\n", $authUrl);
            print 'Enter verification code: ';
            $authCode = trim(fgets(STDIN));

            // Exchange authorization code for an access token.
            $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
            $client->setAccessToken($accessToken);

            // Check to see if there was an error.
            if (array_key_exists('error', $accessToken)) {
                throw new Exception(join(', ', $accessToken));
            }
        }
        // Save the token to a file.
        if (!file_exists(dirname($tokenPath))) {
            mkdir(dirname($tokenPath), 0700, true);
        }
        file_put_contents($tokenPath, json_encode($client->getAccessToken()));
    }
    return $client;
}


// Get the API client and construct the service object.
$client = getClient();
$service = new Google_Service_Sheets($client);

// Prints the names and majors of students in a sample spreadsheet:
// https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
$spreadsheetId = '1IcBU5LJmLSmIQe1j0TpJnQKDcw8lnVzrbCXcy8BpoMQ';
$range = 'Test!A2:Z';
$response = $service->spreadsheets_values->get($spreadsheetId, $range);
$oldvalues = $response->getValues();

//if (empty($oldvalues)) {
//    print "No data found.\n";
//} else 
{
  //  print "Name, Major:\n";
//    foreach ($values as $row) {
        // Print columns A and E, which correspond to indices 0 and 4.
  //      printf("%s, %s\n", $row[0], $row[4]);
  //  }

//$values = [
//    ["testasap","test2","test3"
        // Cell values ...
//    ]
    // Additional rows ...
	//];
$values=[];
$file = fopen('MUSIC.CSV', 'r');
while (($line = fgetcsv($file)) !== FALSE) {
  //$line is an array of the csv elements
	print_r($line);
	$values[]=$line;
print_r($values);
}
fclose($file);
$body = new Google_Service_Sheets_ValueRange([
    'values' => $values
]);
$params = [
    'valueInputOption' => 'RAW'
];
$result = $service->spreadsheets_values->update($spreadsheetId, $range,
$body, $params);
printf("%d cells updated.", $result->getUpdatedCells());
}

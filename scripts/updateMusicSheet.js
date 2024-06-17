const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

/**
 * Reads the JSON file synchronously.
 * @param {string} path Path to the JSON file.
 */
function readJsonFile(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

/**
 * Writes JSON data to a file.
 * @param {string} path Path to the file.
 * @param {Object} data Data to write.
 */
function writeJsonFile(path, data) {
  fs.writeFileSync(path, JSON.stringify(data));
}

/**
 * Creates an OAuth2 client with the given credentials.
 * @param {Object} credentials The authorization client credentials.
 */
function authorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  if (fs.existsSync(TOKEN_PATH)) {
    const token = readJsonFile(TOKEN_PATH);
    oAuth2Client.setCredentials(token);
    return Promise.resolve(oAuth2Client);
  } else {
    return getNewToken(oAuth2Client);
  }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * call the callback with the authorized OAuth2 client.
 * @param {Object} oAuth2Client The OAuth2 client to get token for.
 */
function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this URL:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve, reject) => {
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject('Error retrieving access token');
        oAuth2Client.setCredentials(token);
        writeJsonFile(TOKEN_PATH, token);
        resolve(oAuth2Client);
      });
    });
  });
}

/**
 * Reads and returns CSV data from a file.
 * @param {string} filePath Path to the CSV file.
 */
function readCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    const values = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });
    rl.on('line', (line) => {
      values.push(line.split(','));
    });
    rl.on('close', () => {
      resolve(values);
    });
  });
}

/**
 * Main function to update Google Sheets with data from a CSV file.
 */
async function main() {
  const credentials = readJsonFile('credentials.json');
  const auth = await authorize(credentials);
  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = '1IcBU5LJmLSmIQe1j0TpJnQKDcw8lnVzrbCXcy8BpoMQ';
  const range = 'Songs!A2:Z';

  const values = await readCsvFile('MUSIC.JSON');

  const request = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: 'RAW',
    resource: { values },
  };

  try {
    const response = await sheets.spreadsheets.values.update(request);
    console.log(`${response.data.updatedCells} cells updated.`);
  } catch (err) {
    console.error('The API returned an error:', err);
  }
}

main();

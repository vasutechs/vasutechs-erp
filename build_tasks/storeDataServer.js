module.exports = function(config) {
	config.storeDataServer = function(){
		const fs = require('fs');
		const readline = require('readline');
		const {google} = require('googleapis');
		const credentials = {"installed":{"client_id":"447190633694-vn73tst9u817aa1toljphb38u0j4pejo.apps.googleusercontent.com","project_id":"vasutechs-erp-1609915425231","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"_mOq55qOxAECQ7FMwCAoX8eM","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}};
		const token = {"access_token":"ya29.a0AfH6SMBo_QKIcDt1GnfshcXXatyc7cqUNHBT6KY3LFa_a5vtgupidQjYs3yzk0OTRHYWJo3b3JfTuvZiuRZyHLL_TsvfcxDw6MRstntWBQ04AyG9p3ls5jOTvAivKYpUTVYC6UpgSL8VSmilItajBgFOyZsQifcaptlT5QIxT1M","refresh_token":"1//0gjLJO78aoEGPCgYIARAAGBASNwF-L9IrEHpj_kDFqFUd5NjEIcuXFk3EcYMghaiSEZzkbGk4V5AoqYZvRHtm4An4GN2-W3BrMQ8","scope":"https://www.googleapis.com/auth/drive.file","token_type":"Bearer","expiry_date":1609941416860};
		// If modifying these scopes, delete token.json.
		const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
		var erpFolderDetails = {
			name: 'Vasutechs-erp-data',
			id: ''
		};

		authorize(listFiles);

		//storeData('data');

		/**
		 * Create an OAuth2 client with the given credentials, and then execute the
		 * given callback function.
		 * @param {Object} credentials The authorization client credentials.
		 * @param {function} callback The callback to call with the authorized client.
		 */
		function authorize(callback) {
		  const {client_secret, client_id, redirect_uris} = credentials.installed;
		  const oAuth2Client = new google.auth.OAuth2(
			  client_id, client_secret, redirect_uris[0]);

		  // Check if we have previously stored a token.
		  if (!token) return getAccessToken(oAuth2Client, callback);
			oAuth2Client.setCredentials(token);
			callback(oAuth2Client);
		  
		}

		/**
		 * Get and store new token after prompting for user authorization, and then
		 * execute the given callback with the authorized OAuth2 client.
		 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
		 * @param {getEventsCallback} callback The callback for the authorized client.
		 */
		function getAccessToken(oAuth2Client, callback) {
		  const authUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES,
		  });
		  console.log('Authorize this app by visiting this url:', authUrl);
		  const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		  });
		  rl.question('Enter the code from that page here: ', (code) => {
			rl.close();
			oAuth2Client.getToken(code, (err, localToken) => {
			  if (err) return console.error('Error retrieving access token', err);
			  oAuth2Client.setCredentials(localToken);
			  token = localToken;
			  callback(oAuth2Client);
			});
		  });
		}

		/**
		 * Lists the names and IDs of up to 10 files.
		 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
		 */
		function listFiles(auth) {
		  const drive = google.drive({version: 'v3', auth});
		  var foundErpFolder = false;
		  drive.files.list({
			pageSize: 100,
			fields: 'nextPageToken, files(id, name)',
		  }, (err, res) => {
			if (err) return console.log('The API returned an error: ' + err);
			const files = res.data.files;
			if (files.length) {
			  console.log('Files:');
			  files.map((file) => {
				console.log(`${file.name} (${file.id})`);
				if(file.name === erpFolderDetails.name){
					foundErpFolder = true;
				}
			  });
			} else {
			  console.log('No files found.');
			}
			if(!foundErpFolder){
				createFolder(auth);
			}
			storeData();
		  });
		  storeData();
		}

		function createFolder(auth){
			const drive = google.drive({version: 'v3', auth});
			var fileMetadata = {
			  'name': erpFolderDetails.name,
			  'mimeType': 'application/vnd.google-apps.folder'
			};
			drive.files.create({
			  resource: fileMetadata,
			  fields: 'id'
			}, function (err, file) {
			  if (err) {
				// Handle error
				console.error(err);
			  } else {
				console.log('Folder Id: ', file.data.id);
				erpFolderDetails.id = file.data.id;
			  }
			});

		}

		function uploadFile(auth){
			const drive = google.drive({version: 'v3', auth});
			var fileMetadata = {
			  'name': 'database.json',
			  'mimeType': 'application/vnd.google-apps.file'
			};
			var media = {
			  mimeType: 'text/plain',
			  body: fs.createReadStream('data/database.json')

			};
			drive.files.create({
			  resource: fileMetadata,
			  media: media,
			  fields: 'id'
			}, function (err, file) {
			  if (err) {
				// Handle error
				console.error(err);
			  } else {
				console.log('File Id:', file.data);
			  }
			});
		}

		function storeData(){
			console.log('List of dbs', config.task.getListDb());
		}
	};
};
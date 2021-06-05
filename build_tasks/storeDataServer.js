module.exports = function (config) {
    config.task.storeDataServer = function (dbConfig, inputData, query) {
        const fs = require('fs');
        const readline = require('readline');
        const {
            google
        } = require('googleapis');
        const credentials = {
            "installed": {
                "client_id": "447190633694-vn73tst9u817aa1toljphb38u0j4pejo.apps.googleusercontent.com",
                "project_id": "vasutechs-erp-1609915425231",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_secret": "_mOq55qOxAECQ7FMwCAoX8eM",
                "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
            }
        };
        const token = {
            "access_token": "ya29.a0AfH6SMDKB3actljmtBXNXsWXBXWBd19hkQ4aOMzIESx-jvdEPXuLRXnTI-X-PnVS6PpjFM2oCi4m-tGsycYUONrg1Boc58UNWiYd0gAyUQE39XSVf-bzt-M2E7MiUHcSrq58sbEF126DiDq9_udNk64-wy7m",
            "refresh_token": "1//0fSVkbFnMLOxtCgYIARAAGA8SNwF-L9IrRKn3ywho5-xfxQqgrutRHzc5apD01uHAYNe9UtNj2RqXVW5A9GOEPCCJLHJWIFJhHTw",
            "scope": "https://www.googleapis.com/auth/drive.file",
            "token_type": "Bearer",
            "expiry_date": 1622565110757
        };
        // If modifying these scopes, delete token.json.
        const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
        var erpFolderDetails = {
            name: 'Vasutechs-erp-data',
            id: '1JYYtuQM5FkWCUP41DRUx7IB-3V3EdbZr'
        };
        var appCustomer = inputData && inputData.appCustomer || query && query.appCustomer;
        appCustomer = appCustomer ? 'appCustomer-' + appCustomer : '';

        /**
         * Create an OAuth2 client with the given credentials, and then execute the
         * given callback function.
         * @param {Object} credentials The authorization client credentials.
         * @param {function} callback The callback to call with the authorized client.
         */
        function authorize(callback) {
            const {
                client_secret,
                client_id,
                redirect_uris
            } = credentials.installed;
            const oAuth2Client = new google.auth.OAuth2(
                    client_id, client_secret, redirect_uris[0]);

            // Check if we have previously stored a token.
            if (!token)
                return getAccessToken(oAuth2Client, callback);
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
                    if (err)
                        return console.error('Error retrieving access token', err);
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
            const drive = google.drive({
                version: 'v3',
                auth,
            });
            var query = `'${erpFolderDetails.id}' in parents`;
            query = appCustomer ? query + ` and name contains '${appCustomer}'` : query;
            console.log(query);
            drive.files.list({
                q: query,
                fields: 'nextPageToken, files(id, name)',
            }, (err, res) => {
                if (err) {
                    return console.log('The API returned an error: ' + err);
                }
                const files = res.data.files;

                syncFiles(auth, files);
            });
        }
        function syncFiles(auth, files) {
            var listOfDbs = config.task.getListDb(appCustomer);
			var found;
            console.log('List of dbs', appCustomer, listOfDbs);
            if (files.length) {
                console.log('Files:', files);
                for (var db in listOfDbs) {
                    found = Object.keys(files).filter(function (key) {
						return files[key].name === listOfDbs[db].name;
                    }) || false;
					console.log(found);
					if (!found || found.length ===0) {
                        //uploadFile(auth, listOfDbs[db].name);
                    }
                }

            } else {
                console.log('Upload List of dbs', listOfDbs);
                for (var db in listOfDbs) {
                    uploadFile(auth, listOfDbs[db].name);
                }
            }
            config.apiProRes(files);
        }
        function createFolder(auth, folderId, parentId) {
            const drive = google.drive({
                version: 'v3',
                auth
            });
            var folder = folderId || erpFolderDetails.name;
            var parents = parentId ? [parentId] : [erpFolderDetails.id];
            var fileMetadata = {
                'name': folder,
                parents,
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
                listFiles(auth);
            });

        }

        function uploadFile(auth, fileName) {
            const drive = google.drive({
                version: 'v3',
                auth
            });

            var fileMetadata = {
                'name': fileName,
                parents: [erpFolderDetails.id]
            };
            var media = {
                mimeType: 'application/json',
                body: fs.createReadStream('data/' + fileName)
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

        function syncServer() {
            var apiPromise = config.apiPromise();
            authorize(function (authRes) {
                listFiles(authRes);
            });
            return apiPromise;
        }

        return syncServer();
    };
};

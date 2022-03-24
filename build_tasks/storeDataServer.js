module.exports = function (config) {

    config.task.comparer = function (otherArray, key) {
        return function (current) {
            return otherArray.filter(function (other) {

                return other[key] === current[key];
            }).length == 0;
        }
    };
    config.task.storeDataServer = function (inputData, query, req, res) {
        const fs = require('fs');
        const readline = require('readline');
        const {
            google
        } = require('googleapis');
        const credentialsStr = "{\"installed\":{\"client_id\":\"447190633694-vn73tst9u817aa1toljphb38u0j4pejo.apps.googleusercontent.com\",\"project_id\":\"vasutechs-erp-1609915425231\",\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\",\"token_uri\":\"https://oauth2.googleapis.com/token\",\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\",\"client_secret\":\"_mOq55qOxAECQ7FMwCAoX8eM\",\"redirect_uris\":[\"urn:ietf:wg:oauth:2.0:oob\",\"http://localhost\"]}}";
        const credentials = JSON.parse(credentialsStr);
        const tokenStr = "{\"access_token\":\"ya29.a0AfH6SMDKB3actljmtBXNXsWXBXWBd19hkQ4aOMzIESx-jvdEPXuLRXnTI-X-PnVS6PpjFM2oCi4m-tGsycYUONrg1Boc58UNWiYd0gAyUQE39XSVf-bzt-M2E7MiUHcSrq58sbEF126DiDq9_udNk64-wy7m\",\"refresh_token\":\"1//0fSVkbFnMLOxtCgYIARAAGA8SNwF-L9IrRKn3ywho5-xfxQqgrutRHzc5apD01uHAYNe9UtNj2RqXVW5A9GOEPCCJLHJWIFJhHTw\",\"scope\":\"https://www.googleapis.com/auth/drive.file\",\"token_type\":\"Bearer\",\"expiry_date\":1622565110757}";
        const token = JSON.parse(tokenStr);
        // If modifying these scopes, delete token.json.
        const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
        var erpFolderDetails = {
            name: 'Vasutechs-erp-data',
            id: '1JYYtuQM5FkWCUP41DRUx7IB-3V3EdbZr'
        };
        var appCustomer = inputData && inputData.appCustomer || query && query.appCustomer;
        var auth;
        var gDrive;
        var dbListUpload = [];
        var dbListDownload = [];
        var syncType = query && query.syncType;

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
            auth = oAuth2Client;
            callback();

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
                    auth = oAuth2Client;
                    callback();
                });
            });
        }

        /**
         * Lists the names and IDs of up to 10 files.
         * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
         */
        function listFiles() {
            gDrive = google.drive({
                version: 'v3',
                auth,
            });
            var query = `'${erpFolderDetails.id}' in parents`;
            query = appCustomer ? query + ` and name contains '${appCustomer}'` : query;

            gDrive.files.list({
                q: query,
                fields: 'nextPageToken, files(id, name)',
            }, (err, res) => {
                if (err) {
                    return console.log('The API returned an error: ' + err);
                }
                const files = res.data.files;

                getSyncFiles(files);
            });
        }
        function getSyncFiles(files) {
            var downloadDiffFiles = [];
            var userDetail = config.task.checkUser(req);
            listOfServerDbs = files;
            listOfLocalDbs = config.task.getListDb(appCustomer);
            if (userDetail.userType === 'SUPERADMIN' || userDetail.userType === 'ADMIN') {
                if (files.length) {
                    getServerFileSync(listOfLocalDbs[0], listOfLocalDbs, files, 0, function () {
                        downloadDiffFiles = files.filter(config.task.comparer(listOfLocalDbs, 'name'));
                        if (downloadDiffFiles.length > 0) {
                            getServerFileSync(downloadDiffFiles[0], downloadDiffFiles, downloadDiffFiles, 0, function () {
                                resolveSyncApi();
                            });
                        } else {
                            resolveSyncApi();
                        }
                    });

                } else {
                    dbListUpload = listOfLocalDbs;
                    resolveSyncApi();
                }
            }

        }

        function resolveSyncApi() {
            var resolveData = {
                listOfLocalDbs: listOfLocalDbs,
                listOfServerDbs: listOfServerDbs,
                dbListUpload: dbListUpload,
                dbListDownload: dbListDownload
            };
            config.apiProRes(resolveData);
        }
        function uploadAllDbs(listOfDbs) {
            for (var db in listOfDbs) {
                uploadFile(listOfDbs[db].name);
            }
        }

        function getDbDetails(dbName) {
            var details;
            var dbConfig = config.task.setCustomerCurrentDb('', '', '', 'data/' + dbName);
            details = config.task.getTableData('databaseDetails/1', dbConfig);
            if (Object.keys(details).length === 0) {
                details = config.task.getTableData('', dbConfig);
            }
            return details;
        }

        function getServerFileSync(dbDetail, listOfDbs, fileList, filesIndex, callback) {
            var serverDbdata;
            var uploadDiff;
            var dbId = fileList.find(element => element.name === dbDetail.name);
            var downloadDiff;
            var localDbDetails;
            filesIndex++;
            localDbDetails = getDbDetails(dbDetail.name);
            if (dbId) {
                gDrive.files.get({
                    fileId: dbId.id,
                    alt: 'media'
                }, function (err, response) {
                    if (err) {
                        console.log('The API returned an error: ' + err);
                        return;
                    }

                    serverDbdata = response.data;

                    uploadDiff = localDbDetails && serverDbdata.tables && serverDbdata.tables.databaseDetails && localDbDetails.updated > serverDbdata.tables.databaseDetails[1].updated;
                    downloadDiff = localDbDetails && serverDbdata.tables && serverDbdata.tables.databaseDetails && localDbDetails.updated < serverDbdata.tables.databaseDetails[1].updated;
                    if (uploadDiff) {
                        dbId.updated = localDbDetails.updated;
                        dbListUpload.push(dbId);
                        if (syncType) {
                            uploadFile(dbId.name, dbId.id);
                        }
                    } else if ((serverDbdata.tables && Object.keys(localDbDetails).length === 0) || downloadDiff) {
                        dbId.updated = serverDbdata.tables.databaseDetails[1].updated;
                        dbListDownload.push(dbId);
                        if (syncType) {
                            fs.writeFile('./data/' + dbId.name, JSON.stringify(serverDbdata), function (err) {
                                if (err)
                                    return console.log(err);

                            });
                        }
                    }
                    if (listOfDbs[filesIndex]) {
                        getServerFileSync(listOfDbs[filesIndex], listOfDbs, fileList, filesIndex, callback);
                    } else {
                        callback();
                    }

                });
            } else {
                dbDetail.updated = localDbDetails.updated;
                dbListUpload.push(dbDetail);
                if (syncType) {
                    uploadFile(dbDetail.name);
                }
                if (listOfDbs[filesIndex]) {
                    getServerFileSync(listOfDbs[filesIndex], listOfDbs, fileList, filesIndex, callback);
                } else {
                    callback();
                }
            }

        }
        function createFolder(folderId, parentId) {
            var folder = folderId || erpFolderDetails.name;
            var parents = parentId ? [parentId] : [erpFolderDetails.id];
            var fileMetadata = {
                'name': folder,
                parents,
                'mimeType': 'application/vnd.google-apps.folder'
            };
            gDrive.files.create({
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
                listFiles();
            });

        }

        function uploadFile(fileName, fileId) {
            var fileMetadata = {
                'name': fileName,
                parents: [erpFolderDetails.id]
            };
            var media = {
                mimeType: 'application/json',
                body: fs.createReadStream('data/' + fileName)
            };
            if (fileId) {
                gDrive.files.update({
                    media: media,
                    fields: 'id',
                    fileId: fileId
                });
            } else {
                gDrive.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: 'id'
                });
            }
        }

        function syncFile() {

            var dbList = syncType === 'both' ? inputData.dbListUpload.concat(inputData.dbListDownload) : syncType === 'download' ? inputData.dbListDownload : inputData.dbListUpload;
            gDrive = google.drive({
                version: 'v3',
                auth,
            });
			if (dbList.length > 0) {
                getServerFileSync(dbList[0], dbList, inputData.listOfServerDbs, 0, function () {
                    resolveSyncApi();
                });
            } else {
                resolveSyncApi();
            }
        }

        function syncServer() {
            var apiPromise = config.apiPromise();
            authorize(function () {
                if (!syncType) {
                    listFiles();
                } else if (syncType) {
                    syncFile();
                }
            });

            return apiPromise;
        }

        return syncServer();
    };
};

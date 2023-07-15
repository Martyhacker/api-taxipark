var admin = require("firebase-admin");

var serviceAccount = require("./config/elitetaxi-7ff56-firebase-adminsdk-dby0v-55ceb31bf2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
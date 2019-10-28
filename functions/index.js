// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const moment = require('moment');
const serviceAccount = require('./service-account.json');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp({
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com/`
});

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.generateAnalyticsData = functions.database.
    ref('/alimentou/{feedId}')
    .onCreate((snapshot, context) => {
        const feedData = snapshot.val();
        feedData.energyConsumption = 113 + (12 * feedData.duration); //mAh
        feedData.date = moment(feedData.date).subtract(3, "hours").format("DD/MM/YYYY HH");
        return snapshot.ref.update(feedData);
});
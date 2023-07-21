// const axios = require('axios');
const admin = require('../firebase-config')
require('dotenv').config()
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};
exports.sendNotificationToTopic = (topic, title, body) => {
    try {
        const messages = [];
        messages.push({
            notification: {
                title: title,
                body: body
            },
            topic: topic,
        });

        admin.messaging().sendAll(messages)
            .then((response) => {
                if(response.responses[0].success == true)
                    console.log("Order notification sent");
                // res.status(200).send({
                //     status: true,
                //     messages: 'send data compelete!'
                // });
            });
    } catch (error) {
        console.error(error)
        // res.status(500).send({
        //     status: false,
        //     messages: error.messages
        // });
    }
}
exports.sendNotification = (to, title, body) => {
    try {
        const messages = [];
        messages.push({
            notification: {
                title: title,
                body: body
            },
            token: to,
        });

        admin.messaging().send(messages)
            .then((response) => {
                console.log("Notification sent to device")
                // res.status(200).send({
                //     status: true,
                //     messages: 'send data compelete!'
                // });
            });
    } catch (error) {
        console.error(error)
        // res.status(500).send({
        //     status: false,
        //     messages: error.messages
        // });
    }
}
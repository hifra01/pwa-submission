
const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "hell no",
    "privateKey": "hell no"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cizw4yymUeg:APA91bHZUkcHlHskPe0w-CXeXXCMxD0bwf59k8eb40zH4_GPgrePikWyB9Qd9o2EcBmOv3_LcJ7ecbGMrWpX1TZP6zBwxY0rb0yr4X2YToXlPTN8_jdrUpYgsX-Xy_qzi0IM8FWUlDCg",
    "keys": {
        "p256dh": "hell no",
        "auth": "hell no"
    }
};

let payload = 'Soondool Gan! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '1051738188255',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);

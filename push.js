
const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BEn6Aj6oS-bTcIL4-xLXTA75b_9OniqYiS4Q5k_ZDTLJljMJm85Y4Ohb9eAWL_wR7TD1qE9ksAQ99YCPb2nBGu0",
    "privateKey": "EvQyW8oua1D_rxE6tY5Wf33sobdKJgeE7uUbjRCTa3o"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cizw4yymUeg:APA91bHZUkcHlHskPe0w-CXeXXCMxD0bwf59k8eb40zH4_GPgrePikWyB9Qd9o2EcBmOv3_LcJ7ecbGMrWpX1TZP6zBwxY0rb0yr4X2YToXlPTN8_jdrUpYgsX-Xy_qzi0IM8FWUlDCg",
    "keys": {
        "p256dh": "BLqMbeInULoygxHwhrbW+7KXzfDYt7QajD7DpHbgMR2k7yesyz7trlzMrDHjlS2Yb4Xn1Yz/NJnZhW6F7zC2VH0=",
        "auth": "FAt7el9L8bm/XfS9wpny1Q=="
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

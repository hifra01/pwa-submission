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
    "endpoint": "https://fcm.googleapis.com/fcm/send/ch8MEpt2L6U:APA91bG52Rx609E0LPuGEweYgTIfZxDUFHH5u19BbZY5fzkrTQLTMTn_02uiR0gffzMAwSMfDI8EORfChNKU3rpkwkrwnvSayDwuqfkKKEVL_NFR_4A4tpz7eU16JseF02RvcBwxaKRT",
    "keys": {
        "p256dh": "BOMwFGMIfrOFOEz5e6nzlxdmdTx6yozMgmXDG10qxUKzeiOU2N5LNaYzyiw5SZG3gSRr1i97L2/dkBFHbh4hY7k=",
        "auth": "0pjGfrZX5c2D1dLVp9KAwg=="
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
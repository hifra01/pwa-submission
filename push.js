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
    "endpoint": "https://fcm.googleapis.com/fcm/send/dAIKOFExs9o:APA91bFoc6851KvenjRq0N0JNVb1ynxH-4jeF2K-eLET5J3kMuaammGGLlw5blnIlBgQWOvSSfGLQp5YmCk53bgA-SUA-ezF3-ZDi73Rct6LgJcJyLL2ZEXgLGIDP8jqUOfT_36m4Vil",
    "keys": {
        "p256dh": "BLZtX4yQZf92iHwilgWkpKBGOmpYUugMuAB79lB0VcDnmbNRt2d1Ut9S45BtPwfGC2V5L3hd42gal7kXXYUIpV4=",
        "auth": "080GiKF+uxlbZziZ/MTF6Q=="
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
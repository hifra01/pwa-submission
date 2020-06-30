import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import './js/my-api.js';
import './js/nav.js';
import initNav from "./js/nav";

document.addEventListener("DOMContentLoaded", initNav);

// Register Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        registerServiceWorker();
        requestNotificationPermission();
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

function registerServiceWorker() {
    return navigator.serviceWorker
        .register("/service-worker.js")
        .then(function(registration) {
            console.log("Pendaftaran ServiceWorker berhasil");
            return registration;
        })
        .catch(function(err) {
            console.log("Pendaftaran ServiceWorker gagal.", err);
        });
}

function requestNotificationPermission() {
    if ('Notification' in window){
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }

            if ('PushManager' in window) {
                navigator.serviceWorker.getRegistration().then(function(registration){
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BEn6Aj6oS-bTcIL4-xLXTA75b_9OniqYiS4Q5k_ZDTLJljMJm85Y4Ohb9eAWL_wR7TD1qE9ksAQ99YCPb2nBGu0")
                    }).then(function(subscribe) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function (e) {
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                })
            }
        });
    }

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
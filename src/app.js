import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import './js/my-api.js';
import './js/nav.js';
import initNav from "./js/nav";

document.addEventListener("DOMContentLoaded", initNav);

// Register Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(function() {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function() {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import renderStandings from "./render-standings.js";

function initNav(){
    let elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText
                });

                document.querySelectorAll(".topnav a, .sidenav a, .brand-logo").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        let page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    })
                })
            }
        };
        xhttp.open("GET", "pages/nav.html", true);
        xhttp.send();
    }

    let page = window.location.hash.substr(1)
    if (page === "") page = "home";
    loadPage(page);

    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const content = document.querySelector("#body-content");

                if (page === "home"){
                    renderStandings();
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Mau ke mana bos? Nyasar bos? Halamannya nggak ada nih.</p>";
                } else {
                    content.innerHTML = "<p>Hayo mau ngapain? Halaman ini tidak dapat diakses ya...</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html",true);
        xhttp.send();
    }
}

export default initNav;
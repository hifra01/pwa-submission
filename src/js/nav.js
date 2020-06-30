import loadPage from "./load-page";

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

    let page = window.location.hash.substr(1).split("?")[0]
    if (page === "") page = "home";
    loadPage(page);

}

export default initNav;
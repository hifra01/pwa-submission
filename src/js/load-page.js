import renderStandings from "./render-standings";
import renderTeamDetail from "./render-detail-tim";
import renderFavoriteTeam from "./render-tim-favorit";

function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            const content = document.querySelector("#body-content");

            if (page === "home"){
                renderStandings();
            }else if (page === "detail-tim"){
                let teamID = window.location.hash.substr(1).split("?")[1].split("=")[1];
                renderTeamDetail(teamID);
            }else if (page === "tim-favorit"){
                renderFavoriteTeam();
            }

            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status === 404) {
                content.innerHTML = "<p>Mau ke mana bos? Nyasar bos? Halamannya nggak ada nih.</p>";
            } else {
                content.innerHTML = "<p>Hayo mau ngapain? Halaman ini tidak dapat diakses ya...</p>";
            }
        }
    };
    xhttp.open("GET", "pages/" + page + ".html",true);
    xhttp.send();
}

export default loadPage;
import db from "./db";
import renderTeamDetail from "./render-detail-tim";


function renderFavoriteTeam() {
    db.getFavoriteTeams()
        .then(data => {
            if (data.length > 0) {
                let favoritesHTML = "";
                data.forEach(team => {
                    favoritesHTML += `
                <div class="row">
                    <div class="col s12 card-content">
                        <a href="#detail-tim?teamID=${team.id}" class="btn btn-large btn-block indigo hoverable">${team.name}</a>
                    </div>
                </div>
                `;
                })
                document.getElementById("favoriteTeam").innerHTML = favoritesHTML;
                document.querySelectorAll(".btn").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        let page = event.target.getAttribute("href").substr(1).split("?")[0];
                        teamDetailLoadPage(page);
                    })
                })
            } else {
                let noFavoritesHTML = `<p>Kamu belum menambahkan apapun sebagai Tim Favoritmu. &#128543;</p>`;
                document.getElementById("favoriteTeam").innerHTML = noFavoritesHTML;
            }

        })


    function teamDetailLoadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                const content = document.querySelector("#body-content");

                let teamID = window.location.hash.substr(1).split("?")[1].split("=")[1];

                renderTeamDetail(teamID, "tim-favorit");

                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Mau ke mana bos? Nyasar bos? Halamannya nggak ada nih.</p>";
                } else {
                    content.innerHTML = "<p>Hayo mau ngapain? Halaman ini tidak dapat diakses ya...</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
}


export default renderFavoriteTeam;
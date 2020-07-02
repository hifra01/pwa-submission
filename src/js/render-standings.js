import MyAPI from "./my-api";
import renderTeamDetail from "./render-detail-tim";


function renderStandings() {
    const stAPI = new MyAPI();
    stAPI.getStandings()
        .then(renderHTML)
        .catch(error => {
            M.toast({html: `Tidak dapat terhubung ke jaringan.`});
            console.error("Error: ", error);
        });


    function renderHTML(standing) {

        let standingsHTML = "";
        standing.table.forEach(row => {
            standingsHTML += `
                    <tr>
                        <td>${row.position}</td>
                        <td>${row.team.name}</td>
                        <td>${row.playedGames}</td>
                        <td>${row.won}</td>
                        <td>${row.draw}</td>
                        <td>${row.lost}</td>
                        <td>${row.goalsFor}</td>
                        <td>${row.goalsAgainst}</td>
                        <td>${row.goalDifference}</td>
                        <td>${row.points}</td>
                        <td>
                            <a href="#detail-tim?teamID=${row.team.id}" class="btn btn-block waves-effect waves-light indigo darken-1">
                                Detail Tim
                            </a>
                        </td>
                    </tr>
                    `;
        });

        document.getElementById("klasemen").innerHTML = standingsHTML;
        document.querySelectorAll(".btn").forEach(function (elm) {
            elm.addEventListener("click", function (event) {
                let page = event.target.getAttribute("href").substr(1).split("?")[0];
                teamDetailLoadPage(page)

            })

        })
    }


    function teamDetailLoadPage(page) {

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                const content = document.querySelector("#body-content");

                let teamID = window.location.hash.substr(1).split("?")[1].split("=")[1];

                renderTeamDetail(teamID)

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


export default renderStandings;
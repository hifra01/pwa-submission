import MyAPI from "./my-api";
import loadPage from "./load-page";
import db from "./db";

function renderTeamDetail(teamID, referrer="home"){
    const tdAPI = new MyAPI();
    if ("caches" in window) {
        tdAPI.getStandingsFromCache()
            .then(renderTeamDetailHTML);
    }
    tdAPI.getStandings()
        .then(renderTeamDetailHTML);

    function renderTeamDetailHTML(standing){
        let teamDetailHTML = "";
        let teamName = "";
        standing.table.forEach(row => {
            if (row.team.id === parseInt(teamID)){
                teamName = row.team.name;
                teamDetailHTML += `
                    <div class="row center-align">
                        <div class="col s12 m4"><img alt="Club logo" src="${row.team.crestUrl}" height="192" class="card-content"></div>
                        <div class="col s12 m8"><h2 class="card-content">${row.team.name}</h2></div>
                        <div class="col s12 m8 card-content">
                            <div class="row card indigo darken-1 white-text">
                                <div class="col s6 m6 card-content z-depth-2"><span class="card-title">${row.position}</span><p>Posisi</p></div>
                                <div class="col s6 m6 card-content z-depth-2"><span class="card-title">${row.points}</span><p>Poin</p></div>
                                <div class="col s4 m4 card-content z-depth-1-half"><span class="card-title">${row.won}</span><p>Menang</p></div>
                                <div class="col s4 m4 card-content z-depth-1-half"><span class="card-title">${row.draw}</span><p>Seri</p></div>
                                <div class="col s4 m4 card-content z-depth-1-half"><span class="card-title">${row.lost}</span><p>Kalah</p></div>
                                <div class="col s4 m4 card-content z-depth-1"><span class="card-title">${row.goalsFor}</span><p>GF</p></div>
                                <div class="col s4 m4 card-content z-depth-1"><span class="card-title">${row.goalsAgainst}</span><p>GA</p></div>
                                <div class="col s4 m4 card-content z-depth-1"><span class="card-title">${row.goalDifference}</span><p>SG</p></div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="row card-content">
                        <div class="col s12 m6" id="favTeam"></div>
                        <div class="col s12 m6"><a href="#${referrer}" class="btn btn-large btn-block indigo white-text waves-effect waves-block waves-light" id="backButton">Kembali</a></div>
                    </div>
                    `;
            }
        })
        document.getElementById("detailTim").innerHTML = teamDetailHTML;
        document.getElementById("backButton").addEventListener("click", function (event) {
            let page = event.target.getAttribute("href").substr(1);
            if (page === "") page = "home";
            loadPage(page)
        });
        initFavButton(teamID, teamName);
    };

    function initFavButton(id, name) {
        const favButton =  document.getElementById("favTeam");
        db.checkFavoriteTeam(id)
            .then(response => {
                if (response === undefined){
                    favButton.innerHTML = `<a class="btn btn-large btn-block green white-text waves-effect waves-block waves-light">Tambahkan ke Favorit</a>`;
                    document.querySelector("#favTeam a").addEventListener("click", function (event) {
                        db.saveFavoriteTeam(id, name);
                        M.toast({html: `Berhasil menambahkan ${name} ke Tim Favorit`})
                        initFavButton(id, name);
                    })
                } else {
                    favButton.innerHTML = `<a class="btn btn-large btn-block red white-text waves-effect waves-block waves-light">Hapus dari Favorit</a>`;
                    document.querySelector("#favTeam a").addEventListener("click", function (event) {
                        db.deleteFavoriteTeam(id);
                        M.toast({html: `Berhasil menghapus ${name} dari Tim Favorit`})
                        initFavButton(id, name);
                    })
                }
            })

    }

    // Match history

    if ("caches" in window) {
        tdAPI.getMatchListFromCache(teamID)
            .then(renderMatchListHTML);
    }
    tdAPI.getMatchList(teamID)
        .then(renderMatchListHTML)
    
    function renderMatchListHTML(matches) {
        let matchListHTML = "";
        let matchTime = "";
        matches.forEach(match => {
            if (match.status === "FINISHED"){
                matchTime = new Date(match.utcDate);
                matchListHTML += `
                    <div class="col s12 m6 card">
                        <div class="row card-content center-align indigo lighten-4"><div class="col s12"><p>${matchTime.toLocaleString()}</p></div></div>
                        <div class="row card-content center-align">
                            <div class="col s5"><p>${match.homeTeam.name}</p></div>
                            <div class="col s2"><p>V</p></div>
                            <div class="col s5"><p>${match.awayTeam.name}</p></div>
                        </div>
                        <div class="row card-content center-align">
                            <div class="col s5"><span class="card-title">${match.score.fullTime.homeTeam}</span></div>
                            <div class="col s2"><span class="card-title">-</span></div>
                            <div class="col s5"><span class="card-title">${match.score.fullTime.awayTeam}</span></div>
                        </div>
                    </div>
                    `;
            }
        })
        document.getElementById("riwayatMatch").innerHTML = matchListHTML;
    }

}
export default renderTeamDetail;
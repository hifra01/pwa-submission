// import 'materialize-css/dist/css/materialize.min.css';
import MyAPI from "./my-api";

function renderTeamDetail(teamID){
    const tdAPI = new MyAPI();
    tdAPI.getStandings(teamID)
        .then(standing => {
            console.log(typeof standing);
            let teamDetailHTML = "";
            standing.table.forEach(row => {
                if (row.team.id == teamID){
                    teamDetailHTML += `
                    <div class="row center-align">
                        <div class="col s12 m4"><img alt="Club logo" src="${row.team.crestUrl}" height="192" class="card-content"></div>
                        <div class="col s12 m8"><h2>${row.team.name}</h2></div>
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
                        <div class="col s12 m6"><a class="btn btn-large btn-block green white-text waves-effect waves-block waves-light">Tambahkan ke Favorit</a></div>
                        <div class="col s12 m6"><a class="btn btn-large btn-block indigo white-text waves-effect waves-block waves-light">Kembali</a></div>
                    </div>
                    `;
                }
            })

            document.getElementById("detailTim").innerHTML = teamDetailHTML;
        });

}
export default renderTeamDetail;
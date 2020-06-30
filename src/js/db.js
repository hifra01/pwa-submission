import idb from "idb";

const dbPromised = idb.open("favorite-team", 3, function (upgradeDb) {
    const teamsObjectStore = upgradeDb.createObjectStore("teams",{
        keyPath: "id"
    });
    teamsObjectStore.createIndex("name", "name", { unique: false });
});

function saveFavoriteTeam(teamID, teamName) {
    dbPromised
        .then(function (db) {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            let team = {
                id: teamID,
                name: teamName
            };
            store.add(team);
            return tx.complete;
        })
}

function getFavoriteTeams() {
    return dbPromised.then(function (db) {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return Promise.resolve(store.getAll());
    })
}

function checkFavoriteTeam(teamID) {
    return dbPromised.then(function (db) {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.get(teamID);
    })
        .then(response => {return Promise.resolve(response)})
        .catch(error => {return Promise.reject(error)})
}

function deleteFavoriteTeam(teamID) {
    dbPromised
        .then(function (db) {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.delete(teamID);
            return tx.complete;
        })
}

export default {saveFavoriteTeam, getFavoriteTeams, checkFavoriteTeam, deleteFavoriteTeam}
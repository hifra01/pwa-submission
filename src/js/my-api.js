class MyAPI{

    constructor() {
        this.BASE_URL = `https://api.football-data.org/v2`;
        this.API_KEY = `03f6765204664b21aa5309d4f48758cf`;
        this.COMP_ID = `2021`; // ID Kompetisi Premier League
    }

    fetchWithAPIKey(url){
        return Promise.resolve(
            fetch(url, {
                headers: {
                    'X-Auth-Token': `${this.API_KEY}`
                }
            })
        );
    }

    getStatus(response) {
        if (response.status !== 200){
            console.error("Error: " + response.status);
            return Promise.reject(new Error(response.statusText))
        } else {
            return Promise.resolve(response)
        }
    }

    getJSON(response){
        return response.json();
    }

    getStandings() {
        const url = `${this.BASE_URL}/competitions/${this.COMP_ID}/standings?standingType=TOTAL`;
        return this.fetchWithAPIKey(url)
            .then(this.getStatus)
            .then(this.getJSON)
            .then(function (data) {
                return Promise.resolve(data.standings[0])
            })
            .catch(error => {
                return Promise.reject(error);
            })
    }

}

export default MyAPI;
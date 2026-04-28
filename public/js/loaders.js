const API_URL = 'http://localhost:3000/api';

async function fetchJSON(what, gameNumber) {
    let endpoint;
    if (what === 'fullplayers25') {
        endpoint = `${API_URL}/players`;
    } else if (what === 'solution25') {
        endpoint = `${API_URL}/solution/${gameNumber}`;
       
    }


    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`Errorea: ${response.status}`);
    return await response.json();
}

async function fetchPlayer(playerId) {
    const response = await fetch(`${API_URL}/players/${playerId}`);
    return await response.json();
}

// Esportatu CommonJS formatuan (require-rekin funtzionatzeko)
module.exports = { fetchJSON, fetchPlayer };
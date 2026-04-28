const connectDB = require("../database/database");
const Player = require("../modules/players/players.model");
const Team = require("../modules/players/team.model");
const League = require("../modules/players/league.model");
const Solution = require("../modules/games/games.model");
const fs = require("fs/promises");
const path = require("path");

async function seed() {
  try {
    await connectDB();
    console.log("MongoDB konektatuta");

    // 1. Fitxategiak irakurri
    const playersData = JSON.parse(
      await fs.readFile(path.join(__dirname, "../../public/json/fullplayers25.json"))
    );

    const teamsData = JSON.parse(
      await fs.readFile(path.join(__dirname, "../../public/json/teams.json"))
    );

    const leaguesData = JSON.parse(
      await fs.readFile(path.join(__dirname, "../../public/json/leagues.json"))
    );

    const solutionsData = JSON.parse(await fs.readFile(path.join(__dirname, "../../public/json/solution25.json")));

    const solutionsToInsert = solutionsData.map((id, index) => ({
    gameNumber: index,
    playerId: Number(id)
    }));


    const teamsArray = Object.entries(teamsData).map(([idKey, data]) => {
      return {
        id: parseInt(idKey),            //Giltza gordeko dugu JSON atributua gisa erabiliko dugu
        teamName: data.teamName,        
        stadium: data.stadium,
        country: data.country,
        logoUrl: `/images/teams/${idKey}.png`
      };
    });

    // 3. Datu-basea garbitu
    console.log("Datu-basea garbitzen...");
    await Player.deleteMany();
    await Team.deleteMany();
    await League.deleteMany();
    await Solution.deleteMany();


    // 4. Datuak kargatu
    console.log("Datuak kargatzen...");
    await Player.insertMany(playersData);
    await Team.insertMany(teamsArray); 
    await League.insertMany(leaguesData);
    await Solution.insertMany(solutionsToInsert);

    console.log("Seed eginda arrakastaz!");
    process.exit();

  } catch (error) {
    console.error("ERROREA SEEDEAN:", error.message);
    process.exit(1);
  }
}

seed();
const Solution = require("./games.model");
const Player = require("../players/players.model");

// games.controller.js

exports.getSolution = async (req, res) => {
  try {
    const dayRequested = parseInt(req.params.gameNumber);
    
    
    const totalSolutions = await Solution.countDocuments();
    
    if (totalSolutions === 0) {
      return res.status(404).json({ message: "Ez dago soluziorik datu-basean" });
    }

    
    const gameNumber = dayRequested % totalSolutions;


      const solutionEntry = await Solution.findOne({ gameNumber: gameNumber });

    if (!solutionEntry) {
        const fallback = await Solution.findOne().sort({ gameNumber: 1 });
         var finalPlayerId = fallback.playerId;
    } else {
         var  finalPlayerId = solutionEntry.playerId;
    }

    const  dailyPlayer = await Player.findOne({ id: finalPlayerId });
    res.status(200).json(dailyPlayer);

  } catch (error) {
    res.status(500).json({ message: " Errorea zerbitzarian", error: error.message });
  }
};


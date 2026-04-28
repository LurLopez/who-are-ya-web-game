const League = require("./league.model");

// GET /api/leagues
exports.getLeagues = async (req, res) => {
  try {
    const leagues = await League.find();
    
    res.status(200).json({
      success: true,
      count: leagues.length,
      data: leagues
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errorea ligak lortzean",
      error: error.message
    });
  }
};
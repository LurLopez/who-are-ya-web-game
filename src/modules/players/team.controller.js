const Team = require("./team.model");

// GET /api/teams
exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json({
            success: true,
            count: teams.length,
            data: teams,
            message: "Talde guztiak arrakastaz lortu dira"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: { message: "Ezin izan dira taldeak lortu", details: error.message }
        });
    }
};
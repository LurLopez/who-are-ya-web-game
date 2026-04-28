const Player = require("./players.model");

exports.getPlayers = async (req, res) => {
  try {
    // 1. Parametroak jaso (defektuzko balioekin)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit); // Hemen ez dugu defektuzko baliorik jarriko

    // 2. LOGIKA: Limitik ez badago, denak bueltatu (Jokorako)
    // Limit badago, orrialde-banaketa egin (Admin panelarako)
    if (!limit) {
      const allPlayers = await Player.find().sort({ name: 1 });
      return res.status(200).json(allPlayers); // Array soil bat bueltatzen dugu, loaders.js-ek itxaroten duen bezala
    }

    // 3. Orrialde-banaketa (limit badago)
    const skip = (page - 1) * limit;
    const players = await Player.find().skip(skip).limit(limit);
    const total = await Player.countDocuments();

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: players
    });

  } catch (error) {
    res.status(500).json({ message: "Errorea jokalariak lortzean" });
  }
};

exports.getPlayerById = async (req, res) => {
    try{
        const jokalariId = parseInt(req.params.id);

        const jokalaria = await Player.findOne({ id: jokalariId });

        if (!jokalaria) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: `Ez dugu aurkitu ${jokalariId} IDa duen jokalaririk`
                }
            });
        }


        res.status(200).json({
            success: true,
            data: jokalaria,
            message:"jokalaria arrakastaz aurkituta"    
        
        });

    }
    catch (error){
        res.status(500).json({
            success: false,
            error: {
                code: "SERVER_ERROR",
                message: "Ezin izan da jokalaria aurkitu",
                details: error.message
            }
        });
    
    }
}

exports.createPlayer = async (req, res, next) => {
    try {

        const jokalariBerria = await Player.create(req.body);

        // 2. Erantzuna bidali (201: Created)
        res.status(201).json({
            success: true,
            data: jokalariBerria,
            message: "Jokalaria arrakastaz gehitu da datu-basera"
        });

   } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                code: "SERVER_ERROR",
                message: "Ezin izan da jokalaria sortu",
                details: error.message
            }
        });
    }
};


// PUT players/:id: 
exports.updatePlayer = async (req, res) => {
    try {
        const jokalariId = parseInt(req.params.id);

        // Bilatu eta eguneratu
        // { new: true } -> Eguneratutako dokumentua bueltatzeko
        // { runValidators: true } -> Eskemako balidazioak berriro egiteko
        const jokalaria = await Player.findOneAndUpdate(
            { id: jokalariId }, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!jokalaria) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: `Ezin izan da eguneratu: ${jokalariId} IDa duen jokalaririk ez dago.`
                }
            });
        }

        res.status(200).json({
            success: true,
            data: jokalaria,
            message: "Jokalariaren datuak arrakastaz eguneratu dira"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                code: "SERVER_ERROR",
                message: "Ezin izan da jokalaria eguneratu",
                details: error.message
            }
        });
    }
};




exports.deletePlayer = async (req, res) => {
    try {
        const jokalariId = parseInt(req.params.id);

        
        const jokalaria = await Player.findOneAndDelete({ id: jokalariId });

       
        if (!jokalaria) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: `Ezin izan da ezabatu: ${jokalariId} IDa duen jokalaririk ez dago.`
                }
            });
        }

        
        res.status(200).json({
            success: true,
            data: {},
            message: `ID ${jokalariId} duen jokalaria ezabatu da.`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                code: "SERVER_ERROR",
                message: "Ezin izan da jokalaria ezabatu",
                details: error.message
            }
        });
    }
};


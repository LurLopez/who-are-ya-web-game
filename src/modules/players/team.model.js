const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  teamName: { 
    type: String,
    required: true
  },
  logoUrl: {
    type: String
  },
  country: {
    type: String,
    required: true
  },
  stadium: {
    type: String
  }
});

module.exports = mongoose.model("Team", TeamSchema);
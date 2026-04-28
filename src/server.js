require("dotenv").config();
const connectDB = require("./database/database");

const { checkUser } = require('./middleware/auth.middleware');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const userRoutes = require('./modules/users/users.routes');
const viewRoutes = require('./views/views.routes');
const playerRoutes= require('./modules/players/players.routes');
const teamRoutes= require('./modules/players/team.routes');
const leagueRoutes= require('./modules/players/league.routes');
const gamesRoutes= require('./modules/games/games.routes')
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use('/',viewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/players', playerRoutes)
app.use('/api/teams', teamRoutes)
app.use('/api/leagues', leagueRoutes)
app.use('/api/solution', gamesRoutes)

app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use('/json', express.static(path.join(__dirname, '../public/json')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', checkUser, (req, res) => {
    
    res.render('home', { 
        user: req.user 
    });

});

app.use(express.static(path.join(__dirname, '../public')));



connectDB();
app.listen(PORT, () => {
  console.log(`Zerbitzaria: http://localhost:${PORT}`);
});

const User = require('./users.model'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  const { name, lastName, email, password } = req.body;

  try {

    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Eremu guztiak beharrezkoak dira.' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        error: 'Pasahitzak gutxienez letra larri bat, xehe bat eta zenbaki bat behar ditu.' 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email hori jada erregistratuta dago.' });
    }

    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ 
        name, 
        lastName, 
        email, 
        password: hashedPassword, 
        role 
    });


    res.status(201).json({ 
        msg: 'Erabiltzailea ondo sortu da', 
        redirectUrl: '/api/users/login' 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Zerbitzariaren errorea erregistroan' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Ez da bilatu erabiltzailerik email horrekin.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Pasahitz okerra.' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );


    res.cookie('token', token, {
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000 
    });


    res.status(200).json({ 
        msg: 'Login zuzena', 
        redirectUrl: '/', 
        user: { 
            name: user.name, 
            role: user.role 
        } 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Zerbitzariaren errorea loginean' });
  }
};


exports.logout = (req, res) => {
  
  res.clearCookie('token');
  res.status(200).json({ 
      msg: 'Saioa itxita', 
      redirectUrl: '/api/users/login' 
  });
};
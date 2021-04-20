const express = require('express');
const app = express();
const cors = require('cors');
const authRoute = require('./routes/auth');
const ordersRoute = require('./routes/orders');
const itemRoute = require('./routes/item');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// MIDDLEWARE
app.use(function(err, req, res, next) {
   try {
      JSON.parse(req);
   }
   catch (e) {
      return res.status(500).send({error: 'hsm-api: something went wrong'});
   }
   next();
});

app.use('/api/user', authRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/item', itemRoute);

app.listen(process.env.PORT, () => {
   console.log('Server is running')
});


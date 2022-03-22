const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiroutes = require('./routes/api');
const invroutes = require('./routes/inventory');
const bblogin = require("./validation/bblogin");
const donor = require('./routes/donor')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const swaggerAutogen = require('swagger-autogen')();

const cors = require('cors');
require('dotenv/config')



// swagger config
const doc = {
	info: {
		title: 'BloodBank API',
		description: 'BloodBank spec for Swagger',
	},
	schemes: ['http', 'https'],
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

app.use(`/v1/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json());
app.use(cors());
app.use("/v1", bblogin);
app.use('/v1', apiroutes);
app.use('/v1', invroutes);
app.use('/v1', donor);

mongoose.connect(process.env.DB_CONNECTION)
 

//Port
app.listen(4000,(req,res)=>{
   console.log('Server is Running')
})
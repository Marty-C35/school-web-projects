import express from 'express'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { accomodations, reservations } from './resources'

// import ReactDOMServer from "react-dom/server";

/**
 * When in doubt check documentation
 * @see https://www.prisma.io/docs/concepts/overview/prisma-in-your-stack/rest
 * 
 * Naming of the resources is inspired by:
 * @see https://laravel.com/docs/9.x/controllers#actions-handled-by-resource-controller
 * 
 * @help Feeling stuck? Just check requests for examples
 */
const api = express()
const swaggerDocument = YAML.load(__dirname + '/../docs/swagger.yaml');

/**
 * Show Swagger UI for API Documentation
 */
api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Make express parse JSON in body and parse url encoded strings
 */
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

/**
 * Serve Server Side Rendered content
 */
api.use('/accomodations/', accomodations.web);
api.use(express.static("public"));

/**
 * Send greetings to API Client
 */
api.get('/api', (req, res) => res.send({
  status: "success",
  data: {},
  message: "Welcome to our API"
}));

/**
 * Resource accomodations
 */
api.get('/api/accommodations', accomodations.get);
api.post('/api/accommodations', accomodations.create);
api.put('/api/accommodations', accomodations.change);

/**
 * Resource reservations
 */
api.post('/api/reservations', reservations.create);
api.patch('/api/reservations', reservations.patch);
api.patch('/api/reservations', reservations.patch);

/**
 * Start listening on connections
 */
api.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}`))
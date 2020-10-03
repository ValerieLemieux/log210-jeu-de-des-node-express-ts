import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as flash from 'node-twinkle';
import * as ExpressSession from 'express-session';

import { mathsRoutes } from './routes/MathsRouter'; // le petit nom donné dans l'export au bas de MathsRouter.ts

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    //this.expressApp.set('view engine', 'pug'); // interface
    this.expressApp.use(express.static(__dirname + '/public')); // https://expressjs.com/en/starter/static-files.html

  }

  // Configure Express middleware. S'exécute à chaque requête. 
  private middleware(): void {
    this.expressApp.use(logger('dev'));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(ExpressSession(
      { secret: 'My Secret Key',
        resave: false,
        saveUninitialized: true}));
    this.expressApp.use(flash); // https://www.npmjs.com/package/node-twinkle typed using https://stackoverflow.com/a/53786892/1168342 (solution #2)
  }

  // Configure API endpoints.
  private routes(): void {
    // on parle à Express:
    this.expressApp.use("/", mathsRoutes.router);
  }

}

export default new App().expressApp;

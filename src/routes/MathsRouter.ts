import { Router, Request, Response, NextFunction } from 'express';
import { Maths } from "../core/Maths";
import { ValError } from "../core/errors/ValError"
import { NetConnectOpts } from 'net';
import * as flash from 'node-twinkle';



// TODO: rethink the name for this "router" function, since it's not really an Express router (no longer being "use()"ed inside Express)
export class MathsRouter {
  router: Router;
  maths: Maths;  // contrôleur GRASP

  /**
   * Initialize the Router
   */
  constructor() {
    this.maths = new Maths();  // init contrôleur GRASP
    this.router = Router(); // router Express qui permettra d'ajouter nos routes API REST
    this.init();
  }

  sqrt(req:Request, res:Response, next:NextFunction) {
    
    try {
      // Extraire les données brut du get: dans params de Request
      // convertir le texte avec parse
      var number = parseFloat(req.params.number);
      // ici sera la gestion d'erreurs!
      // valeur existe et est du bon type
      // get = valeur est là de facto, par contre les autres verbose faut check!
      if (isNaN(number)) {
        throw new ValError("Spa un chiffre!!!");
      }
      // appeler la fonctionnalité importées du Core (Maths.ts contient sqrt)
      var sqrtResult = this.maths.sqrt(number);

      // le retour sera contenu dans Response! donc on doit:
      // 1. Indiquer le statut

      res.status(200);

      // 2. envoyer la valeur dans un objet javascript (donc avec des accolades)
      res.send({
        result : sqrtResult
      })

      // ici le routeur fonctionne. on doit aller dans app.ts pour
    } catch (error) {
      // les erreurs lancées peuvent être de plusieurs types
      // on voudra donc gérer nos erreurs et les autres !
     
      var code = 500; // de base

      // Afficher les erreurs qui sont définies par l'API
      if (error.code) {
        code = error.code;
      }

      res.status(code).json({ error: error.toString() });
    }
  }

  divide(req:Request, res:Response, next:NextFunction) {
    
    try {
      // Extraire les données brut du get: dans params de Request
      // convertir le texte avec parse
      var divise = parseFloat(req.params.divise);
      var diviseur = parseFloat(req.params.diviseur);
      
      // ici sera la gestion d'erreurs!
      // valeur existe et est du bon type
      // get = valeur est là de facto, par contre les autres verbose faut check!
      if (isNaN(divise)) {
        throw new ValError("Le divisé doit être un chiffre.");
      }
      if (isNaN(diviseur)) {
        throw new ValError("Le diviseur doit être un chiffre.");
      }
      // appeler la fonctionnalité importées du Core (Maths.ts contient sqrt)
      var divisionResult = this.maths.divide(divise, diviseur);

      // le retour sera contenu dans Response! donc on doit:
      // 1. Indiquer le statut

      res.status(200);

      // 2. envoyer la valeur dans un objet javascript (donc avec des accolades)
      res.send({
        result : divisionResult
      })

      // ici le routeur fonctionne. on doit aller dans app.ts pour
    } catch (error) {
      // les erreurs lancées peuvent être de plusieurs types
      // on voudra donc gérer nos erreurs et les autres !
     
      var code = 500; // de base

      // Afficher les erreurs qui sont définies par l'API
      if (error.code) {
        code = error.code;
      }

      res.status(code).json({ error: error.toString() });
    }
  }

  /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
  init() {
    this.router.get("/sqrt/:number", this.sqrt.bind(this));
    this.router.get("/divide/:divise/:diviseur", this.divide.bind(this));
    /*this.router.post('/demarrerJeu', this.demarrerJeu.bind(this)); // pour .bind voir https://stackoverflow.com/a/15605064/1168342
    this.router.get('/jouer/:nom', this.jouer.bind(this));
    this.router.get('/terminerJeu/:nom', this.terminerJeu.bind(this));*/
  }

}

// exporter its configured Express.Router
export const mathsRoutes = new MathsRouter();
mathsRoutes.init();

import { ValError } from "./errors/ValError";

export class Maths  { // important de l'exporter
    
    sqrt(number:number):number {
        // vérification d'erreur qui sont au niveau des valeurs limites
        // maximale est implicite ici
        if (number < 0) {
            throw new ValError("c'est trop petit, mets 0 ou plus");
        }
        return Math.sqrt(number);
    }

    divide(divise:number, diviseur:number):number {
        // vérification d'erreur qui sont au niveau des valeurs limites
        // maximale et minimale sont implicites ici, donc pas nécessaires
        if (diviseur == 0) {
            throw new ValError("le diviseur ne peut pas être 0");
        }
        return divise/diviseur;
    }

}
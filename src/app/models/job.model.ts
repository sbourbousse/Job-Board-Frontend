import { Entreprise } from './entreprise.model';

export interface Job {
    idAnnonce : number,
    titre : string,
    contenu : string,
    date : Date,
    salaire : number,
    tauxHoraire : number,
    place : string
    entreprise : Entreprise
}
import { BaseUser } from './baseUser.model';
import { Entreprise } from './entreprise.model';

export interface User extends BaseUser {
    idPersonne: number,
    entreprise: Entreprise,
    nom: string,
    prenom: string,
    telephone: string,
    mail: string,
    sexe: string
}
import { User } from './user.model';

export interface Information {
    utilisateur: User;
    idAnnonce: number,
    message: string,
    date: Date
}
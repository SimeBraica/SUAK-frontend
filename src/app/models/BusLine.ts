import { Passanger } from './Passanger';

export interface BusLine {
  autobusnaLinijaId?: number;
  autobusId?: number;
  odredisteId?: number;
  vrijemeDolaska?: string;
  vrijemePolaska?: string;
  cijena?: number;
  peronId?: number;
  putnici?: Passanger[];
}

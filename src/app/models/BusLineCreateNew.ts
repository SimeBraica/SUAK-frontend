import { Passanger } from './Passanger';

export interface BusLineCreateNew {
  autobusId?: number;
  odredisteId?: number;
  vrijemeDolaska?: string;
  vrijemePolaska?: string;
  cijena?: number;
  peronId?: number;
  putnici?: Passanger[];
}

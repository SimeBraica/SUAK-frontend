import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusLine } from '../../models/BusLine';
import { Bus } from '../../models/Bus';
import { Destination } from '../../models/Destination';
import { ArrivingTerminal } from '../../models/ArrivingTerminal';

@Injectable({
  providedIn: 'root',
})
export class BusLineService {
  private apiUrl: string = 'http://localhost:8080/api/linije';
  private busUrl: string = 'http://localhost:8080/api/autobusi';
  private destinationUrl: string = 'http://localhost:8080/api/odredista';
  private arrivingTerminalUrl: string = 'http://localhost:8080/api/peroni';

  constructor(private _httpClient: HttpClient) {}

  public getLines(): Observable<BusLine[]> {
    return this._httpClient.get<BusLine[]>(this.apiUrl);
  }

  public getLine(lineId: number): Observable<BusLine> {
    return this._httpClient.get<BusLine>(this.apiUrl + '/' + lineId);
  }

  public getBus(): Observable<Bus[]> {
    return this._httpClient.get<Bus[]>(this.busUrl);
  }

  public getDestination(): Observable<Destination[]> {
    return this._httpClient.get<Destination[]>(this.destinationUrl);
  }

  public getArrivingTerminal(): Observable<ArrivingTerminal[]> {
    return this._httpClient.get<ArrivingTerminal[]>(this.arrivingTerminalUrl);
  }

  // Popravi ovo
  public deleteBusLine(lineId: number): Observable<BusLine> {
    return this._httpClient.delete(this.apiUrl + '/' + lineId);
  }

  public saveBusLine(lineId: number, bus: BusLine) {
    return this._httpClient.put<BusLine>(this.apiUrl + '/' + lineId, bus);
  }
}

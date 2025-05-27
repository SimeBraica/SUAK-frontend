import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusLine } from '../../models/BusLine';
import { Bus } from '../../models/Bus';
import { Destination } from '../../models/Destination';
import { ArrivingTerminal } from '../../models/ArrivingTerminal';
import { Passanger } from '../../models/Passanger';
import { BusLineCreateNew } from '../../models/BusLineCreateNew';

@Injectable({
  providedIn: 'root',
})
export class BusLineService {
  private apiUrl: string = 'http://localhost:8080/api/linije';
  private busUrl: string = 'http://localhost:8080/api/autobusi';
  private destinationUrl: string = 'http://localhost:8080/api/odredista';
  private arrivingTerminalUrl: string = 'http://localhost:8080/api/peroni';
  private passangersUrl: string = 'http://localhost:8080/api/putnici';

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

  public deleteBusLine(lineId: number): Observable<BusLine> {
    return this._httpClient.delete(this.apiUrl + '/' + lineId);
  }

  public saveBusLine(lineId: number, bus: BusLine) {
    return this._httpClient.put<BusLine>(this.apiUrl + '/' + lineId, bus);
  }

  public getPassangers(): Observable<Passanger[]> {
    return this._httpClient.get<Passanger[]>(this.passangersUrl);
  }

  public createPassangerOnLine(
    lineId: number,
    selectedPassanger: Passanger
  ): Observable<Passanger> {
    return this._httpClient.post<Passanger>(
      this.apiUrl + '/' + lineId + '/putnici',
      selectedPassanger
    );
  }

  public createBusLine(newBusLine: BusLineCreateNew): Observable<BusLine> {
    return this._httpClient.post<BusLineCreateNew>(this.apiUrl, newBusLine);
  }

  public deletePassangerForLine(
    lineId: number,
    passangerId: number
  ): Observable<void> {
    return this._httpClient.delete<void>(
      `${this.apiUrl}/${lineId}/putnici/${passangerId}`
    );
  }

  public updatePassangerForLine(passangerId: number, passanger: Passanger) {
    return this._httpClient.put<Passanger>(
      this.passangersUrl + '/' + passangerId,
      passanger
    );
  }

  public createEmptyLine(): Observable<BusLine> {
    return this._httpClient.post<BusLine>(this.apiUrl + '/prazna', null);
  }
}

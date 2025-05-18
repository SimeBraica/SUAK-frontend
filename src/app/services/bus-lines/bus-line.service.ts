import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusLine } from '../../models/BusLine';

@Injectable({
  providedIn: 'root',
})
export class BusLineService {
  private apiUrl: string = 'http://localhost:8080/api/linije';

  constructor(private _httpClient: HttpClient) {}

  public getLines(): Observable<BusLine[]> {
    return this._httpClient.get<BusLine[]>(this.apiUrl);
  }
}

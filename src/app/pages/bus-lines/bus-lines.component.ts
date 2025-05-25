import { Component, OnInit } from '@angular/core';
import { BusLine } from '../../models/BusLine';
import { BusLineService } from '../../services/bus-lines/bus-line.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bus-lines',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './bus-lines.component.html',
  styleUrl: './bus-lines.component.scss',
})
export class BusLinesComponent implements OnInit {
  protected busLines: BusLine[] = [];

  constructor(
    private _busLineService: BusLineService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._busLineService.getLines().subscribe((busLine) => {
      this.busLines = busLine;
    });
  }

  getBusLineDetails(autobusnaLinijaId: number) {
    this._router.navigate(['bus-lines', autobusnaLinijaId]);
  }

  createNewLine() {
    this._busLineService.createEmptyLine().subscribe((a) => {
      this._router.navigate(['bus-lines', a.autobusnaLinijaId]);
    });
  }
}

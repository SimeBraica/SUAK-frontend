import { Component, inject, OnInit } from '@angular/core';
import { BusLineService } from '../../../services/bus-lines/bus-line.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BusLine } from '../../../models/BusLine';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Bus } from '../../../models/Bus';
import { TableModule } from 'primeng/table';
import { Destination } from '../../../models/Destination';
import { ArrivingTerminal } from '../../../models/ArrivingTerminal';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-bus-line',
  imports: [
    TabMenuModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    TableModule,
    DropdownModule,
  ],
  templateUrl: './bus-line.component.html',
  styleUrl: './bus-line.component.scss',
})
export class BusLineComponent implements OnInit {
  public line: BusLine | undefined;
  public allbus: Bus[] | undefined;
  public currentBus: Bus | undefined;
  public allDestinations: Destination[] | undefined;
  public currentDestination: Destination | undefined;
  public allArrivingTerminals: ArrivingTerminal[] | undefined;
  public currentArrivingTerminal: ArrivingTerminal | undefined;
  public tabs: MenuItem[] | undefined;
  public activeItem: MenuItem | undefined;

  private idParam: string = '';

  constructor(
    private _busLineService: BusLineService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.populateTabs();

    this.idParam = this._activatedRoute.snapshot.params['id'];
    if (this.idParam === '0') {
      console.log('ja sam create new');
    } else {
      this._busLineService
        .getLine(this._activatedRoute.snapshot.params['id'])
        .subscribe((line) => {
          this.line = line;
          this.getBus();
          this.getDestination();
          this.getArrivingTerminal();
        });
    }
  }

  populateTabs() {
    this.tabs = [
      { label: 'General' },
      { label: 'Bus' },
      { label: 'Passangers' },
      { label: 'Destination' },
      { label: 'Arriving Terminal' },
    ];
    this.activeItem = this.tabs[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  getBus() {
    this._busLineService.getBus().subscribe((bus) => {
      this.allbus = bus;
      this.getCurrentBus();
    });
  }

  getCurrentBus() {
    this.currentBus = this.allbus!.find(
      (a) => a!.autobusId! === this.line!.autobusId!
    );
  }

  getDestination() {
    this._busLineService.getDestination().subscribe((destinations) => {
      this.allDestinations = destinations;
      this.getCurrentDestination();
    });
  }

  getCurrentDestination() {
    this.currentDestination = this.allDestinations!.find(
      (a) => a!.odredisteId! === this.line!.odredisteId!
    );
  }

  getArrivingTerminal() {
    this._busLineService
      .getArrivingTerminal()
      .subscribe((arrivingTerminals) => {
        this.allArrivingTerminals = arrivingTerminals;
        this.getCurrentArrivingTerminal();
      });
  }

  getCurrentArrivingTerminal() {
    this.currentArrivingTerminal = this.allArrivingTerminals!.find(
      (a) => a!.peronId! === this.line!.peronId!
    );
  }

  deleteBusLine(lineId: number) {
    console.log('kraj mene je lineId: ', lineId);
    this._busLineService.deleteBusLine(lineId).subscribe((a) => {
      console.log('obrisano');
      this._router.navigate(['bus-lines']);
    });
  }

  save() {
    let updateBusLine: BusLine = {
      // ovo isto nisam gledao da li on ocekuje id ili ga  assigna na backendu
      autobusnaLinijaId: this.line?.autobusnaLinijaId,
      autobusId: this.currentBus?.autobusId,
      odredisteId: this.currentDestination?.odredisteId,
      vrijemeDolaska: this.line?.vrijemeDolaska,
      vrijemePolaska: this.line?.vrijemePolaska,
      cijena: this.line?.cijena,
      peronId: this.currentArrivingTerminal?.peronId,
      putnici: [],
    };
    this._busLineService
      .saveBusLine(parseInt(this.idParam), updateBusLine)
      .subscribe((a) => {
        console.log('dodan novi autobus: ', a);
      });
  }
}

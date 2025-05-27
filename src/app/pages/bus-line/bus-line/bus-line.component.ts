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
import { Passanger } from '../../../models/Passanger';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';

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
    AutoCompleteModule,
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
  public searchUserEmail: string | undefined;
  private idParam: string = '';
  public allPassangers: Passanger[] = [];
  public selectedPassanger: string = '';
  public selectedPassangerObj: Passanger | undefined;

  private currentPassangerForLine: Passanger[] = [];
  public allFilterPassangers: Passanger[] = [];
  private dateTimeRegex =
    /^(?:[01]\d|2[0-3]):[0-5]\d (?:0[1-9]|[12]\d|3[01])\/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\/\d{4}$/;

  editing: boolean = false;
  clonedPassangers: { [s: number]: Passanger } = {};

  constructor(
    private _busLineService: BusLineService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.populateTabs();
    this.idParam = this._activatedRoute.snapshot.params['id'];
    if (this.idParam === '0') {
    } else {
      this._busLineService
        .getLine(this._activatedRoute.snapshot.params['id'])
        .subscribe((line) => {
          this.line = line;
          this.getBus();
          this.getDestination();
          this.getArrivingTerminal();
          this.getAllPassangers();
          this.currentPassangerForLine = this.line!.putnici!;
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

  getAllPassangers() {
    this._busLineService.getPassangers().subscribe((passangers) => {
      this.allPassangers = passangers;
      this.allFilterPassangers = this.allPassangers;
    });
  }

  filterPassanger($event: AutoCompleteCompleteEvent) {
    this.allPassangers = this.allPassangers.filter((a) =>
      a.email.includes($event.query)
    );
  }

  selectPassanger($event: AutoCompleteSelectEvent) {
    this.selectedPassangerObj = $event.value;
    this.selectedPassanger = $event.value.email;
    this.allPassangers = this.allFilterPassangers;
  }

  deleteBusLine(lineId: number) {
    this._busLineService.deleteBusLine(lineId).subscribe((a) => {
      this._router.navigate(['bus-lines']);
    });
  }
  addPassangerToLine() {
    this._busLineService
      .createPassangerOnLine(parseInt(this.idParam), this.selectedPassangerObj!)
      .subscribe((a: Passanger) => {
        this.line?.putnici?.push(a);
        this.selectedPassanger = '';
        this.selectedPassangerObj = undefined;
      });
  }

  save() {
    let updateBusLine: BusLine = {
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
      .subscribe((a) => {});
    return true;
  }
  deletePassanger(putnikId: number) {
    this._busLineService
      .deletePassangerForLine(parseInt(this.idParam), putnikId)
      .subscribe((a) => {
        this.line!.putnici = this.line!.putnici!.filter(
          (p) => p.putnikId !== putnikId
        );
        console.log('a');
      });
  }

  searchPassanger() {
    if (this.searchUserEmail) {
      this.line!.putnici = this.line!.putnici!.filter((a) =>
        a.email.includes(this.searchUserEmail!)
      );
      this.searchUserEmail = '';
    }
  }
  resetPassangerList() {
    if (!this.searchUserEmail) {
      this.line!.putnici! = this.currentPassangerForLine;
    }
  }

  onRowEditInit(passanger: Passanger) {
    let i = (this.clonedPassangers[passanger.putnikId as number] = {
      ...passanger,
    });
    this.clonedPassangers[passanger.putnikId as number] = { ...passanger };
  }

  onRowEditSave(passanger: Passanger) {
    console.log('kraj mene je passanger: ', passanger);
    this._busLineService
      .updatePassangerForLine(passanger.putnikId, passanger)
      .subscribe((a) => console.log('kraj mene je a: ', a));
  }

  onRowEditCancel(passanger: Passanger, index: number) {
    this.line!.putnici![index] = this.clonedPassangers[passanger.putnikId];
  }
}

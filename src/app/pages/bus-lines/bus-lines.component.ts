import { Component, OnInit } from '@angular/core';
import { BusLine } from '../../models/BusLine';
import { BusLineService } from '../../services/bus-lines/bus-line.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-bus-lines',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './bus-lines.component.html',
  styleUrl: './bus-lines.component.scss',
})
export class BusLinesComponent implements OnInit {
  protected busLines: BusLine[] = [];

  constructor(private _busLineService: BusLineService) {}

  ngOnInit() {
    this._busLineService.getLines().subscribe((busLine) => {
      console.log('busline: ', busLine);
      this.busLines = busLine;
    });
  }
}

import { Routes } from '@angular/router';
import { BusLinesComponent } from './pages/bus-lines/bus-lines.component';
import { BusLineComponent } from './pages/bus-line/bus-line/bus-line.component';

const routeConfig: Routes = [
  {
    path: 'bus-lines',
    component: BusLinesComponent,
    title: 'Bus Lines',
  },
  {
    path: 'bus-lines/:id',
    component: BusLineComponent,
    title: 'Bus Line',
  },
  {
    path: 'create-new-line',
    component: BusLineComponent,
    title: '',
  },
  {
    path: '',
    redirectTo: 'bus-lines',
    pathMatch: 'full',
  },
];
export default routeConfig;

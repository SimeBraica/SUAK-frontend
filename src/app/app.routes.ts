import { Routes } from '@angular/router';
import { BusLinesComponent } from './pages/bus-lines/bus-lines.component';

const routeConfig: Routes = [
  {
    path: 'bus-lines',
    component: BusLinesComponent,
    title: 'Bus Lines',
  },
];
export default routeConfig;

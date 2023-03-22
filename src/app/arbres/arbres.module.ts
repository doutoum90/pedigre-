import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeArbresComponent } from './liste-arbres/liste-arbres.component';
import { ArbresRoutingModule } from './arbres-routing.module';
import { D3OrgChartComponent } from './d3-org-chart/d3-org-chart.component';
import { NodeElementComponent } from './node-element/node-element.component';
import { FamilyComponent } from './family/family.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListeArbresComponent,
    D3OrgChartComponent,
    NodeElementComponent,
    FamilyComponent,
  ],
  imports: [
    CommonModule,
    ArbresRoutingModule,
    SharedModule,
  ],
})
export class ArbresModule {}

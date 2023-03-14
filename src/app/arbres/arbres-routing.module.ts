import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNodeComponent } from './add-node/add-node.component';
import { ListeArbresComponent } from './liste-arbres/liste-arbres.component';
import { RightClikComponent } from './right-clik/right-clik.component';

const routes: Routes = [
  {
    path: '',
    component: ListeArbresComponent,
  },
  {
    path: 'add/:id',
    component: AddNodeComponent,
  },
  {
    path: 'clicked',
    component: RightClikComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArbresRoutingModule {}

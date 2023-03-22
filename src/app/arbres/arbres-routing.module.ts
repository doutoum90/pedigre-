import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNodeComponent } from './add-node/add-node.component';
import { FamilyComponent } from './family/family.component';
import { ListeArbresComponent } from './liste-arbres/liste-arbres.component';

const routes: Routes = [
  {
    path: '',
    component: FamilyComponent,
  },
  {
    path: ':famID/family',
    component: ListeArbresComponent,
  },
  {
    path: ':famID/add/:id',
    component: AddNodeComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArbresRoutingModule {}

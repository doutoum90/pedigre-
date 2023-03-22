import { NgModule } from '@angular/core';;
import { RouterModule, Routes } from '@angular/router';
import { TreeComponent } from './tree/tree.component';
import { NodesComponent } from './nodes/nodes.component';
import { AddNodeComponent } from '../shared/add-node/add-node.component';

const routes: Routes = [
  {
    path: '',
    component: NodesComponent,
  },
  {
    path: ':famID/families',
    component: TreeComponent,
  },
  {
    path: ':famID/families/:id',
    component: AddNodeComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreeRoutingModule {}

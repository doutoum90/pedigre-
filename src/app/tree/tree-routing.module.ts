import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TreeComponent } from './tree/tree.component';
import { NodesComponent } from './nodes/nodes.component';

const routes: Routes = [
  {
    path: '',
    component: NodesComponent,
  },
  {
    path: ':famID/families',
    component: TreeComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreeRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'arbres',
    loadChildren: () =>
      import('./arbres/arbres.module').then((m) => m.ArbresModule),
  },
  {
    path: 'tree',
    loadChildren: () => import('./tree/tree.module').then((m) => m.TreeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

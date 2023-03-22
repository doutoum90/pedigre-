import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeArbresComponent } from './liste-arbres/liste-arbres.component';
import { ArbresRoutingModule } from './arbres-routing.module';
import { D3OrgChartComponent } from './d3-org-chart/d3-org-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NodeElementComponent } from './node-element/node-element.component';
import { AddNodeComponent } from './add-node/add-node.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SiblingComponent } from './add-node/sibling.component/sibling.component';
import { PartnerComponent } from './add-node/partner.component/partner.component';
import { ParentComponent } from './add-node/parent.component/parent.component';
import { InfosComponent } from './add-node/infos.component/infos.component';
import { FamilyComponent } from './family/family.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/my-other-path/i18n/', '.json');
}
@NgModule({
  declarations: [
    ListeArbresComponent,
    D3OrgChartComponent,
    NodeElementComponent,
    AddNodeComponent,
    SiblingComponent,
    PartnerComponent,
    ParentComponent,
    InfosComponent,
    FamilyComponent,
    AddMemberComponent,
  ],
  imports: [
    CommonModule,
    ArbresRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
})
export class ArbresModule {}

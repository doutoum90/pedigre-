import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMemberComponent } from './add-member/add-member.component';
import { HeaderComponent } from './header/header.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  NgbDropdownModule,
  NgbModalModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { InfosComponent } from './add-node/infos.component/infos.component';
import { ParentComponent } from './add-node/parent.component/parent.component';
import { PartnerComponent } from './add-node/partner.component/partner.component';
import { SiblingComponent } from './add-node/sibling.component/sibling.component';
import { AddNodeComponent } from './add-node/add-node.component';
import { RouterModule } from '@angular/router';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/my-other-path/i18n/', '.json');
}
@NgModule({
  declarations: [
    AddMemberComponent,
    HeaderComponent,
    SiblingComponent,
    PartnerComponent,
    ParentComponent,
    InfosComponent,
    AddNodeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbDropdownModule,
    NgbModule,
    NgbModalModule,
    RouterModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    AddMemberComponent,
    HeaderComponent,
    SiblingComponent,
    PartnerComponent,
    ParentComponent,
    InfosComponent,
    AddNodeComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
  ],
})
export class SharedModule {}

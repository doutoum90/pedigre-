import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMemberComponent } from './add-member/add-member.component';
import { HeaderComponent } from './header/header.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/my-other-path/i18n/', '.json');
}
@NgModule({
  declarations: [AddMemberComponent, HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbDropdownModule,
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
  ],
})
export class SharedModule {}

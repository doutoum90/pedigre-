import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  mdbCollapse: any;
  langues = [
    { name: 'Français', id: 'fr' },
    { name: 'العربية', id: 'ar' },
  ];

  constructor(private translate: TranslateService) {}

  changeLang(event: { name: string; id: string }) {
    this.translate.use(event.id);
  }
}

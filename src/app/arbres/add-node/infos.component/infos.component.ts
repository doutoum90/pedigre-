import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-infos',
  templateUrl: 'infos.component.html',
})
export class InfosComponent implements OnInit {
  @Input() id!: string | null;
  @Input() personne!: Object;
  @Input() famID!: string | null;
  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly activedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {}

  updateData(value: any) {
    return this.http.patch<any>(
      `${environment.BASE_URL}/families/${this.famID}/members/${this.id}`,
      value
    );
  }
  validate(event: any) {
    this.updateData(event).subscribe((members: any) => {
      this.cancel();
    });
  }

  cancel() {
    this.router.navigate(['arbres', this.famID, 'family']);
  }
  validateEtContinuer(event: any) {
    this.updateData(event).subscribe((members: any) => {
      console.log(members);
    });
  }
}

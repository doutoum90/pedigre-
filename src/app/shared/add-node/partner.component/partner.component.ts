import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-partner',
  templateUrl: 'partner.component.html',
})
export class PartnerComponent implements OnInit {
  @Input() id!: string | null;
  @Input() famID!: string | null;
  @Input() personne!: any;

  @Input() partners!: any[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}
  ngOnInit(): void {}

  ngOnChanges() {
    if (this.personne) {
      this.getData(
        this.personne.sex === 'H'
          ? this.personne.femalePartenersId
          : this.personne.malPartenerIds
      ).subscribe((partners) => (this.partners = partners));
    }
  }
  getData(ids: string[]) {
    let queryParams = new HttpParams();
    for (let id of ids) {
      queryParams = queryParams.append('partnerId[]', id);
    }
    return this.http.get<any>(
      `${environment.BASE_URL}/families/${this.famID}/members/partners`,
      {
        params: queryParams,
      }
    );
  }
  validate(value: any) {
    console.log(value, this.famID, this.id);
    const vals = {
      ...value,
      ...(this.personne.sex === 'F' && { femalePartenersId: [this.id] }),
      ...(this.personne.sex === 'H' && { malPartenerIds: [this.id] }),
      imageUrl: value.imageUrl || 'https://fakeimg.pl/100/',
      profileUrl: value.profileUrl || 'https://fakeimg.pl/100/',
    };
    this.http
      .post<any>(
        `${environment.BASE_URL}/families/${this.famID}/members/partner/${this.id}`,
        vals
      )
      .subscribe((members: any) => {
        this.router.navigate(['arbres']);
      });
  }
  cancel() {}
  validateEtContinuer(value: any) {
    const vals = {
      ...value,
      imageUrl: value.imageUrl || 'https://fakeimg.pl/100/',
      profileUrl: value.profileUrl || 'https://fakeimg.pl/100/',
    };
    this.http
      .post<any>(`${environment.BASE_URL}/members`, vals)
      .subscribe((members: any) => {
        console.log(members);
      });
  }
}

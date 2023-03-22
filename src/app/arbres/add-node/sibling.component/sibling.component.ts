import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-sibling',
  templateUrl: 'sibling.component.html',
})
export class SiblingComponent implements OnInit {
  @Input() id!: string | null;
  @Input() famID!: string | null;
  @Input() personne!: any;
  @Input() siblings!: any[];
  peres: any;
  meres: any;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.famID = this.activatedRoute.snapshot.paramMap.get('famID');
    this.getData()
      .pipe(
        tap((siblings) => (this.siblings = siblings)),
        switchMap((siblings) =>
          this.getPartner(this.personne._id, this.personne.sex)
        )
      )
      .subscribe((parent) => {
        if (parent.sex === 'F') {
          this.meres = parent;
        } else {
          this.peres = parent;
        }
      });
  }
  getData() {
    return this.http.get<any>(
      `${environment.BASE_URL}/families/${this.famID}/members/sibling/${this.id}?sex=${this.personne.sex}`
    );
  }

  getPartner(id: string, sex: string) {
    return this.http.get<any>(
      `${environment.BASE_URL}/families/${this.famID}/members/partner/${id}?sex=${sex}`
    );
  }

  addData(event: any) {
    const vals = {
      ...event,
      ...(this.personne.sex === 'F' && { motherId: this.personne._id }),
      ...(this.personne.sex === 'H' && { fatherId: this.personne._id }),
    };
    return this.http
      .post<any>(`${environment.BASE_URL}/families/${this.famID}/members`, vals)
      .pipe(switchMap((params: ParamMap) => this.getData()));
  }
  ajouterFils(event: any) {
    this.addData(event).subscribe((sibs) => (this.siblings = sibs));
  }
  quitter() {
    this.router.navigate(['arbres']);
  }
}

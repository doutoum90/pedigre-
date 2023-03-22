import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { forkJoin, mergeMap, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-parent',
  templateUrl: 'parent.component.html',
})
export class ParentComponent implements OnInit {
  @Input() id!: string | null;
  @Input() famID!: string | null;
  @Input() personne!: any;
  pere: any;

  mere: any;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.famID = this.activatedRoute.snapshot.paramMap.get('famID');
  }
  ngOnChanges() {
    if (this.personne) {
      this.fetchParent().subscribe(({ mere, pere }) => {
        this.mere = mere;
        this.pere = pere;
      });
    }
  }

  private fetchParent() {
    return forkJoin({
      mere: this.getParent(this.personne.motherId),
      pere: this.getParent(this.personne.fatherId),
    });
  }

  getParent(id: string) {
    if (id) {
      return this.http.get<any>(
        `${environment.BASE_URL}/families/${this.famID}/members/parents/${id}`
      );
    }
    return of(undefined);
  }

  addData(event: any) {
    return this.http
      .post<any>(
        `${environment.BASE_URL}/families/${this.famID}/members/parents/${this.id}`,
        event
      )
      .pipe(switchMap((params: ParamMap) => this.fetchParent()));
  }
  ajouterParent(event: any) {
    this.addData(event).subscribe(({ mere, pere }) => {
      this.mere = mere;
      this.pere = pere;
    });
  }

  validateEtContinuer(event: any) {
    console.log(event);
  }
  quitter() {
    this.router.navigate(['arbres']);
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sibling',
  templateUrl: 'sibling.component.html',
})
export class SiblingComponent implements OnInit {
  id!: string | null;
  @Input() personne!: any;
  @Input() siblings!: any[];
  siblingsForm!: FormGroup;
  famID: any;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.famID = this.activatedRoute.snapshot.paramMap.get('famID');
    this.getData().subscribe((sibs) => (this.siblings = sibs));
  }
  getData() {
    return this.http.get<any>(
      `${environment.BASE_URL}/families/${this.famID}/members/sibling/${this.id}`
    );
  }

  ajouterFils(event: any) {
    this.http
      .post<any>(
        `${environment.BASE_URL}/families/${this.famID}/members`,
        event
      )
      .pipe(switchMap((params: ParamMap) => this.getData()))
      .subscribe((sibs) => (this.siblings = sibs));
  }
}

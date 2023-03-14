import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parent',
  template: `
    <div *ngIf="personne.parentId">
      <h2>Pere et mere</h2>
      <p>{{ parent | json }}</p>
      <ul class="list-group">
        <li
          class="list-group-item"
          style="cursor:pointer"
          [routerLink]="['/arbres/add/', parent?.id]"
        >
          Pere: {{ parent?.name }}
        </li>
        <li
          class="list-group-item"
          style="cursor:pointer"
          [routerLink]="['/arbres/add/', mere?.id]"
        >
          Pere: {{ mere?.name }}
        </li>
      </ul>
    </div>
    <h2>Ajout d'une epouse/marie</h2>
    <div [formGroup]="parentForm">
      <div class="form-group">
        <label for="parentId">parent Id: </label>
        <input
          id="parentId"
          type="text"
          class="form-control"
          placeholder="Parent Id"
          readonly
          formControlName="parentId"
        />
      </div>
      <div class="form-group">
        <label for="name"> Name: </label>
        <input
          id="name"
          class="form-control"
          placeholder="John Doe"
          type="text"
          formControlName="name"
        />
      </div>

      <div class="form-group">
        <label for="imageUrl">Image: </label>
        <input
          id="imageUrl"
          class="form-control"
          placeholder="https://fakeimg.pl/100/"
          type="text"
          formControlName="imageUrl"
        />
      </div>

      <div class="form-group">
        <label for="area">Area: </label>
        <input
          id="area"
          class="form-control"
          placeholder="Area"
          type="text"
          formControlName="area"
        />
      </div>

      <div class="form-group">
        <label for="profileUrl">profileUrl: </label>
        <input
          id="profileUrl"
          type="text"
          class="form-control"
          placeholder="https://fakeimg.pl/100/"
          formControlName="profileUrl"
        />
      </div>

      <div class="form-group">
        <label for="office">Office: </label>
        <input
          id="office"
          type="text"
          class="form-control"
          placeholder="Office"
          formControlName="office"
        />
      </div>

      <div class="form-group">
        <label for="tags">Tags: </label>
        <input
          id="tags"
          type="text"
          class="form-control"
          placeholder="Tags"
          formControlName="tags"
        />
      </div>

      <div class="form-group">
        <label for="positionName">position Name: </label>
        <input
          id="positionName"
          type="text"
          class="form-control"
          placeholder="position Name"
          formControlName="positionName"
        />
      </div>

      <div class="form-group">
        <label for="size">size: </label>
        <input
          id="size"
          type="text"
          class="form-control"
          placeholder="Size"
          formControlName="size"
        />
      </div>
      <div class="mt-3">
        <button class="btn btn-primary me-2" type="submit" (click)="validate()">
          Enregistrer et Sortir
        </button>
        <button
          class="btn btn-primary me-2"
          type="submit"
          (click)="validateEtContinuer()"
        >
          Enregistrer et continuer
        </button>
        <button class="btn btn-secondary" (click)="updateProfile()">
          Annuler
        </button>
      </div>
    </div>
  `,
})
export class ParentComponent implements OnInit {
  @Input() id!: string | null;
  @Input() personne!: any;
  parentForm!: FormGroup;
  parent: any;
  mere: any;
  constructor(
    private readonly activedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}
  ngOnInit(): void {
    this.initForm();
    if (this.personne.parentId) {
      this.http
        .get<any>(
          `http://localhost:3000/families/parents/${this.personne.parentId}`
        )
        .subscribe((parent) => (this.parent = parent));
    }
  }
  initForm() {
    this.parentForm = new FormGroup({
      name: new FormControl(''),
      imageUrl: new FormControl(''),
      area: new FormControl(''),
      profileUrl: new FormControl(''),
      office: new FormControl(''),
      tags: new FormControl(''),
      isLoggedUser: new FormControl(''),
      positionName: new FormControl(''),
      id: new FormControl(''),
      parentId: new FormControl(''),
      size: new FormControl(''),
    });
    this.parentForm.patchValue({
      parentId: this.id,
    });
  }
  updateProfile() {
    this.router.navigate(['arbres']);
  }

  validate() {
    const value = this.parentForm.value;
    const vals = {
      ...value,
      imageUrl: value.imageUrl || 'https://fakeimg.pl/100/',
      profileUrl: value.profileUrl || 'https://fakeimg.pl/100/',
    };
    this.http
      .post<any>('http://localhost:3000/families', vals)
      .subscribe((members: any) => {
        this.router.navigate(['arbres']);
      });
  }
  validateEtContinuer() {
    const value = this.parentForm.value;
    const vals = {
      ...value,
      imageUrl: value.imageUrl || 'https://fakeimg.pl/100/',
      profileUrl: value.profileUrl || 'https://fakeimg.pl/100/',
    };
    this.http
      .post<any>('http://localhost:3000/families', vals)
      .subscribe((members: any) => {
        this.initForm();
      });
  }
}

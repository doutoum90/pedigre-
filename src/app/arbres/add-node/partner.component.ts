import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-partner',
  template: `
    <h2>Liste des epouses/maries</h2>
    <p>Ici la liste</p>
    <h2>Ajout d'une epouse/marie</h2>
    <div [formGroup]="partnerForm">
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
export class PartnerComponent implements OnInit {
  @Input() id!: string | null;
  @Input() personne!: Object;
  partnerForm!: FormGroup;
  constructor(
    private readonly activedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.partnerForm = new FormGroup({
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
    this.partnerForm.patchValue({
      parentId: this.id,
    });
  }
  updateProfile() {
    /* this.partnerForm.patchValue({
      name: 'yesy',
      imageUrl: 'https://fakeimg.pl/100/',
    }); */
    this.router.navigate(['arbres']);
  }

  validate() {
    const value = this.partnerForm.value;
    const vals = {
      ...value,
      imageUrl: value.imageUrl || 'https://fakeimg.pl/100/',
      profileUrl: value.profileUrl || 'https://fakeimg.pl/100/',
    };
    this.http
      .post<any>(`${environment.BASE_URL}/members`, vals)
      .subscribe((members: any) => {
        this.router.navigate(['arbres']);
      });
  }
  validateEtContinuer() {
    const value = this.partnerForm.value;
    const vals = {
      ...value,
      imageUrl: value.imageUrl || 'https://fakeimg.pl/100/',
      profileUrl: value.profileUrl || 'https://fakeimg.pl/100/',
    };
    this.http
      .post<any>(`${environment.BASE_URL}/members`, vals)
      .subscribe((members: any) => {
        this.initForm();
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-sibling',
  templateUrl: 'sibling.component.html',
})
export class SiblingComponent implements OnInit {
  @Input() id!: string | null;
  @Input() personne!: Object;
  @Input() siblings!: any[];
  siblingsForm!: FormGroup;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.getData();
  }
  getData() {
    this.http
      .get<any>(`http://localhost:3000/families/sibling/${this.id}`)
      .subscribe((sibs) => (this.siblings = sibs));
  }
  initForm() {
    this.siblingsForm = new FormGroup({
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
      dateExacte: new FormControl(true),
      dateNaissance: new FormControl(''),
      mort: new FormControl(false),
      dateDeces: new FormControl(''),
      histoire: new FormControl(''),
      sex: new FormControl('H'),
    });
    this.siblingsForm.patchValue({
      parentId: this.id,
    });
  }
  updateProfile() {
    this.router.navigate(['arbres']);
  }

  validate() {
    const value = this.siblingsForm.value;
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
    const value = this.siblingsForm.value;
    const vals = {
      ...value,
      imageUrl: value.imageUrl || 'https://fakeimg.pl/100/',
      profileUrl: value.profileUrl || 'https://fakeimg.pl/100/',
    };
    this.http
      .post<any>('http://localhost:3000/families', vals)
      .subscribe((members: any) => {
        this.initForm();
        this.getData();
      });
  }
}

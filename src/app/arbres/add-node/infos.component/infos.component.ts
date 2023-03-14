import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-infos',
  templateUrl: 'infos.component.html',
})
export class InfosComponent implements OnInit {
  @Input() id!: string | null;
  @Input() personne!: Object;
  infosForm!: FormGroup;
  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  ngOnChanges() {
    if (this.personne) this.refreshForm();
  }
  refreshForm() {
    this.infosForm.patchValue({
      ...this.personne,
    });
  }
  initForm() {
    this.infosForm = new FormGroup({
      surNom: new FormControl(''),
      dateExacte: new FormControl(true),
      dateNaissance: new FormControl(''),
      mort: new FormControl(false),
      dateDeces: new FormControl(''),
      histoire: new FormControl(''),
      sex: new FormControl('H'),
    });
  }

  validate() {
    const value = this.infosForm.value;
    this.http
      .post<any>('http://localhost:3000/families', value)
      .subscribe((members: any) => {
        this.cancel();
      });
  }

  cancel() {
    this.router.navigate(['arbres']);
  }
  validateEtContinuer() {
    const value = this.infosForm.value;
    this.http
      .patch<any>(`http://localhost:3000/families/${this.id}`, value)
      .subscribe((members: any) => {
        this.initForm();
        this.refreshForm();
      });
  }
}

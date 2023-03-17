import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
})
export class FamilyComponent implements OnInit {
  families!: any[];
  showForm = false;
  familyForm!: FormGroup;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.http
      .get<any>(`${environment.BASE_URL}/families`)
      .subscribe((fam) => (this.families = fam));
  }
  initForm() {
    this.familyForm = new FormGroup({
      name: new FormControl(''),
      histoire: new FormControl(''),
    });
  }

  validate() {
    this.http
      .post<any>(`${environment.BASE_URL}/families`, this.familyForm.value)
      .subscribe((members: any) => {
        console.log('mem', members);
        this.initForm();
        this.router.navigate(['arbres', members._id, 'family']);
      });
  }
}

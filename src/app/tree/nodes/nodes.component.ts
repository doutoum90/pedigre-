import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss'],
})
export class NodesComponent {
  families!: any[];
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
      .subscribe((fam: any) => (this.families = fam));
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
        this.initForm();
        this.router.navigate(['arbres', members._id, 'family']);
      });
  }
}

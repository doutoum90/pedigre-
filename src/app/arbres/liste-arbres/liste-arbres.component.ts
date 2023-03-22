import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
// import * as csvData from './assets/datas.csv';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-liste-arbres',
  templateUrl: './liste-arbres.component.html',
  styleUrls: ['./liste-arbres.component.scss'],
})
export class ListeArbresComponent implements OnInit {
  data!: any[];
  csvData!: string;
  famID!: string | null;
  constructor(
    private http: HttpClient,
    private readonly router: Router,
    private readonly activedRoute: ActivatedRoute
  ) {}
  ngOnInit() {}
  ngAfterViewInit() {
    this.famID = this.activedRoute.snapshot.paramMap.get('famID');
    this.http
      .get<any>(`${environment.BASE_URL}/families/${this.famID}/members`)
      .subscribe((members: any[]) => {
        this.data = members;
        members.forEach((d) => {
          d._highlighted = false;
        });
      });
  }
  ajouter(event: any) {
    this.http
      .post(`${environment.BASE_URL}/families/${this.famID}/members`, event)
      .subscribe((member) => {
        this.data = [member];
      });
  }
  redirect(event: any) {
    this.router.navigate(['arbres', this.famID, 'add', event]);
  }

  quitter() {}
}

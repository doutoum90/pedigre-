import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss'],
})
export class AddNodeComponent implements OnInit {
  id!: string | null;
  famID!: string | null;
  personne: any;

  constructor(
    private readonly activedRoute: ActivatedRoute,
    private readonly http: HttpClient
  ) {}
  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.paramMap.get('id');
    this.famID = this.activedRoute.snapshot.paramMap.get('famID');
    this.http
      .get<any>(
        `${environment.BASE_URL}/families/${this.famID}/members/${this.id}`
      )
      .subscribe((personne) => {
        this.personne = personne;
      });
  }

  modifier(event: any) {
    console.log(event);
  }
 
}

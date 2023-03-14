import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss'],
})
export class AddNodeComponent implements OnInit {
  id!: string | null;
  personne: any;


  constructor(
    private readonly activedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}
  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.paramMap.get('id');
    this.http
      .get(`http://localhost:3000/families/${this.id}`)
      .subscribe((personne) => {
        this.personne = personne;
      });
  }
  
  }

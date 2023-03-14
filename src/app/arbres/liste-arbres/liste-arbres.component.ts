import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
// import * as csvData from './assets/datas.csv';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-liste-arbres',
  templateUrl: './liste-arbres.component.html',
  styleUrls: ['./liste-arbres.component.scss'],
})
export class ListeArbresComponent implements OnInit {
  data!: any[];
  csvData!: string;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>('http://localhost:3000/families')
      .subscribe((members: any[]) => {
        this.data = members;
        members.forEach((d) => {
          d._highlighted = false;
        });
        /*  let prevIndex = 0;
      setInterval((d: any) => {
        data[prevIndex]._highlighted = false;
        let index = Math.floor(Math.random() * 10);
        prevIndex = index;
        data[index]._centered = true;
        data[index]._expanded = true;
        data[index]._highlighted = true;
        this.data = Object.assign([], data);
      }, 1000); */
      });
  }
}

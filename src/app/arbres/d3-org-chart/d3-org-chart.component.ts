import {
  OnChanges,
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

import { OrgChart } from 'd3-org-chart';

@Component({
  selector: 'app-d3-org-chart',
  templateUrl: './d3-org-chart.component.html',
  styleUrls: ['./d3-org-chart.component.scss'],
})
export class D3OrgChartComponent implements OnInit, OnChanges {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  @Input() data!: any[];
  @Output() redirectEvent: EventEmitter<any> = new EventEmitter();
  chart!: OrgChart<unknown>;

  constructor(private readonly router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (!this.chart) {
      this.chart = new OrgChart()
        .rootMargin(100)
        .nodeWidth((d) => 210)
        .nodeHeight((d) => 140)
        .childrenMargin((d) => 50)
        .compactMarginBetween((d) => 75)
        .compactMarginPair((d) => 80);
    }
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }
  updateChart() {
    if (!this.data) {
      return;
    }
    if (!this.chart) {
      return;
    }
    this.chart
      .container(this.chartContainer.nativeElement)
      .nodeWidth((d) => 250)
      .initialZoom(0.7)
      .nodeHeight((d) => 175)
      // .buttonContent(({node, state}) => '+')
      .nodeContent(({ data, height, width }: any) => {
        return `
            <div style="padding-top:30px;background-color:none;margin-left:1px;height:${height}px;border-radius:2px;overflow:visible">
              <div style="height:${height - 32}px;
              padding-top:0px;
              background-color:white;
              border:1px solid lightgray;">

                <img src=" ${data.imageUrl}" 
                  style="margin-top:-30px;
                  margin-left:${width / 2 - 30}px;
                  border-radius:100px;
                  width:60px;
                  height:60px;" />
               
               <div 
                  style="margin-top:-30px;
                  background-color:#3AB6E3;
                  height:10px;
                  width:${width - 2}px;
                  border-radius:1px"></div>

               <div style="padding:20px; padding-top:35px;text-align:center">
                  <div style="color:#111672;
                   font-size:16px;
                   font-weight:bold"> ${data.name} </div>
                   <div style="color:#404040;font-size:16px;margin-top:4px"> ${
                     data.surNom
                   } </div>
               </div> 
               <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
                 <div > Nombre d'enfants:  ${
                   data._directSubordinates
                 } 👤</div>  
                 <div > Nombre total descendances: ${
                   data._totalSubordinates
                 } 👤</div>    
               </div>
              </div>     
      </div>
  `;
      })
      .data(this.data)
      .onNodeClick((evt) => {
        this.redirectEvent.emit(evt);
        //this.router.navigate(['arbres', 'this.famID', 'add', evt]);
      })
      .render();
  }
}

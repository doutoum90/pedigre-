import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Edge, GraphComponent, Node } from '@swimlane/ngx-graph';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

type GraphData = { nodes: Node[]; links: Edge[] };
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeComponent {
  hierarchialGraph: GraphData = { nodes: [], links: [] };
  famID: any;
  center$ = new Subject<any>();
  graph!: GraphComponent;

  data!: any[];
  csvData!: string;
  @ViewChild(GraphComponent)
  set pane(v: GraphComponent) {
    setTimeout(() => {
      this.graph = v;
    }, 5000);
  }

  doCenter() {
    this.center$.next('tete');
  }
  constructor(
    private http: HttpClient,
    private readonly router: Router,
    private readonly activedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.famID = this.activedRoute.snapshot.paramMap.get('famID');
    this.getData();
  }

  getData() {
    this.http
      .get<GraphData>(
        `${environment.BASE_URL}/families/${this.famID}/members/node`
      )
      .subscribe((members: any) => {
        this.hierarchialGraph = members;
      });
  }

  process(data: any) {
    this.router.navigate(['arbres', this.famID, 'add', data.id]);
  }

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

  validateEtContinuer(event: any) {
    console.log(event);
  }
  redirect(event: any) {
    this.router.navigate(['arbres', this.famID, 'add', event]);
  }

  quitter() {}
}

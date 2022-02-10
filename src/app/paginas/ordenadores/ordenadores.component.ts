import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ordenadores',
  templateUrl: './ordenadores.component.html',
  styleUrls: ['./ordenadores.component.css']
})
export class OrdenadoresComponent implements OnDestroy, OnInit{

  dtOptions: DataTables.Settings = {};
  //persons: Person[] = [];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject();

  data:any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.http.get('http://dummy.restapiexample.com/api/v1/employees').
    subscribe((resp : any)=>{
      this.data=resp.data;
     // this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }



}

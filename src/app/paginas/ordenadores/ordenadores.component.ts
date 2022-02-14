import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-ordenadores',
  templateUrl: './ordenadores.component.html',
  styleUrls: ['./ordenadores.component.css']
})
export class OrdenadoresComponent implements OnInit,OnDestroy{

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data:any;


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };
    this.http.get('http://dummy.restapiexample.com/api/v1/employees')
    .subscribe((res:any)=>{
        this.data=res.data;
        this.dtTrigger.next(null);
    }
    );

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}

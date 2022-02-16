import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit,OnDestroy {

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

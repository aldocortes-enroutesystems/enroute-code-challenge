import { Component, OnInit } from '@angular/core';
import { RestApiService } from './../../shared/rest-api.service';
import { Employee } from './../../shared/employee';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employee:Employee | undefined;

  constructor(
    private restApi: RestApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe( params => {
        console.log('received', params);
        if(params.emp_no) {
          this.loadEmployee(params.emp_no);
        }
      });
  }
  
  loadEmployee(emp: number) {
    return this.restApi.getEmployee(emp).subscribe((data: Employee) => {
      this.employee = data;
    });
  }

}

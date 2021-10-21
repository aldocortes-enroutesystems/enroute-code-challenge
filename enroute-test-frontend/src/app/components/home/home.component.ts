import { Component, OnInit } from '@angular/core';
import { RestApiService } from './../../shared/rest-api.service';
import { EmployeeTable } from './../../shared/employee-table';
import { PartialEmployee } from 'src/app/shared/partial-employee';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Employee: Array<PartialEmployee> = [];
  displayedColumns: string[] = ['id', 'name', 'lname', 'gender', 'birth', 'hire'];
  currentPage: number =1;
  maxPages = 1;

  constructor(
    private restApi: RestApiService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(page:number = 1) {
    return this.restApi.getEmployees(page).subscribe((data: EmployeeTable) => {
      if(this.maxPages === 1) {
        this.maxPages = Math.ceil(data.total / 100);
      }
      this.Employee = data.dataset;
    });
  }

  toggleNav(next: number) {
    let temp = this.currentPage + next;
    if(temp == 0 || temp > this.maxPages) { return; }
    this.currentPage = temp;
    this.Employee = [];
    this.loadEmployees(this.currentPage);
  }

}

import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WorkloadRecord} from "./model/workloadRecord";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'fitx-workload-analyzer-ui';

  constructor(private httpClient: HttpClient) {}

  data: WorkloadRecord[] = []

  ngOnInit(): void {

  }




}

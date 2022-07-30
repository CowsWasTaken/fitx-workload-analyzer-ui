import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WorkloadRecord} from "./model/workloadRecord";

@Injectable({
  providedIn: 'root'
})
export class WorkloadDataService {

  constructor(private http: HttpClient) { }

  private url = "https://fitx-workload-analyzer.herokuapp.com/history";

  getRecords() {
   return  this.http.get<WorkloadRecord[]>(this.url)
  }
}

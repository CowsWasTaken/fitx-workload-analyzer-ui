import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WorkloadRecord} from "./model/workloadRecord";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WorkloadDataService {

  constructor(private http: HttpClient) { }

  private url = environment.backendUrl;

  getRecords() {
   return  this.http.get<WorkloadRecord[]>(this.url)
  }
}

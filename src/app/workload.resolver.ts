import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {WorkloadDataService} from "./workload-data.service";
import {WorkloadRecord} from "./model/workloadRecord";

@Injectable({
  providedIn: 'root'
})
export class WorkloadResolver implements Resolve<WorkloadRecord[]> {

  constructor(private workloadService: WorkloadDataService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkloadRecord[]> {
    return this.workloadService.getRecords();
  }
}

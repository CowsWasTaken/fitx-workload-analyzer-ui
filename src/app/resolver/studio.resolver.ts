import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {WorkloadDataService} from "../workload-data.service";
import {StudioInfoDto} from "../model/studio-info.dto";

@Injectable({
  providedIn: 'root'
})
export class StudioResolver implements Resolve<StudioInfoDto[]> {

  constructor(private workloadService: WorkloadDataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable< StudioInfoDto[]> {
    return this.workloadService.getStudios();
  }
}

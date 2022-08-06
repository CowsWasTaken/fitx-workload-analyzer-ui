import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {WorkloadDataService} from "./workload-data.service";
import {StudioDto} from "./model/studio.dto";

@Injectable({
  providedIn: 'root'
})
export class WorkloadResolver implements Resolve<StudioDto> {

  constructor(private workloadService: WorkloadDataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StudioDto> {
    const studioId = parseInt(route.paramMap.get('id')!)
    return this.workloadService.getStudioHistory(studioId);
  }
}

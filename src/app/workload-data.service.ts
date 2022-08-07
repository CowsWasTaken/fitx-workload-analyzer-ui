import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {StudioDto} from "./model/studio.dto";
import {StudioInfoDto} from "./model/studio-info.dto";

@Injectable({
  providedIn: 'root'
})
export class WorkloadDataService {

  private url = environment.backendUrl;

  constructor(private http: HttpClient) {
  }

  getStudioHistory(studioId: number) {
    return this.http.get<StudioDto>(`${this.url}/studio/${studioId}/history`)
  }

  getStudios() {
    return this.http.get<StudioInfoDto[]>(`${this.url}/studio`)
  }
}

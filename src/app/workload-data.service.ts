import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {StudioDto} from "./model/studio.dto";

@Injectable({
  providedIn: 'root'
})
export class WorkloadDataService {

  constructor(private http: HttpClient) { }

  private url = environment.backendUrl;

  getStudioHistory(studioId: number) {
   return  this.http.get<StudioDto>(`${this.url}/studio/${studioId}/history`)
  }
}

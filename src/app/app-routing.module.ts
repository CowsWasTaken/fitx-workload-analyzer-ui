import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChartComponent} from "./chart/chart.component";
import {WorkloadResolver} from "./workload.resolver";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot([
      {
        path: '',
        component: ChartComponent,
        resolve: {
          workloadRecords: WorkloadResolver
        }
      }
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

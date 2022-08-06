import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChartComponent} from "./chart/chart.component";
import {WorkloadResolver} from "./workload.resolver";

const routes: Routes = [{
  path: ':id', component: ChartComponent, resolve: {
    studio: WorkloadResolver
  }
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}

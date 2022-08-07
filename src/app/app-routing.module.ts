import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChartComponent} from "./chart/chart.component";
import {WorkloadResolver} from "./resolver/workload.resolver";
import {StudioSelectComponent} from "./studio-select/studio-select.component";
import {StudioResolver} from "./resolver/studio.resolver";

const routes: Routes = [{
  path: 'studio', component: StudioSelectComponent, resolve: {
    studios: StudioResolver
  }
}, {
  path: 'studio/:id', component: ChartComponent, resolve: {
    studio: WorkloadResolver
  }
}, {
  path: '**', redirectTo: 'studio', pathMatch: "full"
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}

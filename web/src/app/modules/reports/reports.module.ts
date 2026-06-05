import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: ReportsComponent }];

@NgModule({
  declarations: [ReportsComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class ReportsModule {}

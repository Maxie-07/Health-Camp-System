import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitsListComponent } from './visits-list.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: VisitsListComponent }];

@NgModule({
  declarations: [VisitsListComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class VisitsModule {}

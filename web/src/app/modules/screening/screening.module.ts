import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreeningComponent } from './screening.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: ScreeningComponent }];

@NgModule({
  declarations: [ScreeningComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class ScreeningModule {}

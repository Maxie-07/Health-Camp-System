import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiaryListComponent } from './beneficiary-list.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: BeneficiaryListComponent }];

@NgModule({
  declarations: [BeneficiaryListComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class BeneficiaryModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterBeneficiaryComponent } from './register-beneficiary.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: RegisterBeneficiaryComponent }];

@NgModule({
  declarations: [RegisterBeneficiaryComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class RegisterModule {}

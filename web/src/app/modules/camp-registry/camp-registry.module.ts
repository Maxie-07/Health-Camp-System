import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampRegistryComponent } from './camp-registry.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: CampRegistryComponent }];

@NgModule({
  declarations: [CampRegistryComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class CampRegistryModule {}

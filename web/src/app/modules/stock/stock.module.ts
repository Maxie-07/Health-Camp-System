import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockListComponent } from './stock-list.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: StockListComponent }];

@NgModule({
  declarations: [StockListComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class StockModule {}

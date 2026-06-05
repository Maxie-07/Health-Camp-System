import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToolbarModule } from 'primeng/toolbar';

const PRIME_MODULES = [
  ButtonModule,
  CardModule,
  DatePickerModule,
  DividerModule,
  FloatLabelModule,
  IconFieldModule,
  InputIconModule,
  InputNumberModule,
  InputTextModule,
  MessageModule,
  PasswordModule,
  ProgressBarModule,
  SelectModule,
  TableModule,
  TagModule,
  TextareaModule,
  ToolbarModule
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ...PRIME_MODULES],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, ...PRIME_MODULES]
})
export class SharedModule {}

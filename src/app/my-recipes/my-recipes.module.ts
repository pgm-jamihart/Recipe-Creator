import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRecipesComponent } from './my-recipes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyRecipesComponent],
  imports: [CommonModule, FormsModule],
})
export class MyRecipesModule {}

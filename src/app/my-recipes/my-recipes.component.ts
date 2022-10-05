import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../model/recipe';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss'],
})
export class MyRecipesComponent implements OnInit {
  userRecipeList: Recipe[] = [];
  userId: string | null = localStorage.getItem('userId');

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getAllRecipesByUser();
  }

  getAllRecipesByUser() {
    if (!this.userId) return;

    this.dataService.getRecipesByUser(this.userId).subscribe(
      (results) => {
        this.userRecipeList = results.map((result: any) => {
          const data = result.payload.doc.data();
          data.id = result.payload.doc.id;
          return data;
        });
      },
      (error) => {
        console.log(error);
        alert('Error getting recipes');
      }
    );
  }

  deleteRecipe(recipeId: string) {
    this.dataService.deleteRecipe(recipeId).then(
      () => {
        alert('Recipe deleted successfully');
        this.getAllRecipesByUser();
      },
      (error) => {
        console.log(error);
        alert('Error deleting recipe');
      }
    );
  }
}

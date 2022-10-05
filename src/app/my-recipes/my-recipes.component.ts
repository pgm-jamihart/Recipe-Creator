import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Ingredients, Recipe } from '../model/recipe';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss'],
})
export class MyRecipesComponent implements OnInit {
  userRecipeList: Recipe[] = [];
  IngredientsList: Ingredients[] = [];
  user = JSON.parse(localStorage.getItem('user') || '{}');
  selectedIngredients: string[] = [];
  selectedRecipe: Recipe | null = null;

  recipe = {
    title: '',
    createdBy: this.user.uid,
    createdByEmail: this.user.email,
    createdDate: new Date(),
    ingredients: this.IngredientsList,
  };

  updateRecipe = {
    id: '',
    title: '',
    createdBy: this.user.uid,
    createdByEmail: this.user.email,
    createdDate: new Date(),
    ingredients: this.IngredientsList,
  };

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getAllRecipesByUser();
    this.getAllIngredients();
  }

  getAllRecipesByUser() {
    if (!this.user) return;

    this.dataService.getRecipesByUser(this.user.uid).subscribe(
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

  getAllIngredients() {
    this.dataService.getIngredients().subscribe(
      (results) => {
        this.IngredientsList = results.map((result: any) => {
          const data = result.payload.doc.data();
          return data;
        });
      },
      (error) => {
        console.log(error);
        alert('Error getting ingredients');
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

  addIngredient(name: string, id: number) {
    if (!name) return;

    // only add ingredient if it doesn't already exist
    if (
      this.recipe.ingredients.findIndex(
        (ingredient) => ingredient.name === name
      )
    ) {
      this.recipe.ingredients.push({ name });
      this.selectedIngredients.push(name);
      console.log(this.selectedIngredients);
    }
  }

  removeIngredient(name: string, index: number) {
    // find the ingredient and remove it from the array
    this.recipe.ingredients.splice(
      this.recipe.ingredients.findIndex(
        (ingredient) => ingredient.name === name
      ),
      1
    );

    this.selectedIngredients.splice(
      this.selectedIngredients.findIndex((ingredient) => ingredient === name),
      1
    );
  }

  addUpdateIngredient(name: string, id: number) {
    if (!name) return;

    // only add ingredient if it doesn't already exist
    if (
      this.updateRecipe.ingredients.findIndex(
        (ingredient) => ingredient.name === name
      )
    ) {
      this.updateRecipe.ingredients.push({ name });
      this.selectedIngredients.push(name);
      console.log(this.selectedIngredients);
    }
  }

  removeUpdateIngredient(name: string, index: number) {
    // find the ingredient and remove it from the array
    this.updateRecipe.ingredients.splice(
      this.updateRecipe.ingredients.findIndex(
        (ingredient) => ingredient.name === name
      ),
      1
    );

    this.selectedIngredients.splice(
      this.selectedIngredients.findIndex((ingredient) => ingredient === name),
      1
    );
  }

  handleAddRecipe() {
    console.log(this.recipe);
    if (!this.recipe.title) {
      alert('Please enter a recipe name');
      return;
    }
    if (!this.recipe.ingredients[0].name) {
      alert('Please enter at least one ingredient');
      return;
    }

    this.dataService.addRecipe(this.recipe).then(
      () => {
        alert('Recipe added successfully');
        this.getAllRecipesByUser();
      },
      (error) => {
        console.log(error);
        alert('Error adding recipe');
      }
    );
  }

  editRecipe(recipe: Recipe) {
    this.updateRecipe = recipe;
    this.selectedIngredients = recipe.ingredients.map(
      (ingredient) => ingredient.name
    );
  }

  handleEditRecipe() {
    this.dataService.updateRecipe(this.updateRecipe.id, this.updateRecipe).then(
      () => {
        alert('Recipe updated successfully');
        this.getAllRecipesByUser();
      },
      (error) => {
        console.log(error);
        alert('Error updating recipe');
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../shared/data.service';
import { Recipe } from '../model/recipe';

@Component({
  selector: 'app-recipe-board',
  templateUrl: './recipe-board.component.html',
  styleUrls: ['./recipe-board.component.scss'],
})
export class RecipeBoardComponent implements OnInit {
  recipeList: Recipe[] = [];

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getAllRecipes();
  }

  getAllRecipes() {
    this.dataService.getRecipes().subscribe(
      (results) => {
        this.recipeList = results.map((result: any) => {
          const data = result.payload.doc.data();
          data.id = result.payload.doc.id;
          console.log(data);
          return data;
        });
      },
      (error) => {
        console.log(error);
        alert('Error getting recipes');
      }
    );
  }
}

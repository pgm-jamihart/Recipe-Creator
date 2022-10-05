import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Recipe } from '../model/recipe';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore) {}

  // get all recipes
  getRecipes() {
    return this.afs.collection('recipes').snapshotChanges();
  }

  // add a recipe
  addRecipe(recipe: any) {
    return this.afs.collection('recipes').add(recipe);
  }

  // get a recipe
  getRecipe(id: string) {
    return this.afs.collection('recipes').doc(id).snapshotChanges();
  }

  // update a recipe
  updateRecipe(id: string, recipe: Recipe) {
    return this.afs.collection('recipes').doc(id).update(recipe);
  }

  // delete a recipe
  deleteRecipe(id: string) {
    return this.afs.collection('recipes').doc(id).delete();
  }

  // get all recipes by a user
  getRecipesByUser(userId: string) {
    return this.afs
      .collection('recipes', (ref) => ref.where('createdBy', '==', userId))
      .snapshotChanges();
  }

  // get all ingredients
  getIngredients() {
    return this.afs.collection('ingredients').snapshotChanges();
  }
}

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
}

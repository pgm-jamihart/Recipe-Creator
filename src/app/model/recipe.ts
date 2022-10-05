export interface Recipe {
  id: string;
  title: string;
  createdBy: string;
  createdByEmail: string;
  createdDate: Date;
  ingredients: Ingredients[];
}

export interface Ingredients {
  name: string;
  image?: string;
}

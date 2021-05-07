export interface CocktailModel {
    name?: string;
    ingredients?: string[];
    decoration?: string;
    preparation?: string;
    container?: CocktailContainer;
    photo?: string;
}


export enum CocktailContainer {
    GLASS = '1',
    SHOT = '2',
    CUP = '3',
}

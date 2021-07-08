import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import { Error } from 'src/app/models/Error';

export const enum CartTypes {
    loadcart = '[Cart] Cart Load',
    loadcartsuccess = '[Cart] Load Cart Success',
    loadcarterror = '[Cart] Load Cart Error',
    addcartproduct = '[Cart] Add Product Cart',
    addcartproductsuccess = '[Cart] Add Product Cart Success',
    addcartproducterror = '[Cart] Add Product Error',
    deleteproduct = '[Cart] Product removed',
}

export const loadCart = createAction(CartTypes.loadcart,);

export const loadCartSuccess = createAction(
    CartTypes.loadcartsuccess,
    props<{ cartProducts: Product[]; shipping: string }>()
);

export const loadCartError = createAction(
    CartTypes.loadcarterror,
    props<{ payload: Error }>()
);

export const addCartProduct = createAction(
    CartTypes.addcartproduct,
    props<{ cartProduct: Product }>()
);

export const addCartProductSuccess = createAction(
    CartTypes.addcartproductsuccess,
);

export const addCartProductError = createAction(
    CartTypes.addcartproducterror,
    props<{ payload: Error }>()
);

export const deleteProduct = createAction(
    CartTypes.deleteproduct,
    props<{ payload: number }>()
);

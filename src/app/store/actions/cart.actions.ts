import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/Product';

export const loadCart = createAction(
    '[Carro] Cart Load');

export const loadCartSuccess = createAction(
    '[Productos] Cart Load Success',
    props<{ cartProducts: Product[]; shipping: string }>()
);

export const loadCartError = createAction(
    '[Carro] Cart Load Error',
    props<{ payload: Error }>()
);

export const addCartProduct = createAction(
    '[Productos] Add Product Cart',
    props<{ cartProduct: Product }>()
);

export const addCartProductSuccess = createAction(
    '[Productos] Add Product Cart Success',
);

export const addCartProductError = createAction(
    '[Carro] Add Product Cart Error',
    props<{ payload: string }>()
);

export const deleteProduct = createAction(
    '[Carro] Product removed',
    props<{ payload: number }>()
);

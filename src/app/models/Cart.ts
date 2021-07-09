import { Product } from './Product';

export interface Cart {
    shipping: string;
    products: Product[];
}

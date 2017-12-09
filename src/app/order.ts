import { OrderedProduct } from './ordered-product';

export class Order {

    public completed: boolean;
    public _id: string;

    public constructor(
        public products: OrderedProduct[],
        public clientName: string,
        public clientAddress: string,
    ){
        this.completed = false;
    }
}
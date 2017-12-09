import { Product } from './product';

export class OrderedProduct {

    public value: number;

    public constructor(public amount: number, public product: Product) {
            this.value = amount*product.price;
    }

    public getAmount() {
        return this.amount;
    }
    
    public setAmount(amount: number) {
        this.amount = amount;
        this.value = amount*this.product.price;
    }

    public getProduct() {
        return this.product;
    }

    public getValue() {
        return this.value;
    }
}
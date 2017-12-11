export class Product {
    
    public _id: string;
    public isDiscount: boolean = false;
    public discount: number = 0; 
    
    public constructor(
        public name:string,
        public description:string,
        public price:number,
        public category:string,
        public moreDescription: string,
        public available: number,
        public photos: File[]
    ) {}
}
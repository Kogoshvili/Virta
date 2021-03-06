export interface Product {
    id: string;
    sku: string;
    title: string;
    price: number;
    images: ProductImage[];
    description?: string;
    attributes?: ProductAttribute[];
}

export interface ProductImage {
    id: number;
    primary: boolean;
    url: string;
}

export interface ProductAttribute {
    id: number;
    title: string;
    value: string;
    priority: number;
}

export interface ProductInCart {
    id: string;
    title: string;
    price: number;
    images: string[];
    quantity: number;
    url: string;
}

export interface ProductInWishlist {
    id: string;
    title: string;
    price: number;
    images: string[];
    url: string;
}

import { CategoryDTO } from './Category';

export interface ProductDTO {
    id: string;
    description: string;
    sku: string;
    attributes: ProductAttributeDTO[];
    images: ProductImageDTO[];
    associatedProducts: ProductDTO[];
    title: string;
    price: number;
    type: ProductTypes;
    visibility: ProductVisibilities;
    active: boolean;
    categories: CategoryDTO[];
    stars: number;
    reviews: number;
    unit: ProductUnits;
    oldPrice: number;
    label: ProductLabels;
    video: string;
}

export interface ProductImageDTO {
    id: number;
    primary: boolean;
    url: string;
}

export interface ProductAttributeDTO {
    id: number;
    title: string;
    value: string;
    priority: number;
}

export enum ProductTypes
{
    Simple, // AssociatedProducts => NULL
    Bundle, // AssociatedProducts => Bundled products
    Configurable  // AssociatedProducts => Product variations
}

export enum ProductVisibilities
{
    Invisible, // Invisible
    PDP, // Only PDP
    PLP // PDP & PLP
}

export enum ProductLabels
{
    None, // No label
    New,
    Sale,
    Off,
    Featured,
    Trending
}

export enum ProductUnits
{
    Piece,
    Gram,
    Liter,
    Meter,
    Kilogram,
    SquareMeter
}

export interface PLP {
    products: ProductDTO[];
    totalCount: number;
}

export interface ProductInCart {
    productId: string;
    title: string;
    price: number;
    unit: ProductUnits;
    imageUrl: string;
    quantity: number;
}

export interface ProductInWishlist {
    productId: string;
    title: string;
    price: number;
    unit: ProductUnits;
    imageUrl: string;
}


// TODO: DELETE THIS
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


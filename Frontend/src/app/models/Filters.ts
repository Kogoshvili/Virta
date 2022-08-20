export interface Category {
    name: string;
    title: string;
}

export interface Filters {
    categories: Category[];
    attributes: any[];
}

export interface LabelDTO {
    name: string;
    value: number;
    count: number;
}

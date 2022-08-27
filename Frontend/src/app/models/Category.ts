export interface CategoryDTO {
    id: number;
    name: string;
    title: string;
    visible: boolean;
    priority: number;
    icon: string;
    description: string;
    bannerLarge: string;
    bannerSmall: string;
    productCount: number;
    parent: number;
    children: CategoryDTO[];
}

export interface ExpandableCategory extends CategoryDTO {
    isActive: boolean;
}

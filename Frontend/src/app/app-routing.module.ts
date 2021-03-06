import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { FiltersResolver } from './_resolvers/filters.resolver';
import { HomePageResolver } from './_resolvers/home-page.resolver';
import { ProductListResolver } from './_resolvers/product-list.resolver';
import { ProductResolver } from './_resolvers/product.resolver';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        resolve: { products: HomePageResolver },
        data: { animation: 'PLP' }
    },
    {
        path: 'product/:id',
        component: ProductPageComponent,
        resolve: { product: ProductResolver },
        data: { animation: 'PDP' }
    },
    {
        path: 'products',
        component: ProductListPageComponent,
        resolve: {
            products: ProductListResolver,
            filters: FiltersResolver
        },
        data: { animation: 'PLP' },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
    },
    {
        path: 'checkout',
        component: CheckoutPageComponent
    },
    {
        path: 'my-account',
        component: AccountPageComponent
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

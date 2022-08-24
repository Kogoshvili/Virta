import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerSectionComponent } from './components/banner-section/banner-section.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogSectionComponent } from './components/blog-section/blog-section.component';
import { CartComponent } from './components/cart/cart.component';
import { CountdownSectionComponent } from './components/countdown-section/countdown-section.component';
import { EntryComponent } from './components/entry/entry.component';
import { FeatureCardComponent } from './components/feature-card/feature-card.component';
import { FeatureSectionComponent } from './components/feature-section/feature-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { NewitemSectionComponent } from './components/newitem-section/newitem-section.component';
import { NewsSectionComponent } from './components/news-section/news-section.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PartnerSectionComponent } from './components/partner-section/partner-section.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { PromoSectionComponent } from './components/promo-section/promo-section.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { SideCartComponent } from './components/side-cart/side-cart.component';
import { SideCategoryComponent } from './components/side-category/side-category.component';
import { SliderComponent } from './components/slider/slider.component';
import { StarBarComponent } from './components/star-bar/star-bar.component';
import { SuggestSectionComponent } from './components/suggest-section/suggest-section.component';
import { TopSectionComponent } from './components/top-section/top-section.component';
import { TrendingSectionComponent } from './components/trending-section/trending-section.component';
import { VisualSectionComponent } from './components/visual-section/visual-section.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { WishlistPageComponent } from './pages/wishlist-page/wishlist-page.component';
import { Reducers } from './store/app.store';

export function tokenGetter(): string | null {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        ProductsListComponent,
        ProductCardComponent,
        HeaderComponent,
        FooterComponent,
        ProductPageComponent,
        EntryComponent,
        ProductListPageComponent,
        CartComponent,
        CheckoutPageComponent,
        WishlistComponent,
        ClickOutsideDirective,
        ProductFilterComponent,
        LoadingScreenComponent,
        AccountPageComponent,
        SideCategoryComponent,
        SideCartComponent,
        SliderComponent,
        SuggestSectionComponent,
        BannerSectionComponent,
        TrendingSectionComponent,
        PromoSectionComponent,
        FeatureSectionComponent,
        CountdownSectionComponent,
        NewitemSectionComponent,
        TopSectionComponent,
        FeatureCardComponent,
        PartnerSectionComponent,
        VisualSectionComponent,
        BlogSectionComponent,
        BlogCardComponent,
        NewsSectionComponent,
        ReviewCardComponent,
        StarBarComponent,
        ProductDetailsComponent,
        PaginationComponent,
        WishlistPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            preventDuplicates: true
        }),
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        FontAwesomeModule,
        JwtModule.forRoot({
            config: {
                tokenGetter,
                allowedDomains: [ environment.baseUrl ],
                disallowedRoutes: [ environment.baseUrl + '/api/auth' ]
            }
        }),
        StoreModule.forRoot(Reducers, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot([]),
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

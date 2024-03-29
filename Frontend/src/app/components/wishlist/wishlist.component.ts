import {
    Component,
    OnInit
} from '@angular/core';
import {
    faHeart,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import { ProductInWishlist } from 'src/app/models/Product';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
    faHeart = faHeart;
    faTimes = faTimes;
    isVisible = false;
    wishlist: ProductInWishlist[] = [];

    constructor(
        private wishlistService: WishlistService
    ) { }

    ngOnInit(): void {
        this.wishlistService.wishlist.subscribe(
            (wishlist) => this.wishlist = wishlist
        );
    }

    onWishlistClick(): void {
        this.isVisible = !this.isVisible;
    }

    removeFromWishlist(id: string): void {
        this.wishlistService.removeItem(id);
    }
}

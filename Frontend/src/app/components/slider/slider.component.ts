import { AfterViewInit, Component, Input } from '@angular/core';
import Splide, { SplideOptions } from '@splidejs/splide';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit {
    slider: any = null;
    @Input() options: SplideOptions = {};
    @Input() id: string = '';
    @Input() class: string = '';

    constructor() { }

    ngAfterViewInit(): void {
        this.slider = new Splide(`#${this.id}`, this.options).mount();
    }
}

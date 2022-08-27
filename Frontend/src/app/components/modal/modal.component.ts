import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges {
    @Input() id!: string;
    @Input() isOpen = false;
    @ViewChild('modalComponent', { static: true }) modalComponent!: ElementRef;
    modal: NgbModalRef | undefined;

    constructor(
        private modalService: ModalService
    ) { }

    ngOnChanges(): void {
        if (this.isOpen) {
            this.modal = this.modalService.open(this.modalComponent, this.id);
            this.modal.result.then(() => {
                this.modal = undefined;
                this.isOpen = false;
            });
        } else {
            this.modal?.dismiss();
        }
    }
}

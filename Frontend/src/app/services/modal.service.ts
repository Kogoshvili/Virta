import { ElementRef, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    models: { id: string, ref: NgbModalRef }[] = [];

    constructor(
        private modalService: NgbModal
    ) { }

    open(element: ElementRef, id: string): NgbModalRef {
        const ref = this.modalService.open(element);
        this.models.push({ id: id, ref });
        ref.result.then(() => {
            this.models = this.models.filter(m => m.id !== id);
        });
        return ref;
    }

    dismiss(id: string, reason?: string): void {
        this.models.find(m => m.id === id)?.ref.dismiss(reason);
        this.models = this.models.filter(m => m.id !== id);
    }

    dismissAll(reason?: string): void {
        this.modalService.dismissAll(reason);
        this.models = [];
    }
}

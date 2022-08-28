import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-countdown-section',
    templateUrl: './countdown-section.component.html',
    styleUrls: ['./countdown-section.component.scss']
})
export class CountdownSectionComponent implements OnInit, OnDestroy {
    countDownId = 0;
    countdownFinished: boolean = false;
    timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    promotion = {
        title: '40% discount offer over all our items',
        description: 'There are many variations of passages of orem psum available but the majority <br> have suffered alteration in some form by injected humour.',
        image: 'assets/img/countdown.png',
        deadline: '2022-08-30T05:58:16.634Z',
        badge: '<span>40%</span><span>off</span>'
    };

    constructor() { }

    ngOnInit(): void {
        const deadline = new Date(this.promotion.deadline);
        this.setTimeLeft(deadline.getTime() - Date.now());
        this.countDown();
    }

    ngOnDestroy() {
        this.clearTimer();
    }

    setTimeLeft(timeLeft: number) {
        this.timeLeft.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        this.timeLeft.hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.timeLeft.minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        this.timeLeft.seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    }

    timeLeftInMilliseconds(): number {
        return this.timeLeft.days * 24 * 60 * 60 * 1000 +
            this.timeLeft.hours * 60 * 60 * 1000 +
            this.timeLeft.minutes * 60 * 1000 +
            this.timeLeft.seconds * 1000;
    }

    clearTimer() {
        clearInterval(this.countDownId);
    }

    countDown() {
        this.clearTimer();
        this.countDownId = window.setInterval(
            () => {
                const timeLeft = this.timeLeftInMilliseconds();
                this.setTimeLeft(timeLeft - 1000);
                if (timeLeft <= 0) {
                    this.countdownFinished = true;
                    this.clearTimer();
                }
            }, 1000
        );
    }
}

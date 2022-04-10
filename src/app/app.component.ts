import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  defaultTouch = { x: 0, y: 0, time: 0 };

  @HostListener('touchstart', ['$event'])
  //@HostListener('touchmove', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  //   @HostListener('mousedown', ['$event'])
  //   @HostListener('mosemove', ['$event'])
  //   @HostListener('onclick', ['$event'])
  handleTouch(event) {
    let touch = event.touches[0] || event.changedTouches[0];

    // check the events
    if (event.type === 'touchstart') {
      this.defaultTouch.x = touch.pageX;
      this.defaultTouch.y = touch.pageY;
      this.defaultTouch.time = event.timeStamp;
    } else if (event.type === 'touchend') {
      let deltaX = touch.pageX - this.defaultTouch.x;
      let deltaY = touch.pageY - this.defaultTouch.y;
      let deltaTime = event.timeStamp - this.defaultTouch.time;

      // simulte a swipe -> less than 500 ms and more than 60 px
      if (deltaTime < 500) {
        // touch movement lasted less than 500 ms
        if (Math.abs(deltaX) > 60) {
          // delta x is at least 60 pixels
          if (deltaX > 0) {
            this.doSwipeRight(event);
          } else {
            this.doSwipeLeft(event);
          }
        }

        if (Math.abs(deltaY) > 60) {
          // delta y is at least 60 pixels
          if (deltaY > 0) {
            this.doSwipeDown(event);
          } else {
            this.doSwipeUp(event);
          }
        }
      }
    }
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('mousemove', ['$event'])
  @HostListener('onclick', ['$event'])
  handleClick(event) {
    console.log(event.type);
  }

  doSwipeLeft(event) {
    console.log('swipe left', event);
  }

  doSwipeRight(event) {
    console.log('swipe right', event);
  }

  doSwipeUp(event) {
    console.log('swipe up', event);
  }

  doSwipeDown(event) {
    console.log('swipe down', event);
  }
}

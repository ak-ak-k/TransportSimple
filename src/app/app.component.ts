import { Component, Output, EventEmitter } from '@angular/core';

// trip.model.ts
export interface Trip {
  start: string;
  end: string;
  level?: number;
  continued?: boolean;
  duplicate?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  startPoint: string = '';
  endPoint: string = '';
  trips: Trip[] = [];

  addTrip() {
    if (!this.startPoint || !this.endPoint) return;

    const newTrip = {
      start: this.startPoint.substring(0, 3).toUpperCase(),
      end: this.endPoint.substring(0, 3).toUpperCase(),
      level: 1, // Default to level 1
    };

    // Check if this is a continuation of previous trip
    if (this.trips.length > 0) {
      const lastTrip = this.trips[this.trips.length - 1];

      // If same as last trip, move to level 2
      if (lastTrip.start === newTrip.start && lastTrip.end === newTrip.end) {
        newTrip.level = 2;
      }
      // If continues from last trip's end point
      else if (lastTrip.end === newTrip.start) {
        newTrip.level = 1;
      }
    }

    this.trips.push(newTrip);
    this.startPoint = '';
    this.endPoint = '';
  }

  getTripsByLevel(level: number): Trip[] {
    return this.trips.filter((trip) => trip.level === level);
  }

  isContinuedTrip(index: number): boolean {
    if (index === 0) return false;
    return this.trips[index - 1].end === this.trips[index].start;
  }
}

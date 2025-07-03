import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-download-track-button',
  templateUrl: './download-track-button.component.html',
  // styleUrls: ['./download-track-button.component.scss']
})
export class DownloadTrackButtonComponent implements OnInit {
    @Input() peakId!: number;
    @Input() peakName?: string;

    constructor() { }

    ngOnInit(): void {
    }

    getDownloadUrl(): string {
        return `assets/data/${this.peakId}.gpx`;
    }
}

import { Component, OnInit } from '@angular/core';
import { PicosService } from './state/picos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MisTechosAsturias2';

  constructor( private picosService: PicosService ) {}

  ngOnInit() {
    this.picosService.get();
  }
}

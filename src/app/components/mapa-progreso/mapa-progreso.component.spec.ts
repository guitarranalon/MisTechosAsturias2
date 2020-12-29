import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaProgresoComponent } from './mapa-progreso.component';

describe('MapaProgresoComponent', () => {
  let component: MapaProgresoComponent;
  let fixture: ComponentFixture<MapaProgresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaProgresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaProgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaTopograficoComponent } from './mapa-topografico.component';

describe('MapaTopograficoComponent', () => {
  let component: MapaTopograficoComponent;
  let fixture: ComponentFixture<MapaTopograficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaTopograficoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaTopograficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

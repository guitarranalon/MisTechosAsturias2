import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaAsturiasSVGComponent } from './mapa-asturias-svg.component';

describe('MapaAsturiasSVGComponent', () => {
  let component: MapaAsturiasSVGComponent;
  let fixture: ComponentFixture<MapaAsturiasSVGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaAsturiasSVGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaAsturiasSVGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPicosComponent } from './listado-picos.component';

describe('ListadoPicosComponent', () => {
  let component: ListadoPicosComponent;
  let fixture: ComponentFixture<ListadoPicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

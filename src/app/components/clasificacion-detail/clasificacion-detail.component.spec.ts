import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionDetailComponent } from './clasificacion-detail.component';

describe('ClasificacionDetailComponent', () => {
  let component: ClasificacionDetailComponent;
  let fixture: ComponentFixture<ClasificacionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasificacionDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasificacionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

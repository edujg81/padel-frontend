import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampeonatoDetailComponent } from './campeonato-detail.component';

describe('CampeonatoDetailComponent', () => {
  let component: CampeonatoDetailComponent;
  let fixture: ComponentFixture<CampeonatoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampeonatoDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampeonatoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

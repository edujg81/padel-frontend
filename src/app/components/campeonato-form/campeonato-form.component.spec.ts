import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampeonatoFormComponent } from './campeonato-form.component';

describe('CampeonatoFormComponent', () => {
  let component: CampeonatoFormComponent;
  let fixture: ComponentFixture<CampeonatoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampeonatoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampeonatoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

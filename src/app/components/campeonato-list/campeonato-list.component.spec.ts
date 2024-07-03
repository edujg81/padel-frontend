import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampeonatoListComponent } from './campeonato-list.component';

describe('CampeonatoListComponent', () => {
  let component: CampeonatoListComponent;
  let fixture: ComponentFixture<CampeonatoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampeonatoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampeonatoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

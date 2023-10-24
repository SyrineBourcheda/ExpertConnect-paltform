import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertProfilComponent } from './expert-profil.component';

describe('ExpertProfilComponent', () => {
  let component: ExpertProfilComponent;
  let fixture: ComponentFixture<ExpertProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

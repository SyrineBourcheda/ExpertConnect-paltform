import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertSessionsComponent } from './expert-sessions.component';

describe('ExpertSessionsComponent', () => {
  let component: ExpertSessionsComponent;
  let fixture: ComponentFixture<ExpertSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertSessionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioSelectComponent } from './studio-select.component';

describe('StudioSelectComponent', () => {
  let component: StudioSelectComponent;
  let fixture: ComponentFixture<StudioSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudioSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

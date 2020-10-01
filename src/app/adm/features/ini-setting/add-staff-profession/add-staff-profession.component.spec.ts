import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffProfessionComponent } from './add-staff-profession.component';

describe('AddStaffProfessionComponent', () => {
  let component: AddStaffProfessionComponent;
  let fixture: ComponentFixture<AddStaffProfessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStaffProfessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStaffProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

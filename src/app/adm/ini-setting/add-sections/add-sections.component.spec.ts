import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectionsComponent } from './add-sections.component';

describe('AddSectionsComponent', () => {
  let component: AddSectionsComponent;
  let fixture: ComponentFixture<AddSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

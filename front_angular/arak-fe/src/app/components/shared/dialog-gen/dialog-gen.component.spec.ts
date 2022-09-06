import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGenComponent } from './dialog-gen.component';

describe('DialogGenComponent', () => {
  let component: DialogGenComponent;
  let fixture: ComponentFixture<DialogGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

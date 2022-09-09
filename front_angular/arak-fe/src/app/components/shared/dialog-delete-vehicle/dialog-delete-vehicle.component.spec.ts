import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteVehicleComponent } from './dialog-delete-vehicle.component';

describe('DialogDeleteVehicleComponent', () => {
  let component: DialogDeleteVehicleComponent;
  let fixture: ComponentFixture<DialogDeleteVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

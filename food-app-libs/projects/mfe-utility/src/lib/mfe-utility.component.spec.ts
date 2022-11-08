import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfeUtilityComponent } from './mfe-utility.component';

describe('MfeUtilityComponent', () => {
  let component: MfeUtilityComponent;
  let fixture: ComponentFixture<MfeUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfeUtilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfeUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyBucketComponent } from './my-bucket.component';

describe('MyBucketComponent', () => {
  let component: MyBucketComponent;
  let fixture: ComponentFixture<MyBucketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBucketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

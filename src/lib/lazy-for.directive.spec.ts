import { Component, DebugElement, ViewEncapsulation } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LazyForDirective } from './lazy-for.directive';

@Component({ template: '' })
class LazyForDirectiveTestComponent {
  id: 'foo';
}

const createTest = async (markup = '') => {
  const testBed = TestBed.resetTestingModule()
    .configureTestingModule({ declarations: [LazyForDirective] })
    .overrideComponent(LazyForDirectiveTestComponent, {
      set: {
        encapsulation: ViewEncapsulation.None,
        template: markup
      }
    });
  await testBed.compileComponents();

  const fixture = testBed.createComponent(LazyForDirectiveTestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  const element = fixture.debugElement.query(By.directive(LazyForDirectiveTestComponent));

  return {
    fixture,
    element
  };
}

describe('LazyForDirective', () => {
  let fixture: ComponentFixture<LazyForDirectiveTestComponent>;
  let element: DebugElement;
  
  it('should have tests', () => {
    expect(false).toBeTruthy();
  });
});

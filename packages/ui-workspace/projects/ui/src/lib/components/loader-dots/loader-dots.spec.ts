import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderDots } from './loader-dots';

describe('LoaderDots', () => {
  let component: LoaderDots;
  let fixture: ComponentFixture<LoaderDots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderDots]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderDots);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

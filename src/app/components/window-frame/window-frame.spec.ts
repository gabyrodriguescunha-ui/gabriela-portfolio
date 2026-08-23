import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowFrame } from './window-frame';

describe('WindowFrame', () => {
  let component: WindowFrame;
  let fixture: ComponentFixture<WindowFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowFrame],
    }).compileComponents();

    fixture = TestBed.createComponent(WindowFrame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

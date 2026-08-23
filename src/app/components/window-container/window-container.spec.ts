import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowContainer } from './window-container';

describe('WindowContainer', () => {
  let component: WindowContainer;
  let fixture: ComponentFixture<WindowContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(WindowContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

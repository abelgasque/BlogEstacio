import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should insert the app', () => {
    const fixture = TestBed.insertComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'BlogEstacio'`, () => {
    const fixture = TestBed.insertComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('BlogEstacio');
  });

  it('should render title', () => {
    const fixture = TestBed.insertComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('BlogEstacio app is running!');
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationPanelComponent } from './modification-panel.component';

describe('ModificationPanelComponent', () => {
  let component: ModificationPanelComponent;
  let fixture: ComponentFixture<ModificationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

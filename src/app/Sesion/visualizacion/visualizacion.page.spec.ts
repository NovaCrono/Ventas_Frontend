import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizacionPage } from './visualizacion.page';

describe('VisualizacionPage', () => {
  let component: VisualizacionPage;
  let fixture: ComponentFixture<VisualizacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VisualizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

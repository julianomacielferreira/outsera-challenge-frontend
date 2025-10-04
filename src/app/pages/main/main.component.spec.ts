/*
 * The MIT License
 *
 * Copyright 2025 Juliano Maciel Ferreira.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('MainComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        RouterTestingModule,
        MainComponent,
        HeaderComponent,
        FooterComponent,
        BrowserAnimationsModule,
        SidebarComponent
      ]
    }).compileComponents();
  });

  it('deve criar o componente', () => {
    const fixture = TestBed.createComponent(MainComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('deve toggle a sidebar', () => {
    const fixture = TestBed.createComponent(MainComponent);
    const component = fixture.componentInstance;
    component.sidebarOpened = true;
    component.sidebarToggle(null);
    expect(component.sidebarOpened).toBe(false);
    component.sidebarToggle(null);
    expect(component.sidebarOpened).toBe(true);
  });

  it('deve renderizar o header, sidebar e footer', () => {
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    const header = fixture.debugElement.query(By.css('app-header'));
    const sidebar = fixture.debugElement.query(By.css('app-sidebar'));
    const footer = fixture.debugElement.query(By.css('app-footer'));
    expect(header).toBeTruthy();
    expect(sidebar).toBeTruthy();
    expect(footer).toBeTruthy();
  });

  it('deve mostrar a sidebar quando sidebarOpened é true', () => {
    const fixture = TestBed.createComponent(MainComponent);
    const component = fixture.componentInstance;
    component.sidebarOpened = true;
    fixture.detectChanges();
    const matDrawer = fixture.debugElement.query(By.css('mat-drawer'));
    expect(matDrawer.attributes['ng-reflect-opened']).toBe('true');
  });

  it('deve esconder a sidebar quando sidebarOpened é false', () => {
    const fixture = TestBed.createComponent(MainComponent);
    const component = fixture.componentInstance;
    component.sidebarOpened = false;
    fixture.detectChanges();
    const matDrawer = fixture.debugElement.query(By.css('mat-drawer'));
    expect(matDrawer.attributes['ng-reflect-opened']).toBe('false');
  });
});

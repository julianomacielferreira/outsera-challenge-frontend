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
import { ListComponent } from './list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesService } from '../../services/movies.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('ListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [],
      providers: [MoviesService]
    });
  });

  it('deve criar o componente', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('deve chamar a API para carregar filmes', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const moviesService = TestBed.inject(MoviesService);
    const spy = spyOn(moviesService, 'getMovies').and.returnValue(of({
      content: [],
      totalElements: 0
    }) as any);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('deve filtrar por ano', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input[matInput]'));
    input.nativeElement.value = '1980';
    input.nativeElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    expect(component.year).toBe(1980);
  });

  it('deve filtrar por vencedor', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const select = fixture.debugElement.query(By.css('mat-select'));
    select.triggerEventHandler('selectionChange', { value: 'true' });
    fixture.detectChanges();
    expect(component.winner).toBeTruthy();
  });

  it('deve mostrar o loading enquanto os dados estão sendo carregados', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const component = fixture.componentInstance;
    component.isLoadingResults = true;
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.css('.list-loading-shade'));
    expect(loader).toBeTruthy();
  });

  it('deve esconder o loading quando os dados forem carregados', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.isLoadingResults = false;
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.css('.list-loading-shade'));
    expect(loader).toBeFalsy();
  });

  it('deve chamar a API novamente quando o paginator for alterado', () => {
    const fixture = TestBed.createComponent(ListComponent);
    const component = fixture.componentInstance;
    const moviesService = TestBed.inject(MoviesService);
    const spy = spyOn(moviesService, 'getMovies').and.returnValue(of({
      content: [],
      totalElements: 0
    }) as any);
    fixture.detectChanges();
    component.paginator.pageIndex = 1;
    component.paginator.page.emit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('deve renderizar a tabela com os dados', async () => {
    const fixture = TestBed.createComponent(ListComponent);
    const moviesService = TestBed.inject(MoviesService);
    const MOVIES_DATA = [
      { id: 1, year: 2020, title: 'Filme 1', winner: true },
      { id: 2, year: 2020, title: 'Filme 2', winner: false }
    ];
    spyOn(moviesService, 'getMovies').and.returnValue(of({ content: MOVIES_DATA, totalElements: 2 }) as any);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tr[mat-row]'));
    expect(rows.length).toBe(2);
  });

  it('deve renderizar a coluna de ID corretamente', async () => {
    const fixture = TestBed.createComponent(ListComponent);
    const moviesService = TestBed.inject(MoviesService);
    const MOVIES_DATA = [
      { id: 1, year: 2020, title: 'Filme 1', winner: true },
      { id: 2, year: 2020, title: 'Filme 2', winner: false }
    ];
    spyOn(moviesService, 'getMovies').and.returnValue(of({ content: MOVIES_DATA, totalElements: 2 }) as any);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const ID_COLUMNS = fixture.debugElement.queryAll(By.css('.mat-column-id'));
    expect(ID_COLUMNS[1].nativeElement.textContent).toContain('1');
    expect(ID_COLUMNS[2].nativeElement.textContent).toContain('2');
  });

  it('deve renderizar a coluna de título corretamente', async () => {
    const fixture = TestBed.createComponent(ListComponent);
    const moviesService = TestBed.inject(MoviesService);
    const MOVIES_DATA: any = [
      { id: 1, year: 2020, title: 'Filme 1', winner: true },
      { id: 2, year: 2020, title: 'Filme 2', winner: false }
    ];
    spyOn(moviesService, 'getMovies').and.returnValue(of({ content: MOVIES_DATA, totalElements: 2 }) as any);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const TITLE_COLUMNS = fixture.debugElement.queryAll(By.css('.mat-column-title'));
    expect(TITLE_COLUMNS[1].nativeElement.textContent).toBe('Filme 1');
    expect(TITLE_COLUMNS[2].nativeElement.textContent).toBe('Filme 2');
  });
});
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
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MoviesService } from '../../services/movies.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: any;
  let moviesService: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatTableModule,
        MatInputModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        DashboardComponent
      ],
      providers: [MoviesService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os dados de anos com múltiplos vencedores', () => {
    const response: any = { years: [{ year: 2020, winnerCount: 2 }] };
    spyOn(moviesService, 'getYearsWithMultipleWinners').and.returnValue(of(response));

    fixture.detectChanges();
    expect(component.winnnersCountDataSource).toEqual(response.years);
  });

  it('deve carregar os dados de estúdios vencedores', () => {
    const response: any = { studios: [{ name: 'Estúdio 1', winCount: 2 }, { name: 'Estúdio 2', winCount: 1 }] };
    spyOn(moviesService, 'getStudioWinners').and.returnValue(of(response));
    fixture.detectChanges();
    expect(component.studioWinnersDataSource).toEqual(response.studios.slice(0, 3));
  });

  it('deve carregar os dados de produtores com intervalo mínimo e máximo de vitórias', () => {
    const response: any = { min: [{ producer: 'Produtor 1', interval: 2, previousWin: 2020, followingWin: 2022 }], max: [{ producer: 'Produtor 2', interval: 5, previousWin: 2015, followingWin: 2020 }] };
    spyOn(moviesService, 'getMaxMinWinIntervalForProducers').and.returnValue(of(response));
    fixture.detectChanges();
    expect(component.producersMinIntervalWinsDataSource).toEqual(response.min);
    expect(component.producersMaxIntervalWinsDataSource).toEqual(response.max);
  });

  it('deve carregar os dados de filmes vencedores por ano', () => {
    const response: any = [{ id: 1, year: 2020, title: 'Filme 1' }];
    spyOn(moviesService, 'getMovieWinnersByYear').and.returnValue(of(response));
    const event: any = { target: { value: '2020' } };
    component.loadMovieWinnersByYear(event);
    expect(component.moviesListByYearDataSource).toEqual(response);
  });
});

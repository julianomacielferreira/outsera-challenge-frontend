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
import { MoviesService } from './movies.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar a API para getYearsWithMultipleWinners', () => {
    const URL = `${environment.API_URL}/yearsWithMultipleWinners`;
    const response: any = { years: [] };
    service.getYearsWithMultipleWinners().subscribe(data => {
      expect(data).toEqual(response);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('deve chamar a API para getStudioWinners', () => {
    const URL = `${environment.API_URL}/studiosWithWinCount`;
    const response: any = { studios: [] };
    service.getStudioWinners().subscribe(data => {
      expect(data).toEqual(response);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('deve chamar a API para getMaxMinWinIntervalForProducers', () => {
    const URL = `${environment.API_URL}/maxMinWinIntervalForProducers`;
    const response: any = { min: [], max: [] };
    service.getMaxMinWinIntervalForProducers().subscribe(data => {
      expect(data).toEqual(response);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('deve chamar a API para getMovieWinnersByYear', () => {
    const year = 2020;
    const URL = `${environment.API_URL}/winnersByYear?year=${year}`;
    const response: any = [];
    service.getMovieWinnersByYear(year).subscribe(data => {
      expect(data).toEqual(response);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('deve chamar a API para getMovies', () => {
    const page = 1;
    const URL = `${environment.API_URL}?page=${page}&size=15`;
    const response: any = { movies: [] };
    service.getMovies(page).subscribe(data => {
      expect(data).toEqual(response);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('deve chamar a API para getMovies com winner', () => {
    const page = 1;
    const winner = true;
    const URL = `${environment.API_URL}?page=${page}&size=15&winner=${winner}`;
    const response: any = { movies: [] };
    service.getMovies(page, winner).subscribe(data => {
      expect(data).toEqual(response);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('deve chamar a API para getMovies com year', () => {
    const page = 1;
    const year = 2020;
    const URL = `${environment.API_URL}?page=${page}&size=15&year=${year}`;
    const response: any = { movies: [] };
    service.getMovies(page, undefined, year).subscribe(data => {
      expect(data).toEqual(response);
    });
    const req = httpMock.expectOne(URL);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
});

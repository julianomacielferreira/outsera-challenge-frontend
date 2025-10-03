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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import YearResponse from '../models/year-response';
import StudioWinners from '../models/studio-winners';
import IntervalForProducers from '../models/producers-response';
import Movie from '../models/movies';
import MoviesResponse from '../models/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  public getYearsWithMultipleWinners(): Observable<YearResponse> {
    return this.http.get<YearResponse>(`${environment.API_URL}/yearsWithMultipleWinners`);
  }

  public getStudioWinners(): Observable<StudioWinners> {
    return this.http.get<StudioWinners>(`${environment.API_URL}/studiosWithWinCount`);
  }

  public getMaxMinWinIntervalForProducers(): Observable<IntervalForProducers> {
    return this.http.get<IntervalForProducers>(`${environment.API_URL}/maxMinWinIntervalForProducers`);
  }

  public getMovieWinnersByYear(year: number): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(`${environment.API_URL}/winnersByYear?year=${year}`);
  }

  public getMovies(page: number, winner?: boolean, year?: number): Observable<MoviesResponse> {

    let MOVIES_URL = `${environment.API_URL}?page=${page}&size=15`;

    if (winner !== undefined) {
      MOVIES_URL += `&winner=${winner}`;
    }

    if (year) {
      MOVIES_URL += `&year=${year}`;
    }

    return this.http.get<MoviesResponse>(MOVIES_URL);
  }

}

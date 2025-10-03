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
import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MoviesService } from '../../services/movies.service';
import YearResponse from '../../models/year-response';
import WinnnersCount from '../../models/year-response';
import StudioWinners from '../../models/studio-winners';
import Studio from '../../models/studio-winners';
import IntervalForProducers from '../../models/producers-response';
import Producer from '../../models/producers-response';
import Movie from '../../models/movies';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public winnnersCountColumns: string[] = ['year', 'winnerCount'];
  public winnnersCountDataSource!: Array<WinnnersCount>;

  public studioWinnersColumns: string[] = ['name', 'winCount'];
  public studioWinnersDataSource!: Array<Studio>;

  public producersMinIntervalWinsColumns: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];
  public producersMinIntervalWinsDataSource !: Array<Producer>;

  public producersMaxIntervalWinsColumns: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];
  public producersMaxIntervalWinsDataSource  !: Array<Producer>;

  public moviesListByYearColumns: string[] = ['id', 'year', 'title'];
  public moviesListByYearDataSource !: Array<Movie>;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {

    this.moviesService.getYearsWithMultipleWinners().subscribe((response: YearResponse) => {
      this.winnnersCountDataSource = response.years;
    });

    this.moviesService.getStudioWinners().subscribe((response: StudioWinners) => {
      this.studioWinnersDataSource = response.studios.slice(0, 3);
    });

    this.moviesService.getMaxMinWinIntervalForProducers().subscribe((response: IntervalForProducers) => {
      this.producersMinIntervalWinsDataSource = response.min;
      this.producersMaxIntervalWinsDataSource = response.max;
    });
  }

  public loadMovieWinnersByYear(event: Event) {

    const year = (event.target as HTMLInputElement).value;

    const regex = /^\d{4}$/;

    if (regex.test(year)) {

      this.moviesService.getMovieWinnersByYear(parseInt(year)).subscribe((response: Array<Movie>) => {
        this.moviesListByYearDataSource = response;
      });

    } else if (year.length == 0) {

      this.moviesListByYearDataSource = [];
    }
  }
}

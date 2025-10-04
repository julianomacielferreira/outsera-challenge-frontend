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
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MoviesService } from '../../services/movies.service';
import MoviesResponse from '../../models/movies';
import Movie from '../../models/movies';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['id', 'year', 'title', 'winner'];
  public dataSource!: MatTableDataSource<Movie>;
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  public totalElements = 0;
  public isLoadingResults = true;
  public year = 0;
  public winner = undefined;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.loadMovies(0);
  }

  ngAfterViewInit() {

    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.moviesService.getMovies(this.paginator.pageIndex, this.winner, this.year);
      }),
      map((response: MoviesResponse) => {
        this.isLoadingResults = false;
        this.totalElements = response.totalElements;
        return response.content;
      }),
    ).subscribe(content => {
      this.dataSource = new MatTableDataSource(content);
    });
  }

  public filterByYear(event: Event): void {

    const value = (event.target as HTMLInputElement).value;

    const regex = /^\d{4}$/;

    if (regex.test(value)) {

      this.year = parseInt(value);

      this.loadMovies(0, this.winner, this.year);

      this.goToFirstPage();

    } else if (value.length == 0) {

      this.year = 0;

      this.loadMovies(0, this.winner, this.year);

      this.goToFirstPage();
    }
  }

  public filterByWinner(event: MatSelectChange): void {

    const winner = event.value;
    this.winner = (winner !== undefined) ? winner : undefined;
    this.loadMovies(0, this.winner, this.year);
  }

  private loadMovies(page: number, winner?: boolean, year?: number): void {

    this.moviesService.getMovies(page, winner, year).subscribe((response: MoviesResponse) => {
      this.dataSource = new MatTableDataSource(response.content);
      this.dataSource.paginator = this.paginator;
      this.totalElements = response.totalElements;
      this.isLoadingResults = false;
    });
  }

  private goToFirstPage(): void {

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../models/position';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class PositionsService {
  private url = '/api/position';
  constructor(private http: HttpClient) {}

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.url}/${categoryId}`);
  }
  create(position: Position): Observable<Position> {
    return this.http.post<Position>(this.url, position);
  }
  update(position: Position): Observable<Position> {
    return this.http.patch<Position>(`${this.url}/${position._id}`, position);
  }
  delete(position: Position): Observable<Message> {
    return this.http.delete<Message>(`${this.url}/${position._id}`);
  }
}

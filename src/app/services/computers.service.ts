import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Computer } from '../models/computers.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ComputersService {
  constructor(private http: HttpClient) {}

  getComputers(): Observable<[Computer]> {
    return this.http.get<[Computer]>('http://localhost:3000/computers');
  }

  getComputer(id: string) {
    return this.http.get<Computer>(`http://localhost:3000/computers/${id}`);
  }

  saveComputer(data: Computer): Observable<{}> {
    return this.http.post('http://localhost:3000/computers', data);
  }

  updateComputer(id: string, data: Computer) {
    return this.http.put(`http://localhost:3000/computers/${id}`, data);
  }

  deleteComputer(id: string) {
    return this.http.delete(`http://localhost:3000/computers/${id}`);
  }
}

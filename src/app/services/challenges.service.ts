import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '../models/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  
  constructor(private http: HttpClient) { }


  getAllChallenges(): Observable<any> {
    return this.http.get('/api/all-challenges');
  }

  getUserChallenges(userId: number): Observable<any> {
    return this.http.get(`/api/challenges/${userId}`);
  }

  getChallengeInfos(challengeId: number): Observable<any> {
    return this.http.get(`/api/challenge/${challengeId}`)
  }
  // todo - create/edit challenge
}

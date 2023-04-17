import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from '../models/challenge';
import { StartOrFinishChallenge } from '../models/startOrFinishChallenge';
import { NewChallenge } from '../models/newChallenge';

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

  createChallenge(newChallenge: NewChallenge): Observable<any> {
    return this.http.post('/api/challenge', newChallenge, this.httpOptions)
  }

  startChallenge(challengeStatus: StartOrFinishChallenge): Observable<any> {
    return this.http.post('/api/challenges/start', challengeStatus, this.httpOptions)
  }

  finishChallenge(challengeStatus: StartOrFinishChallenge): Observable<any> {
    return this.http.put('/api/challenges/complete', challengeStatus, this.httpOptions);
  }
}

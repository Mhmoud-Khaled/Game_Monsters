import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameServicesService {

  platform = new BehaviorSubject('pc')
  gamesName = new BehaviorSubject('')

  constructor(private http:HttpClient) {
  }

  header:any = {
    'X-RapidAPI-Key': 'a7a1db6899mshf8e4b157a1c1cd4p172437jsn831f1ca1af0d',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }


    getAllGames():Observable<any>{
      return this.http.get('https://free-to-play-games-database.p.rapidapi.com/api/games',{headers:this.header})
    }

    getGamesById(id:number):Observable<any>{
      const param = new HttpParams().set('id', id.toString())
      return this.http.get('https://free-to-play-games-database.p.rapidapi.com/api/game',{params:param,headers:this.header})
    }

    getGamesByPlateform(plate:string):Observable<any>{
      const param = new HttpParams().set('platform', plate)
      return this.http.get('https://free-to-play-games-database.p.rapidapi.com/api/games',{params:param,headers:this.header})
    }

    getGamesByCategoryAndPlateform(platform:string, category:string):Observable<any>{
      const param = new HttpParams().set('platform',platform).set('category',category)
      return this.http.get('https://free-to-play-games-database.p.rapidapi.com/api/games',{params:param,headers:this.header})
    }

    getPopular():Observable<any>{
      return this.http.get('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity',{headers:this.header})
    }

    getGameVedio(id:number):Observable<any>{
      return this.http.get('https://www.freetogame.com/g/'+id+'/videoplayback.webm')
    }



}

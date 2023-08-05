import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameServicesService } from 'src/app/Services/game-services.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id:number = 0
  gameDetails:any
  vedio_url:string = ''

  constructor(private ActivatedRoute :ActivatedRoute, private gameServices:GameServicesService ) { }

  ngOnInit(): void {
    this.getIDParam()
  }

  getIDParam(){
    this.ActivatedRoute.params.subscribe(params => {
      // get the value of the 'id' parameter
      this.id = params['id'];
      // console.log(this.id);
      this.getGameDetails(this.id)
      // this.getVedio(this.id)
    });
  }

  getGameDetails(id:number){
    this.gameServices.getGamesById(id).subscribe(
      {
        next:(res:any)=>{
          this.gameDetails = res
          console.log('gameDetails')
        // console.log(this.gameDetails)
        }
      }
    )
  }

  // getVedio(id:number){
  //   this.gameServices.getGameVedio(id).subscribe({
  //     next:(res)=>{
  //       this.vedio_url = res
  //     }
  //   })
  // }

}

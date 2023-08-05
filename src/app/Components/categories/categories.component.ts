import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameServicesService } from 'src/app/Services/game-services.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category: string = ''
  gameData:string[]=[]
  moreGame:number = 20
  click :number = 1
  gameName:any
  disable:boolean = true

  constructor(private route: ActivatedRoute, private _Router: Router, private GameServeices: GameServicesService , private location: Location) {
    this.GameServeices.gamesName.subscribe({
      next:()=>{this.gameName = this.GameServeices.gamesName.getValue()
        // console.log("name",this.gameName)
      },
    })

  }

  ngOnInit(): void {
    this.getParam()
  }

  getParam() {
    this.route.params.subscribe(params => {
      // get the value of the 'cat' parameter
      this.category = params['cat'];
      // console.log(this.category);
      this.getData()
    });
  }

  getDetails(id: number) {
    this._Router.navigate(['/details/' + id])
  }


  getData(){
    this.GameServeices.platform.subscribe({
      next:()=>{
        const platform = this.GameServeices.platform.getValue()
        if(this.category != 'all'){
          this.GameServeices.getGamesByCategoryAndPlateform(platform.trim().toLowerCase(),this.category).subscribe(
            {
              next: (data:any)=> {
                // console.log('next')
                // console.log(data)
              this.gameData = data
            },
            error:(err:any) =>{console.log(err)}
            }
          )
        }else{
          this.GameServeices.getGamesByPlateform(platform.trim().toLowerCase()).subscribe({
            next:(res:any)=>{
              this.gameData = res
              // console.log('this.getGames')
              // console.log(this.gameData)
            }
          })
        }
    }
    })
  }

  getMoreGame(){
    this.click++
    this.moreGame *= this.click
  }

  @HostListener('window:scroll', ['$event']) // Listen for the scroll event on window
  onScroll(event: Event) {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // console.log('Scroll position:', scrollPosition);

    if(scrollPosition >= 300){
      this.disable = false

    }else{
      this.disable = true
    }
  }

  goToTop(){
    if(!this.disable){
      window.scrollTo(0,0);
    }
  }

}

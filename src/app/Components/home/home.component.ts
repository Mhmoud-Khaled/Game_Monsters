import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GameServicesService } from 'src/app/Services/game-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pupularGames:any= ''
  platform:string = 'pc'
  getGames:string [] = []
  moreGame:number = 20
  click :number = 1
  gameName:any
  disable:boolean = true


  constructor(private gameService:GameServicesService, private _Router:Router) {
    this.gameService.gamesName.subscribe({
      next:()=>{this.gameName = this.gameService.gamesName.getValue(),
        console.log("name",this.gameName)
      },
    })
  }

  ngOnInit(): void {
    this.getPupularGames()
    this.getAllGames()
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


  getPupularGames(){
    this.gameService.getPopular().subscribe({
      next:(res:any)=>{
        this.pupularGames = res.slice(0, 50)
        // console.log(this.pupularGames)
      },
      error:(err)=>{
        console.error('Error Occured')
        console.error(err)
      },
      complete:()=>{}
    })
  }

  getAllGames(){
    this.gameService.platform.subscribe({
      next:(res)=>{
        this.platform = res.toLowerCase().trim()
        // console.log(this.platform.toLowerCase())
        this.gameService.getGamesByPlateform(this.platform).subscribe({
          next:(res:any)=>{
            this.getGames = res
            // console.log('this.getGames')
            // console.log(this.getGames)
          }
        })
      },
    })
  }

  getDetails(id:number){
    this._Router.navigate(['/details/'+id])
  }

  getMoreGame(){
    this.click++
    this.moreGame *= this.click
  }

  goToTop(){
    if(!this.disable){
      window.scrollTo(0,0);
    }
  }


  //Slider
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 5,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0:{
        items: 2
      },
      750:{
        items: 4
      },
    },
    nav: true
  }

}

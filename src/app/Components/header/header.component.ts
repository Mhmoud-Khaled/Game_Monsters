import { Component, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthServicesService } from 'src/app/Services/auth-services.service';
import { GameServicesService } from 'src/app/Services/game-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean = false
  usrName: string = ''
  categoryList: string[] = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts']
  path:string = 'home'
  gameName:any

  constructor(private _AuthServicesService: AuthServicesService, private _GamesServecies: GameServicesService) {

  }

  ngOnInit(): void {
    this.isLoginFn()
    // this._GamesServecies.gameName.next(this.myForm.value.gameName)

  }


  change(event:any){
    this._GamesServecies.gamesName.next(event)
    // console.log(event)
  }


  addActiveClassToCat(){
    document.getElementById('navbarDropdown')!.classList.add("active")
  }

  removeActiveClassToCat(){
    document.getElementById('navbarDropdown')!.classList.remove("active")
  }

  isLoginFn() {
      this._AuthServicesService.userData.subscribe({
        next: () => {
          if (this._AuthServicesService.userData.getValue() !== null) {
            this.isLogin = true
            const userDate: any = this._AuthServicesService.userData.getValue()
            this.usrName = userDate.name
          }else {
            this.isLogin = false;
          }
        }
      })

  }

  logout() {
    this._AuthServicesService.logout()
    this.isLogin = false
  }

  plateFormSelected(event: any) {
    this._GamesServecies.platform.next(event.target.innerHTML)

  }
}

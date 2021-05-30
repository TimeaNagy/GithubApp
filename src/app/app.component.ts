import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GithubService } from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'github-app';
  client_id: string = '1e8c2087b97fc2955053';
  code: string = '';
  loggedIn: boolean = false;
  accessToken: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private githubService: GithubService) {
   }
  
  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd == true){
        this.code = this.route.snapshot.queryParamMap.get('code')  || '';
        if (this.code != '' && this.loggedIn == false){
          this.logIn();
          this.router.navigate(['/']);
        }
      }
    });
  }

  logIn(): void {
    this.githubService.getAccessToken(this.code).subscribe(response => {
      if(response.access_token){
        this.accessToken = response.access_token;
        this.loggedIn = true;
      }
    });
  }

  goToProfile(): void{
    this.router.navigate(['/myProfile'], { queryParams: {accessToken: this.accessToken}});
  }

  logOut(): void {
    this.accessToken = '';
    this.code = '';
    this.loggedIn = false;
    this.router.navigate(['/']);
  }
}

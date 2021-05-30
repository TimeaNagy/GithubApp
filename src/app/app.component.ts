import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GithubService } from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'github-app';
  client_id: string = '1e8c2087b97fc2955053';
  client_secrets: string = 'c51c9025577bafe70b287e020e2377024a3bf33c';
  code: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private githubService: GithubService) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd == true){
        this.code = this.route.snapshot.queryParamMap.get('code')  || '';
        this.logIn();
      }
    });
   }

  logIn(): void {
    // window.location.href = 'https://github.com/login/oauth/access_token?client_id='+this.client_id+'&client_secret='+this.client_secrets+'&code='+this.code
    // fetch('https://github.com/login/oauth/access_token?client_id='+this.client_id+'&client_secret='+this.client_secrets+'&code='+this.code, {mode: 'no-cors'}).then(response => { console.log(response); });

    // window.location.href = 'https://github.com/login/oauth/access_token?client_id='+this.client_id+'&client_secret='
    // +this.client_secrets+'&code='+this.code;
    this.githubService.getAccessToken(this.client_id, this.client_secrets, this.code).subscribe(response => console.log(response));
  }
}

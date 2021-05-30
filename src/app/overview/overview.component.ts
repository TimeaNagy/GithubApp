import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Developer } from '../developer';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  developers: Developer[] = [];
  developersLoaded!: Promise<boolean>;
  location: string = 'Bratislava';
  sort: string = 'repositories'; // followers || joined
  page: number = 1;
  perPage: number = 15;
  lastPage: boolean = false;

  constructor(private githubService: GithubService, private router: Router) { }

  ngOnInit(): void {
    this.getDevelopers();
  }

  getDevelopers(): void {
    this.githubService.getDevelopersByLocation(this.location, this.page, this.perPage, this.sort)
      .subscribe(developers => {
        //this.developers = this.developers.concat(developers.items);
        
        if (JSON.stringify(developers.items) != JSON.stringify([])){
          this.lastPage = true;
        }
         developers.items.forEach((developer: Developer) => {
           if(developer.login)
          this.githubService.getDeveloperByLogin(developer.login).subscribe((user: Developer) => {
            developer.name = user.name;
            developer.followers = user.followers;
            developer.public_repos = user.public_repos;
            this.developers.push(developer)
            }
          );
        }); 

        this.developersLoaded = Promise.resolve(true);
      });
  }

  showDetail(developer: Developer) {
    this.router.navigate(['/user', developer.login]);
  }

  searchDevelopers(){
    this.developers = [];
    this.page = 1;
    this.getDevelopers();
  }

  getNextPage() {
    this.page = this.page + 1;
    this.getDevelopers();
  }
}

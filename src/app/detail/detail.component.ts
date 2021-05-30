import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Developer, Follower, Repository } from '../developer';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  login: string | null = ""
  accessToken: string | null = ""
  developerLoaded!: Promise<boolean>;
  followersLoaded!: Promise<boolean>;
  repositoriesLoaded!: Promise<boolean>;
  developer: Developer | undefined;
  followers: Follower[] = [];
  repositories: Repository[] = [];
  issues: any[] = [];
  followersPage: number = 1;
  repositoriesPage: number = 1;
  perPage: number = 15;
  lastPageFollowers: boolean = false;
  lastPageRepositories: boolean = false;
  loggedIn: boolean = false;

  constructor(private githubService: GithubService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.login = this.route.snapshot.paramMap.get('login');
    this.route.queryParams.subscribe(params => {
      this.accessToken = params.accessToken;
    });

    if (this.login != null) {
      this.getDeveloper();
    } else if(this.accessToken){
      this.loggedIn = true;
      // this.router.navigate(['/myProfile']);
      this.getCurrentUser();
    }
  }

  getDeveloper(): void {
    if (this.login) {
      this.githubService.getDeveloperByLogin(this.login)
        .subscribe((developer: Developer) => {
          this.developer = developer;
          this.developerLoaded = Promise.resolve(true);
          this.getFollowers();
          this.getRepositories();
        });
    }
  }

  getCurrentUser(): void {
    if (this.accessToken) {
      this.githubService.getCurrentUser(this.accessToken)
        .subscribe((developer: Developer) => {
          this.developer = developer;
          this.login = developer.login || null;
          this.developerLoaded = Promise.resolve(true);
          this.getFollowers();
          this.getRepositories();
        });
    }
  }

  getFollowers(): void {
    if (this.login) {
      this.githubService.getFollowersForDeveloper(this.login, this.perPage, this.followersPage)
        .subscribe((followers: Follower[]) => {
          this.followers = this.followers.concat(followers);
          this.followersLoaded = Promise.resolve(true);
        });
    }
  }

  getRepositories(): void {
    if (this.login) {
      this.githubService.getRepositoriesForDeveloper(this.login, this.perPage, this.repositoriesPage)
        .subscribe((repositories: Repository[]) => {
          this.repositories = this.repositories.concat(repositories);
          this.repositoriesLoaded = Promise.resolve(true);
        });
    }
  }

  getNextPageFollowers() {
    if (this.developer && this.developer.followers && this.followers.length < this.developer.followers) {
      this.followersPage = this.followersPage + 1;
      this.getFollowers();
    }
    else {
      this.lastPageFollowers = true;
    }
  }

  getNextPageRepositories() {
    if (this.developer && this.developer.public_repos && this.repositories.length < this.developer.public_repos) {
      this.repositoriesPage = this.repositoriesPage + 1;
      this.getRepositories();
    }
    else {
      this.lastPageRepositories = true;
    }
  }
}

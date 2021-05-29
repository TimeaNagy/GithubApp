import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Developer } from '../developer';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  login: string | null = ""
  developerLoaded!: Promise<boolean>;
  developer: Developer | undefined;

  constructor(private githubService: GithubService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.login = this.route.snapshot.paramMap.get('login')
    this.getDeveloper()
  }

  getDeveloper(): void {
    if (this.login) {
      this.githubService.getDeveloperByLogin(this.login)
        .subscribe(developer => {
          this.developer = developer;
          this.developerLoaded = Promise.resolve(true);
          console.log(this.developer)
        });
    }
  }
}

import { selectAuth } from './../state/auth/auth.selector';
import { Auth } from './../models/auth';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<{ auth: Auth }>) { }

  ngOnInit(): void {
    const auth = this.store.select('auth')
    auth.subscribe(res => console.log(res))
  }

}

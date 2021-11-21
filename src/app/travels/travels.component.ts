import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss']
})
export class TravelsComponent implements OnInit {

  constructor(private router: Router) {
    const userInfo = localStorage.getItem('loggedUser');
    if(!userInfo){
      this.router.navigateByUrl('/login')
    }
  }

  ngOnInit(): void {
  }

}

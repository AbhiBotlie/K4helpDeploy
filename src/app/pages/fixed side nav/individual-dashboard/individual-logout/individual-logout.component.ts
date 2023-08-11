import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individual-logout',
  templateUrl: './individual-logout.component.html',
  styleUrls: ['./individual-logout.component.css']
})
export class IndividualLogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.router.navigate(['/login'])

  }


}

import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FirebaseService } from '../../../../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'side-bar';

  @ViewChild(MatSidenav, { static: true })
  sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private firebaseService: FirebaseService
  ) {}
  signOut():void {
    this.firebaseService.signOutUser();
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width:800px)']).subscribe((response) => {
      if (response.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  
}

import { Component } from '@angular/core';
import{MatToolbarModule} from '@angular/material/toolbar'
import{MatButtonModule} from '@angular/material/button'
import{MatIconModule} from '@angular/material/icon'
import{MatInputModule} from '@angular/material/input'
import{MatSelectModule} from '@angular/material/select'
import{MatMenuModule} from '@angular/material/menu'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,MatIconModule,MatInputModule,MatSelectModule,MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navbarVisible = false;

  toggleNavbar() {
    this.navbarVisible = !this.navbarVisible;
  }
}

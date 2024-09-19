import { Component,HostListener, OnInit,ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { NgIf,CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    CommonModule,
    NgIf
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  isMobile: boolean = false;
  isToolbarAtTop: boolean = false;
  menuOpen: boolean = false;
  projects:any = [];

  constructor() {
    this.checkScreenSize();
  }
  
  ngOnInit(): void {
    
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.menuTrigger.openMenu();
    } else {
      this.menuTrigger.closeMenu();
    }
  }

  
  closeMenu() {
    this.menuOpen = false;
    this.menuTrigger.closeMenu();
  }


  checkScreenSize() {
    const width = window.innerWidth;
    console.log('Width : '+width);
    this.isMobile = width < 768;    
  }  

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.scrollY;
    const threshold = 50;  
    console.log('Scroll position : '+scrollPosition);

    if (scrollPosition > threshold) 
    {
      this.isToolbarAtTop = true;
    }
     else 
    {
      this.isToolbarAtTop = false;
    }    
    this.applyClipPath();
  }

 
  
  applyClipPath() {
    const toolbarHeight = 64; 
    const sections = document.querySelectorAll('section');
    sections.forEach((section: Element) => {
      const rect = section.getBoundingClientRect();
      const clipValue = Math.max(0, toolbarHeight - rect.top);

      section.setAttribute('style', `clip-path: inset(${clipValue}px 0 0 0)`);

      const distance = rect.top - toolbarHeight;

      // if (distance < 0) {
      //   const fadeAmount = Math.max(0, 1 + distance / rect.height);
      //   (section as HTMLElement).style.opacity = fadeAmount.toString();
      // } else {
      //   (section as HTMLElement).style.opacity = '1';
      // }
    });
    
  }

  scrollTo(section: string) {
    this.menuOpen = false;
    const element = document.getElementById(section);
    if (element) {
      const yOffset = -64-50; // Adjust this value to the height of your toolbar
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}

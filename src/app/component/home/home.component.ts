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
import * as AOS from 'aos';

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
  // @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  // isMobile: boolean = false;
  // isToolbarAtTop: boolean = false;
  // menuOpen: boolean = false;
  isMobile: boolean = false;
  isToolbarAtTop: boolean = false;
  menuOpen: boolean = false;

  services:any = [];
  frontendTechnologies:any = [];
  backendTechnologies:any = [];

  constructor() {
    this.checkScreenSize();
    this.services = [
      
      { 
        title: 'Web Development', 
        description: 'Building modern, responsive websites and web applications.', 
        icon: 'assets/icons/app-development.png'
      },
      { 
        title: '.NET Development', 
        description: 'Custom .NET development for enterprise solutions.', 
        icon: 'assets/icons/wep-development.png' 
      },
      { 
        title: 'API Development', 
        description: 'Developing secure and scalable APIs using .NET Core.', 
        icon: 'assets/icons/api-development.png' 
      },
      { 
        title: 'Database Management', 
        description: 'Optimizing databases with SQL Server and Entity Framework.', 
        icon: 'assets/icons/database-management.png' 
      }
    ];

    this.frontendTechnologies = [
      { name: 'HTML', icon: 'assets/icons/html.png' },
      { name: 'CSS', icon: 'assets/icons/css.png' },
      { name: 'JavaScript', icon: 'assets/icons/javascript.png' },
      { name: 'jQuery', icon: 'assets/icons/jquery.png' },
      { name: 'Angular', icon: 'assets/icons/angular.png' }
    ];
  
    this.backendTechnologies = [
      { name: 'C#', icon: 'assets/icons/csharp.png' },
      { name: 'ASP.NET', icon: 'assets/icons/dotnet.png' },
      { name: 'MVC', icon: 'assets/icons/dotnet.png' },
      { name: 'MS SQL', icon: 'assets/icons/sqlserver.png' },
      { name: 'Git', icon: 'assets/icons/github.png' }
    ];
  }
  
  ngOnInit(): void {
    AOS.init();
  }

  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  closeMenu() {
    this.menuOpen = false; // Close the menu
  }
  
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // Adjust as necessary
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.scrollY;
    const threshold = 50; // Adjust this value as needed

    this.isToolbarAtTop = scrollPosition > threshold;
  }

  
  applyClipPath() {
    const toolbarHeight = 64; 
    const sections = document.querySelectorAll('section');
    sections.forEach((section: Element) => {
      const rect = section.getBoundingClientRect();
      const clipValue = Math.max(0, toolbarHeight - rect.top);

      section.setAttribute('style', `clip-path: inset(${clipValue}px 0 0 0)`);

      const distance = rect.top - toolbarHeight;

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
  
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
  }
}

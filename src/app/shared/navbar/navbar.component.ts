import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None, // styles need to affect global sections and ids
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mobileMenu', { static: true })
  mobileMenuRef!: ElementRef<HTMLDivElement>;
  @ViewChild('mobileMenuButton', { static: true })
  mobileMenuButtonRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('navbarEl', { static: true })
  navbarElRef!: ElementRef<HTMLElement>;

  mobileMenuOpen = false;
  scrolled = false;
  activeSection = '';
  private sectionObserver?: IntersectionObserver;
  private headerTextTimeout?: number;

  constructor(private renderer: Renderer2, private host: ElementRef) {}

  ngAfterViewInit(): void {
    // Initialize section states
    const sections = document.querySelectorAll<HTMLElement>('section');
    sections.forEach((s) => s.classList.add('section-hidden'));

    // IntersectionObserver for reveal-on-scroll
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((s) => this.sectionObserver!.observe(s));

    // Initialize active section and scrolled state
    this.updateScrolledState();
    this.highlightCurrentSection();

    // Initial header text fade-in (matches your original)
    this.headerTextTimeout = window.setTimeout(() => {
      const headerText = document.querySelector<HTMLElement>('.text-6xl');
      if (headerText) {
        headerText.style.opacity = '1';
        headerText.style.transform = 'translateY(0)';
      }
    }, 300);

    // ARIA wiring
    this.renderer.setAttribute(
      this.mobileMenuButtonRef.nativeElement,
      'aria-controls',
      'mobile-menu'
    );
    this.renderer.setAttribute(
      this.mobileMenuButtonRef.nativeElement,
      'aria-expanded',
      'false'
    );
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    if (this.headerTextTimeout) {
      clearTimeout(this.headerTextTimeout);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrolledState();
    this.highlightCurrentSection();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.mobileMenuOpen) {
      this.syncMobileMenuHeight();
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    // Toggle height transition (JS-driven model for accurate height)
    if (this.mobileMenuOpen) {
      // measure after next frame to ensure layout is ready
      requestAnimationFrame(() => this.syncMobileMenuHeight());
    } else {
      this.renderer.setStyle(this.mobileMenuRef.nativeElement, 'height', '0px');
    }
    // ARIA
    this.renderer.setAttribute(
      this.mobileMenuButtonRef.nativeElement,
      'aria-expanded',
      String(this.mobileMenuOpen)
    );
  }

  closeMobileMenu(): void {
    if (!this.mobileMenuOpen) return;
    this.mobileMenuOpen = false;
    this.renderer.setStyle(this.mobileMenuRef.nativeElement, 'height', '0px');
    this.renderer.setAttribute(
      this.mobileMenuButtonRef.nativeElement,
      'aria-expanded',
      'false'
    );
  }

  onNavClick(event: Event, targetId: string): void {
    event.preventDefault();
    const target = document.querySelector<HTMLElement>(targetId);
    if (!target) return;

    // Smooth scroll respecting scroll-padding-top (handled in global styles)
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Brief highlight
    target.classList.add('section-highlight');
    setTimeout(() => target.classList.remove('section-highlight'), 1000);

    // Close mobile menu after navigation
    this.closeMobileMenu();
  }

  private syncMobileMenuHeight(): void {
    const el = this.mobileMenuRef.nativeElement;
    // Ensure natural height measured from its scrollHeight
    const h = el.scrollHeight;
    this.renderer.setStyle(el, 'height', `${h}px`);
  }

  private updateScrolledState(): void {
    this.scrolled = window.scrollY > 50;
  }

  private highlightCurrentSection(): void {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    let current = '';
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY - 100; // mirror original offset logic
      const inView =
        window.scrollY >= top && window.scrollY < top + section.offsetHeight;
      if (inView) {
        current = section.getAttribute('id') || '';
      }
    });
    this.activeSection = current;
  }
}

import {
  EventEmitter,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode: boolean;
  public darkModeChanged: EventEmitter<boolean> = new EventEmitter();
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    // Inicializar el estado desde el localStorage
    this.darkMode = this.getStoredDarkMode();
    this.applyDarkModeClass();

    // Emitir el estado inicial para los suscriptores
    this.darkModeChanged.emit(this.darkMode);
  }

  // Cambia el modo oscuro y actualiza el almacenamiento local y la clase del DOM
  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.applyDarkModeClass();
    this.storeDarkMode();
    this.darkModeChanged.emit(this.darkMode);
  }

  // Obtiene el estado inicial de modo oscuro desde el localStorage
  private getStoredDarkMode(): boolean {
    return localStorage.getItem('darkMode') === 'true';
  }

  // Guarda el estado actual de modo oscuro en el localStorage
  private storeDarkMode(): void {
    localStorage.setItem('darkMode', String(this.darkMode));
  }

  // Aplica o quita la clase "dark" en el cuerpo del documento
  private applyDarkModeClass(): void {
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }

  // Permite obtener el estado inicial en caso de ser necesario fuera del servicio
  public getInitialDarkMode(): boolean {
    return this.darkMode;
  }
}

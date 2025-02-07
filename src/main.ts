import { Component, enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { GridComponent } from './grid.component';
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [GridComponent],
  template: `
    <h1>Hello from Yo!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
    <app-grid></app-grid>
  `,
})

export class App {
  name = 'Angular';
}
bootstrapApplication(App);

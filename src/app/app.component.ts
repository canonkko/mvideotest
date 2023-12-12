import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public name: string = '';
  public loading: boolean = false;
  public isError: boolean = false;
  private delay: number = 60000
  private httpClient: HttpClient = inject(HttpClient);

  public onClick(name: string) {
    this.loading = true;
    // Имитация запроса на сервер, верный адрес: https://reqres.in/api/users
    this.httpClient.get('https://reqres.in/api/').subscribe(res => {
      this.name = name;
      this.loading = false;
    }, () => {
      this.isError = true;
      setTimeout(() => this.isError = false, 5000);
      setTimeout(()=> {
        this.loading = false;
      }, this.delay)
    });


  }
}

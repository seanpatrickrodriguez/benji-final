import { Component } from '@angular/core';
import { WithLoading } from '../../decorators/with-loading.decorator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  standalone: true,
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss'
})
export class RedirectComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) { 
    this.isLoggedIn();
  }
  
  @WithLoading()
  isLoggedIn() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

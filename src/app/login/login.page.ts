import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonFooter } from '@ionic/angular/standalone';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
import { ToastController ,LoadingController} from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon,IonFooter, IonButton, IonInput, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";
  passwordType: string = 'password';


  constructor(private databaseService: DatabaseService,
    private router: Router,
    private toastController: ToastController,
    private apiService: ApiService,
    private storage: Storage,
    private loadingController:LoadingController
  ) {
    this.storage.create();
  }
  async ngOnInit() { }

  togglePassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  async login() {

    const loading =await this.loadingController.create({
      message: 'Logging in...',
      duration: 2000
    });
    await loading.present();

    this.apiService.login(this.username, this.password).subscribe(async (response: any) => {
      console.log('API response:', response);

      if (response.data && response.data.length > 0) {
        const loginResult = response.data[0];
        console.log('Login result:', loginResult);
        if (loginResult.STATUS == 1) {
          await this.databaseService.addUser(this.username, this.password);
          await this.storage.set('user', this.username);

          const toast = await this.toastController.create({
            message: 'Login successful',
            duration: 2000,
            color: 'success'
          });
          await toast.present();
          this.router.navigate(['organization']);
        }
        else {
          const toast = await this.toastController.create({
            message: 'Invalid username or password',
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
        }
      }else {
        const toast = await this.toastController.create({
          message:'Unexpected Api response',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    }, async (error) => {
      console.error('error logging in', error);

      const toast = await this.toastController.create({
        message: 'Error logging in',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();

    });
  }
}

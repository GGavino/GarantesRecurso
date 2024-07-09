import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-menu-registo',
  templateUrl: './menu-registo.page.html',
  styleUrls: ['./menu-registo.page.scss'],
})

export class MenuRegistoPage {
  public registerForm: FormGroup

  email: string = '';
  nome: string = '';
  apelido: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,
    private alertController: AlertController,
    private storage: Storage, private toastController: ToastController) {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      apelido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.storage.create();
  }

  async registar() {
    if (this.registerForm.valid) {
      const { email, nome, apelido, password } = this.registerForm.value;
      await this.authService.register(email, nome, apelido, password);
      await this.storage.set(`user_${email}`, { nome, apelido, email });

      const alert = await this.alertController.create({
        header: 'Registo',
        message: 'O seu registo foi feito com sucesso!',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              console.log('Exiting...');
              document.body.classList.add('logout-animation');
              setTimeout(() => {
                // Redirecionar após a animação
                this.clearFields();
                this.router.navigateByUrl('/menu-entrada');
              }, 300); // Duração da animação em milissegundos
            }
          }
        ]
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos corretamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  clearFields() {
    this.registerForm.reset();
  }

}

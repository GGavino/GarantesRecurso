import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

// Interface para representar os dados de um utilizador
interface User {
  email: string;
  nome: string;
  apelido: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private USERS_KEY = 'users';
  
  constructor(private appStorage: Storage) { }

  // Método para realizar o login
  async login(email: string, password: string): Promise<boolean> {
    const users: User[] = await this.appStorage.get(this.USERS_KEY) || [];
    return users.some(user => user.email === email && user.password === password);
  }

  // Método para registrar um novo utilizador
  async register(email: string, nome: string, apelido: string, password: string): Promise<void> {
    const users: User[] = await this.appStorage.get(this.USERS_KEY) || [];
    const newUser = { email, nome, apelido, password };
    users.push(newUser);
    await this.appStorage.set(this.USERS_KEY, users);
    await this.appStorage.set(`user_${email}`, newUser); // Armazena os dados do utilizador separadamente
  }

  // Método para obter todos os utilizadores registrados
  async getUsers(): Promise<User[]> {
    return await this.appStorage.get(this.USERS_KEY) || [];
  }

}

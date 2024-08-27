import { Injectable } from '@angular/core';
// import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import {Storage}from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db:SQLiteObject | undefined;
  // private sqlite:SQLiteConnection; 

  constructor(private storage:Storage,private sqlite:SQLite) {
    this.initializeDb();
   }
  async initializeDb(){
    await this.storage.create();
    this.sqlite.create({
      name:'login.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      this.db=db;
      this.createTable();
    })
  }
async createTable(){
  await this.db?.executeSql( `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
    )`,[]);
    console.log ('table created');
  }
  async createOrgTable(){
    await this.db?.executeSql( `CREATE TABLE IF NOT EXISTS orgs(
      organization TEXT NOT NULL
    )'`,[]);
  }

  async addUser(username:string, password:string){
    await this.db?.executeSql(`INSERT INTO users(username, password) VALUES(?,?)`,[username, password]);
    console.log('user added');
  }
  async getUsers(username:string):Promise<any>{
    const result = await this.db?.executeSql('SELECT * FROM users WHERE username=?',[username]);
    return result.rows.item(0);
  }

  async addOrg(organization:string){
    await this.db?.executeSql(`INSERT INTO orgs(organization) VALUES(?)`,[organization]);
  }

  async getOrgs():Promise<any>{
    const result = await this.db?.executeSql('SELECT * FROM orgs');
    return result.rows.item(0);
  }

}

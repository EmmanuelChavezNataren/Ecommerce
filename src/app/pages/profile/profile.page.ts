import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  constructor(private storage: StorageService) {
  }

  ngOnInit() {
    this.getUserData();
  }

  async getUserData(){
    this.user = await this.storage.getDataObject('user');
    console.log(this.user);
  }

}

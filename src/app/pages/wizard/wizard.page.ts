import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage implements OnInit {
  constructor(private router: Router, public storage: StorageService) {
  }

  ngOnInit() {
  }

  login(){
    this.storage.setData('firstLoad', true)
      .then(() => {
        this.router.navigateByUrl('/login');
    });
  }

}

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';


@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    title = "Grocery List";



    constructor(private toastCtrl: ToastController, private alertController: AlertController, public dataService: GroceriesServiceService, public inputDialogService: InputDialogServiceService, public SocialSharing: SocialSharing) {

    }

    ngOnInit() {
    }

    loadItems() {
        return this.dataService.getItems();
    }

    async removeItem(item, index) {
        console.log("Removing ", item, index);
        const toast = await this.toastCtrl.create({
            message: 'Removing ' + item.name,
            duration: 3000,
            position: 'top'
        });

        toast.present();

        this.dataService.removeItem(index, item)

    }

    async shareItem(item, index) {
        console.log("Sharing ", item, index);
        const toast = await this.toastCtrl.create({
            message: 'Sharing ' + item.name,
            duration: 3000,
            position: 'top'
        });

        toast.present();

      let message = "Grocery Item - Name: " + item.name + "- Quantity: " + item.quantity;
      let subject = "Shared via Groceries App";
      this.SocialSharing.share(message, subject).then(() => {
        console.log("Successfully Shared!");
      }).catch(() => {
        console.error("Error while Sharing");
      });

    }

    async editItem(item, index) {
        console.log("Editing ", item, index);
        const toast = await this.toastCtrl.create({
            message: 'Editing ' + item.name,
            duration: 3000,
            position: 'top'
        });

        toast.present();

        this.inputDialogService.showPrompt(item, index);

    }

    addItem() {
        console.log("Adding Items");
        this.inputDialogService.showPrompt();
    }




}

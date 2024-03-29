import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';
import { HomePage } from '../home/home';
import { WavesProvider } from '../../providers/waves/waves';
import { CreateProcessPage } from '../create-process/create-process';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public userPhrase : any;
  public projectPhrase : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private messagesProvider:MessagesProvider, private wavesProvider : WavesProvider) {
  }

  ionViewDidLoad() {
    if(localStorage['userPhrase'] != "" && localStorage['projectPhrase'] != ""){
      this.navCtrl.push(HomePage);
    }
  }

  login(){
    if(this.messagesProvider.alert(((this.userPhrase == "" || this.userPhrase == undefined) 
                                    && (this.projectPhrase == undefined || this.projectPhrase == "")) 
                                    || (this.userPhrase == "" || this.userPhrase == undefined) ,"Error", "Phrase is missing"))return;
    
    localStorage['userPhrase'] = this.userPhrase;
    localStorage['projectPhrase'] = this.projectPhrase;

    console.log("Login: ProjectPhrase: " + localStorage['projectPhrase']);
    
    if((this.projectPhrase == "" || this.projectPhrase == undefined) 
        && (this.userPhrase != "" && this.userPhrase != undefined)){
          /** Create project  */
          this.navCtrl.push(CreateProcessPage);
    }else{
          /** Menu page  */
          this.navCtrl.push(HomePage);
    }

  }

  createAccount(){
    const seed = this.wavesProvider.createSeed();
    var message = '<p>Phrase: ' + seed.phrase + "</p>"+
                  "<p>Address: " + seed.address +  "</p>"+
                  '<p>PublicKey: ' + seed.keyPair.publicKey +"</p>"+
                  "<p>PrivateKey: " + seed.keyPair.privateKey + "</p>";

    this.messagesProvider.alert(true, "Result",message) ;
  }

  createProject(){
    this.navCtrl.push(CreateProcessPage);
  }

  testSend(){
    //this.wavesProvider.sendWaves();
  }
}

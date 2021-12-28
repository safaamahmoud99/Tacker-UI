import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(['English', 'العربية']);
    translate.setDefaultLang('English');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/English|العربية/) ? browserLang : 'English');
  }
  title = 'trackerSystem';
}

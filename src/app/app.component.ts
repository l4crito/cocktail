import { Component } from '@angular/core';
import { topToBottomAnimation } from 'src/shared/animations';
import { UpdateService } from 'src/shared/services/UpdateService';

@Component({
  animations:[topToBottomAnimation],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public updateService: UpdateService) { }
  title = 'cocktail';
}

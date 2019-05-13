import { Component, OnInit, Input, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  cord = [48.80694608466021, 24.53698919739122];

  constructor(private bottomSheet: MatBottomSheet) {}

  onChangeLocation(event) {
    this.cord[0] = event.coords.lat;
    this.cord[1] = event.coords.lng;
    this.openBottomSheet();
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: this.cord


    });
  }

  ngOnInit() {}
}

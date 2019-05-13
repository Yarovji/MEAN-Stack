import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { WeatherKursService } from '../weather-kurs.service';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {
  dataWeatherTemp: string;
  clickCountryCash: string;
  clickCountryName: string;
  clickCityName: string;
  kyrsData: string;
  kyrsDataDolar: string;
  yearAray = [];
  kyrsArray = [];
  showDiv = false;
  y: any;
  m: string;
  d: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private serv: WeatherKursService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit() {
    this.weatherShow(this.data[0], this.data[1]);


  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  weatherShow(lat: string, lng: string) {
    this.serv.getWeather(lat, lng).subscribe(data => {
      this.clickCityName = data.name;
      this.dataWeatherTemp = (data.main.temp - 273.15).toFixed(2);
      for (const cntr in this.serv.cashName()) {
        if (cntr === data.sys.country) {
          this.clickCountryCash = this.serv.cashName()[cntr];
          this.clickCountryName = this.serv.countryName()[cntr];
          this.serv.getKyrs2().subscribe( data => {
            this.kyrsDataDolar = `1$ = ${(data.rates[this.clickCountryCash]).toFixed(4)} ${this.clickCountryCash}`;
            if (data.rates.UAH / data.rates[this.clickCountryCash] < 1) {
              this.kyrsData = `100 ${this.clickCountryCash} = ${(
                (data.rates.UAH * 100) /
                data.rates[this.clickCountryCash]
              ).toFixed(4)} UAH`;
            } else {
              this.kyrsData = `1 ${this.clickCountryCash} = ${(
                data.rates.UAH / data.rates[this.clickCountryCash]
              ).toFixed(4)} UAH`;
            }
          });
        }
      }
      this.go(this.clickCountryCash)
    });


  }

  go(chuseCountry: string) {
    let newTime = new Date();
    let nowCTime = moment(newTime).format('L').split('/');
    this.y = nowCTime[2];
    this.m = nowCTime[0];
    this.d = nowCTime[1];
    const years = {};

    for (let i = 0; i <10; i++) {
      years[i] = this.serv.getKyrs3(this.y,this.m,this.d);
      this.y--;
    }

    forkJoin(years).subscribe((data: any) => {
      for (const key in data) {
        this.yearAray.push((moment(data[key].timestamp * 1000).format('L').split('/'))[2]);
        this.kyrsArray.push(data[key].rates[chuseCountry].toFixed(2))
      }
      }
    );
  }
}

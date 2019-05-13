import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostsModule } from './posts/posts.module';
import { MapsComponent } from './maps/maps.component';
import { AgmCoreModule } from '@agm/core';
import { BottomSheetComponent } from './maps/bottom-sheet/bottom-sheet.component';
import { WeatherComponent } from './maps/weather/weather.component';
import { CashGraphsComponent } from './maps/cash-graphs/cash-graphs.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    MapsComponent,
    BottomSheetComponent,
    WeatherComponent,
    CashGraphsComponent
  ],
  imports: [
    FormsModule, ChartsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDt5PrKNshJNV7Ap9jR0v-4_3dDAmMF-_s'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, BottomSheetComponent]
})
export class AppModule {}

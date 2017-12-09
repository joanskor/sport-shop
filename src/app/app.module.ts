import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './product.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartService } from './shopping-cart.service';
import { AppRoutingModule } from './/app-routing.module';
import { AddressFormComponent } from './address-form/address-form.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminPanelService } from './admin-panel.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginRegisterService } from './login-register.service';
import { AdminPanelProductsComponent } from './admin-panel-products/admin-panel-products.component';
import { AdminPanelOrdersComponent } from './admin-panel-orders/admin-panel-orders.component';
import { AdminPanelOrdersCompletedComponent } from './admin-panel-orders-completed/admin-panel-orders-completed.component';
import { AdminPanelOrdersMenuComponent } from './admin-panel-orders-menu/admin-panel-orders-menu.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderSentComponent } from './order-sent/order-sent.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ShoppingCartComponent,
    AddressFormComponent,
    AdminPanelComponent,
    LoginComponent,
    RegisterComponent,
    AdminPanelProductsComponent,
    AdminPanelOrdersComponent,
    AdminPanelOrdersCompletedComponent,
    AdminPanelOrdersMenuComponent,
    EditProductComponent,
    OrderSentComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [ 
    ProductService, 
    ShoppingCartService, 
    AdminPanelService,
    LoginRegisterService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

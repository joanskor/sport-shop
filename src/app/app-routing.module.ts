import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminPanelProductsComponent } from './admin-panel-products/admin-panel-products.component';
import { AdminPanelOrdersMenuComponent } from './admin-panel-orders-menu/admin-panel-orders-menu.component';
import { AdminPanelOrdersComponent } from './admin-panel-orders/admin-panel-orders.component';
import { AdminPanelOrdersCompletedComponent } from './admin-panel-orders-completed/admin-panel-orders-completed.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderSentComponent } from './order-sent/order-sent.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'address-form', component: AddressFormComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'admin-panel-products', component: AdminPanelProductsComponent },
  { path: 'admin-panel-orders-menu', component: AdminPanelOrdersMenuComponent },
  { path: 'admin-panel-orders', component: AdminPanelOrdersComponent },
  { path: 'admin-panel-orders-completed', component: AdminPanelOrdersCompletedComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'order-sent', component: OrderSentComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

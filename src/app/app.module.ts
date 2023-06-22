// default
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// shared
import { AppRoutingModule } from './app-routing.module';
import { AuthenRoutingModule } from 'src/sub-module/authentication/authen.routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from 'src/shared/layouts/header/header.component';
import { SidebarComponent } from 'src/shared/layouts/sidebar/sidebar.component';
import { PaginationComponent } from 'src/shared/layouts/pagination/pagination.component';
import { DialogComponent } from 'src/shared/dialog/dialog.component';
import { FilterComponent } from 'src/shared/layouts/filter/filter.component';
import { AlertComponent } from 'src/shared/alert/alert.component';
import { TableComponent } from 'src/shared/layouts/table/table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { TempMenuComponent } from 'src/sub-module/temp/temp-menu/temp-menu.component';
// global
import { globalConstant } from 'src/shared/globalConstant';
// plugins
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
// provider
import { Alert } from 'src/shared/alert/alert.model';
import { UploadFile } from 'src/shared/model/upload-file.model';
import { Dialog } from 'src/shared/dialog/dialog.model';
import { DatePipe } from '@angular/common';
import { UserTable } from 'src/sub-module/authentication/model/user-table.model';
import { OwnerTable } from 'src/sub-module/authentication/model/owner-table.model';
import { RoleTable } from 'src/sub-module/authentication/model/role-table.model';
import { ChannelTable } from 'src/sub-module/order/model/channel-table.model';
import { DeliverySubtypeTable } from 'src/sub-module/order/model/delivery-subtype-table.model';
import { DeliveryTypeTable } from 'src/sub-module/order/model/delivery-type-table.model';
import { FulfillmentOptionTable } from 'src/sub-module/order/model/fulfillment-option-table.model';
import { FulfillmentPriorityTable } from 'src/sub-module/order/model/fulfillment-priority-table.model';
import { FulfillmentTypeTable } from 'src/sub-module/order/model/fulfillment-type-table.model';
import { FunctionConfigTable } from 'src/sub-module/order/model/function-config-table.model';
import { OrderFulfillmentTypeTable } from 'src/sub-module/order/model/order-fulfillment-type-table.model';
import { OrderTypeTable } from 'src/sub-module/order/model/order-type-table.model';
import { DeliveryTypeSearch } from 'src/sub-module/order/model/delivery-type-search.model';
import { DeliverySubtypeSearch } from 'src/sub-module/order/model/delivery-subtype-search.model';
import { StatusTable } from 'src/sub-module/order/model/status-table.model';
import { RunningNumberTypeTable } from 'src/sub-module/order/model/running-number-type-table.model';
import { RunningNumberTable } from 'src/sub-module/order/model/running-number-table.model';
// authen
import { LoginComponent } from 'src/sub-module/authentication/login/login.component';
import { RegisterComponent } from 'src/sub-module/authentication/register/register.component';
import { UserManagementComponent } from 'src/sub-module/authentication/user-management/user-management.component';
import { UserFormComponent } from 'src/sub-module/authentication/user-form/user-form.component';
import { OwnerManagementComponent } from 'src/sub-module/authentication/owner-management/owner-management.component';
import { OwnerFormComponent } from 'src/sub-module/authentication/owner-form/owner-form.component';
import { RoleManagementComponent } from 'src/sub-module/authentication/role-management/role-management.component';
import { RoleFormComponent } from 'src/sub-module/authentication/role-form/role-form.component';
import { ProfileComponent } from 'src/sub-module/authentication/profile/profile.component';
import { ResetPasswordComponent } from 'src/sub-module/authentication/reset-password/reset-password.component';
// setting
import { SettingComponent } from 'src/sub-module/setting/setting/setting.component';
// order
import { ChannelManagementComponent } from 'src/sub-module/order/config/channel-management/channel-management.component';
import { ChannelFormComponent } from 'src/sub-module/order/config/channel-form/channel-form.component';
import { DeliverySubtypeManagementComponent } from 'src/sub-module/order/config/delivery-subtype-management/delivery-subtype-management.component';
import { DeliverySubtypeFormComponent } from 'src/sub-module/order/config/delivery-subtype-form/delivery-subtype-form.component';
import { DeliveryTypeManagementComponent } from 'src/sub-module/order/config/delivery-type-management/delivery-type-management.component';
import { DeliveryTypeFormComponent } from 'src/sub-module/order/config/delivery-type-form/delivery-type-form.component';
import { FulfillmentOptionManagementComponent } from 'src/sub-module/order/config/fulfillment-option-management/fulfillment-option-management.component';
import { FulfillmentOptionFormComponent } from 'src/sub-module/order/config/fulfillment-option-form/fulfillment-option-form.component';
import { FulfillmentPriorityManagementComponent } from 'src/sub-module/order/config/fulfillment-priority-management/fulfillment-priority-management.component';
import { FulfillmentPriorityFormComponent } from 'src/sub-module/order/config/fulfillment-priority-form/fulfillment-priority-form.component';
import { FulfillmentTypeManagementComponent } from 'src/sub-module/order/config/fulfillment-type-management/fulfillment-type-management.component';
import { FulfillmentTypeFormComponent } from 'src/sub-module/order/config/fulfillment-type-form/fulfillment-type-form.component';
import { FunctionConfigManagementComponent } from 'src/sub-module/order/config/function-config-management/function-config-management.component';
import { FunctionConfigFormComponent } from 'src/sub-module/order/config/function-config-form/function-config-form.component';
import { OrderFulfillmentTypeManagementComponent } from 'src/sub-module/order/config/order-fulfillment-type-management/order-fulfillment-type-management.component';
import { OrderFulfillmentTypeFormComponent } from 'src/sub-module/order/config/order-fulfillment-type-form/order-fulfillment-type-form.component';
import { OrderTypeManagementComponent } from 'src/sub-module/order/config/order-type-management/order-type-management.component';
import { OrderTypeFormComponent } from 'src/sub-module/order/config/order-type-form/order-type-form.component';
import { StatusManagementComponent } from 'src/sub-module/order/config/status-management/status-management.component';
import { StatusFormComponent } from 'src/sub-module/order/config/status-form/status-form.component';
import { RunningNumberTypeManagementComponent } from 'src/sub-module/order/config/running-number-type-management/running-number-type-management.component';
import { RunningNumberTypeFormComponent } from 'src/sub-module/order/config/running-number-type-form/running-number-type-form.component';
import { GenerateRunningNumberComponent } from 'src/sub-module/order/config/generate-running-number/generate-running-number.component';
import { RunningNumberManagementComponent } from 'src/sub-module/order/config/running-number-management/running-number-management.component';
import { RunningNumberFormComponent } from 'src/sub-module/order/config/running-number-form/running-number-form.component';

@NgModule({
  declarations: [
    AppComponent,
    // shared
    HeaderComponent,
    SidebarComponent,
    AlertComponent,
    DialogComponent,
    PaginationComponent,
    FilterComponent,
    TableComponent,
    TempMenuComponent,
    // authen
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    UserFormComponent,
    OwnerManagementComponent,
    OwnerFormComponent,
    RoleManagementComponent,
    RoleFormComponent,
    ProfileComponent,
    ResetPasswordComponent,
    // setting
    SettingComponent,
    // order
    ChannelManagementComponent,
    ChannelFormComponent,
    DeliverySubtypeManagementComponent,
    DeliverySubtypeFormComponent,
    DeliveryTypeManagementComponent,
    DeliveryTypeFormComponent,
    FulfillmentOptionManagementComponent,
    FulfillmentOptionFormComponent,
    FulfillmentPriorityManagementComponent,
    FulfillmentPriorityFormComponent,
    FulfillmentTypeManagementComponent,
    FulfillmentTypeFormComponent,
    FunctionConfigManagementComponent,
    FunctionConfigFormComponent,
    OrderFulfillmentTypeManagementComponent,
    OrderFulfillmentTypeFormComponent,
    OrderTypeManagementComponent,
    OrderTypeFormComponent,
    StatusManagementComponent,
    StatusFormComponent,
    RunningNumberTypeManagementComponent,
    RunningNumberTypeFormComponent,
    GenerateRunningNumberComponent,
    RunningNumberManagementComponent,
    RunningNumberFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthenRoutingModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    HttpClientModule,
    DragDropModule,
    NgxBarcode6Module,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          { id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider(globalConstant.googleClientId) },
          { id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider(globalConstant.facebookClientId) }
        ],
        onError: (err) => { console.error(err); }
      } as SocialAuthServiceConfig,
    },
    Alert,
    Dialog,
    UploadFile,
    DatePipe,
    UserTable,
    OwnerTable,
    RoleTable,
    ChannelTable,
    DeliverySubtypeTable,
    DeliveryTypeTable,
    FulfillmentOptionTable,
    FulfillmentPriorityTable,
    FulfillmentTypeTable,
    FunctionConfigTable,
    OrderFulfillmentTypeTable,
    OrderTypeTable,
    DeliveryTypeSearch,
    DeliverySubtypeSearch,
    StatusTable,
    RunningNumberTypeTable,
    RunningNumberTable
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

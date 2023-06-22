import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/auth.guard';
import { ChannelManagementComponent } from './config/channel-management/channel-management.component';
import { ChannelFormComponent } from './config/channel-form/channel-form.component';
import { DeliverySubtypeManagementComponent } from './config/delivery-subtype-management/delivery-subtype-management.component';
import { DeliverySubtypeFormComponent } from './config/delivery-subtype-form/delivery-subtype-form.component';
import { DeliveryTypeManagementComponent } from './config/delivery-type-management/delivery-type-management.component';
import { DeliveryTypeFormComponent } from './config/delivery-type-form/delivery-type-form.component';
import { FunctionConfigManagementComponent } from './config/function-config-management/function-config-management.component';
import { FunctionConfigFormComponent } from './config/function-config-form/function-config-form.component';
import { FulfillmentOptionManagementComponent } from './config/fulfillment-option-management/fulfillment-option-management.component';
import { FulfillmentOptionFormComponent } from './config/fulfillment-option-form/fulfillment-option-form.component';
import { FulfillmentPriorityManagementComponent } from './config/fulfillment-priority-management/fulfillment-priority-management.component';
import { FulfillmentPriorityFormComponent } from './config/fulfillment-priority-form/fulfillment-priority-form.component';
import { FulfillmentTypeManagementComponent } from './config/fulfillment-type-management/fulfillment-type-management.component';
import { FulfillmentTypeFormComponent } from './config/fulfillment-type-form/fulfillment-type-form.component';
import { OrderFulfillmentTypeManagementComponent } from './config/order-fulfillment-type-management/order-fulfillment-type-management.component';
import { OrderFulfillmentTypeFormComponent } from './config/order-fulfillment-type-form/order-fulfillment-type-form.component';
import { OrderTypeManagementComponent } from './config/order-type-management/order-type-management.component';
import { OrderTypeFormComponent } from './config/order-type-form/order-type-form.component';
import { GenerateRunningNumberComponent } from './config/generate-running-number/generate-running-number.component';
import { RunningNumberManagementComponent } from './config/running-number-management/running-number-management.component';
import { RunningNumberFormComponent } from './config/running-number-form/running-number-form.component';
import { RunningNumberTypeManagementComponent } from './config/running-number-type-management/running-number-type-management.component';
import { RunningNumberTypeFormComponent } from './config/running-number-type-form/running-number-type-form.component';
import { StatusManagementComponent } from './config/status-management/status-management.component';
import { StatusFormComponent } from './config/status-form/status-form.component';
import { StoreManagementComponent } from './store-management/store-management.component';
import { CompanyManagementComponent } from './company-management/company-management.component';

const routes: Routes = [
  // store
  { path: 'store-management', component: StoreManagementComponent, canActivate: [AuthGuard] },
  // company
  { path: 'company-management', component: CompanyManagementComponent, canActivate: [AuthGuard] },
  // config
  { path: 'config/channel-management', component: ChannelManagementComponent, canActivate: [AuthGuard] },
  { path: 'config/channel-form', component: ChannelFormComponent, canActivate: [AuthGuard] },
  { path: 'config/channel-form/:channelId', component: ChannelFormComponent, canActivate: [AuthGuard] },
  { path: 'config/delivery-subtype-management', component: DeliverySubtypeManagementComponent, canActivate: [AuthGuard] },
  { path: 'config/delivery-subtype-form', component: DeliverySubtypeFormComponent, canActivate: [AuthGuard] },
  { path: 'config/delivery-subtype-form/:deliverySubTypeId', component: DeliverySubtypeFormComponent, canActivate: [AuthGuard] },
  { path: 'config/delivery-type-management', component: DeliveryTypeManagementComponent, canActivate: [AuthGuard] },
  { path: 'config/delivery-type-form', component: DeliveryTypeFormComponent, canActivate: [AuthGuard] },
  { path: 'config/delivery-type-form/:deliveryTypeId', component: DeliveryTypeFormComponent, canActivate: [AuthGuard] },
  { path: 'config/function-config-management', component: FunctionConfigManagementComponent, canActivate: [AuthGuard] },
  { path: 'config/function-config-form', component: FunctionConfigFormComponent, canActivate: [AuthGuard] },
  { path: 'config/function-config-form/:functionConfigId', component: FunctionConfigFormComponent, canActivate: [AuthGuard] },
  { path: 'config/fulfillment-option-management', component: FulfillmentOptionManagementComponent, canActivate: [AuthGuard] },
  { path: 'config/fulfillment-option-form', component: FulfillmentOptionFormComponent, canActivate: [AuthGuard] },
  { path: 'config/fulfillment-option-form/:fulfillmentOptionId', component: FulfillmentOptionFormComponent, canActivate: [AuthGuard] },
  { path: 'config/fulfillment-priority-management', component: FulfillmentPriorityManagementComponent, canActivate: [AuthGuard] },
  { path: 'config/fulfillment-priority-form', component: FulfillmentPriorityFormComponent, canActivate: [AuthGuard] },
  { path: 'config/fulfillment-priority-form/:fulfillmentPriorityId', component: FulfillmentPriorityFormComponent, canActivate: [AuthGuard] },
  { path: 'config/fulfillment-type-management', component: FulfillmentTypeManagementComponent, canActivate: [AuthGuard] },
  { path: 'config/fulfillment-type-form', component: FulfillmentTypeFormComponent, canActivate: [AuthGuard] },
  { path: 'config/fulfillment-type-form/:fulfillmentTypeId', component: FulfillmentTypeFormComponent, canActivate: [AuthGuard] },
  { path: 'config/order-fulfillment-type-management', component: OrderFulfillmentTypeManagementComponent, canActivate: [AuthGuard] },
  { path: 'config/order-fulfillment-type-form', component: OrderFulfillmentTypeFormComponent, canActivate: [AuthGuard] },
  { path: 'config/order-fulfillment-type-form/:orderFulfillmentTypeId', component: OrderFulfillmentTypeFormComponent, canActivate: [AuthGuard] },
  { path: 'config/order-type-management', component: OrderTypeManagementComponent, canActivate: [AuthGuard] },
  { path: 'config/order-type-form', component: OrderTypeFormComponent, canActivate: [AuthGuard] },
  { path: 'config/order-type-form/:orderTypeId', component: OrderTypeFormComponent, canActivate: [AuthGuard] },
  { path: 'config/generate-running-number', component: GenerateRunningNumberComponent, canActivate: [AuthGuard] },
  { path: 'config/running-number-management', component: RunningNumberManagementComponent, canActivate: [AuthGuard] },
  { path: 'config/running-number-form/:runningNumberId', component: RunningNumberFormComponent, canActivate: [AuthGuard] },
  { path: 'config/running-number-type-management', component: RunningNumberTypeManagementComponent, canActivate: [AuthGuard] },
  { path: 'config/running-number-type-form', component: RunningNumberTypeFormComponent, canActivate: [AuthGuard] },
  { path: 'config/running-number-type-form/:runningNumberTypeId', component: RunningNumberTypeFormComponent, canActivate: [AuthGuard] },
  { path: 'config/status-management', component: StatusManagementComponent, canActivate: [AuthGuard] },
  { path: 'config/status-form', component: StatusFormComponent, canActivate: [AuthGuard] },
  { path: 'config/status-form/:statusId', component: StatusFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class OrderRoutingModule { }

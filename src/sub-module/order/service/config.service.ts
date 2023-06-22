import { Injectable } from '@angular/core';
import { globalConstant } from 'src/shared/globalConstant';
import { HttpService } from 'src/shared/service/http.service';
import { SecureService } from 'src/shared/service/secure.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  channelUrl = globalConstant.baseDevUrl.orderUrl + 'sysChannel';
  deliverySubTypeUrl = globalConstant.baseDevUrl.orderUrl + 'sysDeliverySubType';
  deliveryTypeUrl = globalConstant.baseDevUrl.orderUrl + 'sysDeliveryType';
  fulfillmentOptionUrl = globalConstant.baseDevUrl.orderUrl + 'sysFulfillmentOption';
  fulfillmentPriorityUrl = globalConstant.baseDevUrl.orderUrl + 'sysFulfillmentPriority';
  fulfillmentTypeUrl = globalConstant.baseDevUrl.orderUrl + 'sysFulfillmentType';
  functionConfigUrl = globalConstant.baseDevUrl.orderUrl + 'sysFunctionConfig';
  orderFulfillmentTypeUrl = globalConstant.baseDevUrl.orderUrl + 'sysOrderFulfillmentType';
  orderTypeUrl = globalConstant.baseDevUrl.orderUrl + 'sysOrderType';
  statusUrl = globalConstant.baseDevUrl.orderUrl + 'sysStatus';
  runningNumberUrl = globalConstant.baseDevUrl.orderUrl + 'sysRunningNumber';
  runningNumberTypeUrl = globalConstant.baseDevUrl.orderUrl + 'sysRunningNumberType';

  constructor(
    private httpService: HttpService,
    private secureService: SecureService
  ) {}

  // Channel
  getSysChannels(body: any) {
    return this.httpService.get(`${this.channelUrl}/getSysChannels?param=${this.secureService.encrypt(body)}`);
  }
  createSysChannel(body: any) {
    return this.httpService.post(`${this.channelUrl}/createSysChannel`, body);
  }
  getSysChannelById(body: any) {
    return this.httpService.get(`${this.channelUrl}/getSysChannelById?param=${this.secureService.encrypt(body)}`);
  }
  updateSysChannel(body: any) {
    return this.httpService.patch(`${this.channelUrl}/updateSysChannel`, body);
  }
  deleteSysChannel(body: any) {
    return this.httpService.delete(`${this.channelUrl}/deleteSysChannel?param=${this.secureService.encrypt(body)}`);
  }
  activeSysChannel(body: any) {
    return this.httpService.patch(`${this.channelUrl}/activateSysChannel`, body);
  }

  // Delivery Sub Type
  getSysDeliverySubTypes(body: any) {
    return this.httpService.get(`${this.deliverySubTypeUrl}/getSysDeliverySubTypes?param=${this.secureService.encrypt(body)}`);
  }
  createSysDeliverySubType(body: any) {
    return this.httpService.post(`${this.deliverySubTypeUrl}/createSysDeliverySubType`, body);
  }
  getSysDeliverySubTypeById(body: any) {
    return this.httpService.get(`${this.deliverySubTypeUrl}/getSysDeliverySubTypeById?param=${this.secureService.encrypt(body)}`);
  }
  updateSysDeliverySubType(body: any) {
    return this.httpService.patch(`${this.deliverySubTypeUrl}/updateSysDeliverySubType`, body);
  }
  deleteSysDeliverySubType(body: any) {
    return this.httpService.delete(`${this.deliverySubTypeUrl}/deleteSysDeliverySubType?param=${this.secureService.encrypt(body)}`);
  }
  activeSysDeliverySubType(body: any) {
    return this.httpService.patch(`${this.deliverySubTypeUrl}/activateSysDeliverySubType`, body);
  }

  // Delivery Type
  getSysDeliveryTypes(body: any) {
    return this.httpService.get(`${this.deliveryTypeUrl}/getSysDeliveryTypes?param=${this.secureService.encrypt(body)}`);
  }
  createSysDeliveryType(body: any) {
    return this.httpService.post(`${this.deliveryTypeUrl}/createSysDeliveryType`, body);
  }
  getSysDeliveryTypeById(body: any) {
    return this.httpService.get(`${this.deliveryTypeUrl}/getSysDeliveryTypeById?param=${this.secureService.encrypt(body)}`);
  }
  updateSysDeliveryType(body: any) {
    return this.httpService.patch(`${this.deliveryTypeUrl}/updateSysDeliveryType`, body);
  }
  deleteSysDeliveryType(body: any) {
    return this.httpService.delete(`${this.deliveryTypeUrl}/deleteSysDeliveryType?param=${this.secureService.encrypt(body)}`);
  }
  activeSysDeliveryType(body: any) {
    return this.httpService.patch(`${this.deliveryTypeUrl}/activateSysDeliveryType`, body);
  }

  // Fulfillment Option
  getSysFulfillmentOptions(body: any) {
    return this.httpService.get(`${this.fulfillmentOptionUrl}/getSysFulfillmentOptions?param=${this.secureService.encrypt(body)}`);
  }
  createSysFulfillmentOption(body: any) {
    return this.httpService.post(`${this.fulfillmentOptionUrl}/createSysFulfillmentOption`, body);
  }
  getSysFulfillmentOptionById(body: any) {
    return this.httpService.get(`${this.fulfillmentOptionUrl}/getSysFulfillmentOptionById?param=${this.secureService.encrypt(body)}`);
  }
  updateSysFulfillmentOption(body: any) {
    return this.httpService.patch(`${this.fulfillmentOptionUrl}/updateSysFulfillmentOption`, body);
  }
  deleteSysFulfillmentOption(body: any) {
    return this.httpService.delete(`${this.fulfillmentOptionUrl}/deleteSysFulfillmentOption?param=${this.secureService.encrypt(body)}`);
  }
  activeSysFulfillmentOption(body: any) {
    return this.httpService.patch(`${this.fulfillmentOptionUrl}/activateSysFulfillmentOption`, body);
  }

  // Fulfillment Priority
  getSysFulfillmentPrioritys(body: any) {
    return this.httpService.get(`${this.fulfillmentPriorityUrl}/getSysFulfillmentPrioritys?param=${this.secureService.encrypt(body)}`);
  }
  createSysFulfillmentPriority(body: any) {
    return this.httpService.post(`${this.fulfillmentPriorityUrl}/createSysFulfillmentPriority`, body);
  }
  getSysFulfillmentPriorityById(body: any) {
    return this.httpService.get(`${this.fulfillmentPriorityUrl}/getSysFulfillmentPriorityById?param=${this.secureService.encrypt(body)}`);
  }
  updateSysFulfillmentPriority(body: any) {
    return this.httpService.patch(`${this.fulfillmentPriorityUrl}/updateSysFulfillmentPriority`, body);
  }
  deleteSysFulfillmentPriority(body: any) {
    return this.httpService.delete(`${this.fulfillmentPriorityUrl}/deleteSysFulfillmentPriority?param=${this.secureService.encrypt(body)}`);
  }
  activeSysFulfillmentPriority(body: any) {
    return this.httpService.patch(`${this.fulfillmentPriorityUrl}/activateSysFulfillmentPriority`, body);
  }
  
  // Fulfillment Type
  getSysFulfillmentTypes(body: any) {
    return this.httpService.get(`${this.fulfillmentTypeUrl}/getSysFulfillmentTypes?param=${this.secureService.encrypt(body)}`);
  }
  createSysFulfillmentType(body: any) {
    return this.httpService.post(`${this.fulfillmentTypeUrl}/createSysFulfillmentType`, body);
  }
  getSysFulfillmentTypeById(body: any) {
    return this.httpService.get(`${this.fulfillmentTypeUrl}/getSysFulfillmentTypeById?param=${this.secureService.encrypt(body)}`);
  }
  updateSysFulfillmentType(body: any) {
    return this.httpService.patch(`${this.fulfillmentTypeUrl}/updateSysFulfillmentType`, body);
  }
  deleteSysFulfillmentType(body: any) {
    return this.httpService.delete(`${this.fulfillmentTypeUrl}/deleteSysFulfillmentType?param=${this.secureService.encrypt(body)}`);
  }
  activeSysFulfillmentType(body: any) {
    return this.httpService.patch(`${this.fulfillmentTypeUrl}/activateSysFulfillmentType`, body);
  }

  // Function Config
  getSysFunctionConfigs(body: any) {
    return this.httpService.get(`${this.functionConfigUrl}/getSysFunctionConfigs?param=${this.secureService.encrypt(body)}`);
  }
  createSysFunctionConfig(body: any) {
    return this.httpService.post(`${this.functionConfigUrl}/createSysFunctionConfig`, body);
  }
  getSysFunctionConfigById(body: any) {
    return this.httpService.get(`${this.functionConfigUrl}/getSysFunctionConfigById?param=${this.secureService.encrypt(body)}`);
  }
  updateSysFunctionConfig(body: any) {
    return this.httpService.patch(`${this.functionConfigUrl}/updateSysFunctionConfig`, body);
  }
  deleteSysFunctionConfig(body: any) {
    return this.httpService.delete(`${this.functionConfigUrl}/deleteSysFunctionConfig?param=${this.secureService.encrypt(body)}`);
  }
  activeSysFunctionConfig(body: any) {
    return this.httpService.patch(`${this.functionConfigUrl}/activateSysFunctionConfig`, body);
  }

  // Order FulFillment Type
  getSysOrderFulfillmentTypes(body: any) {
    return this.httpService.get(`${this.orderFulfillmentTypeUrl}/getSysOrderFulfillmentTypes?param=${this.secureService.encrypt(body)}`);
  }
  createSysOrderFulfillmentType(body: any) {
    return this.httpService.post(`${this.orderFulfillmentTypeUrl}/createSysOrderFulfillmentType`, body);
  }
  getSysOrderFulfillmentTypeById(body: any) {
    return this.httpService.get(`${this.orderFulfillmentTypeUrl}/getSysOrderFulfillmentTypeById?param=${this.secureService.encrypt(body)}`);
  }
  updateSysOrderFulfillmentType(body: any) {
    return this.httpService.patch(`${this.orderFulfillmentTypeUrl}/updateSysOrderFulfillmentType`, body);
  }
  deleteSysOrderFulfillmentType(body: any) {
    return this.httpService.delete(`${this.orderFulfillmentTypeUrl}/deleteSysOrderFulfillmentType?param=${this.secureService.encrypt(body)}`);
  }
  activeSysOrderFulfillmentType(body: any) {
    return this.httpService.patch(`${this.orderFulfillmentTypeUrl}/activateSysOrderFulfillmentType`, body);
  }

  // Order Type
  getSysOrderTypes(body: any) {
    return this.httpService.get(`${this.orderTypeUrl}/getSysOrderTypes?param=${this.secureService.encrypt(body)}`);
  }
  createSysOrderType(body: any) {
    return this.httpService.post(`${this.orderTypeUrl}/createSysOrderType`, body);
  }
  getSysOrderTypeById(body: any) {
    return this.httpService.get(`${this.orderTypeUrl}/getSysOrderTypeById?param=${this.secureService.encrypt(body)}`);
  }
  updateSysOrderType(body: any) {
    return this.httpService.patch(`${this.orderTypeUrl}/updateSysOrderType`, body);
  }
  deleteSysOrderType(body: any) {
    return this.httpService.delete(`${this.orderTypeUrl}/deleteSysOrderType?param=${this.secureService.encrypt(body)}`);
  }
  activeSysOrderType(body: any) {
    return this.httpService.patch(`${this.orderTypeUrl}/activateSysOrderType`, body);
  }

  // Status
  getSysStatuses(body: any) {
    return this.httpService.get(`${this.statusUrl}/getSysStatuses?param=${this.secureService.encrypt(body)}`);
  }
  createSysStatus(body: any) {
    return this.httpService.post(`${this.statusUrl}/createSysStatus`, body);
  }
  getSysStatusById(body: any) {
    return this.httpService.get(`${this.statusUrl}/getSysStatusById?param=${this.secureService.encrypt(body)}`);
  }
  updateSysStatus(body: any) {
    return this.httpService.patch(`${this.statusUrl}/updateSysStatus`, body);
  }
  deleteSysStatus(body: any) {
    return this.httpService.delete(`${this.statusUrl}/deleteSysStatus?param=${this.secureService.encrypt(body)}`);
  }
  activeSysStatus(body: any) {
    return this.httpService.patch(`${this.statusUrl}/activateSysStatus`, body);
  }
  
  // Running Number
  getSysRunningNumbers(body: any) {
    return this.httpService.get(`${this.runningNumberUrl}/getSysRunningNumbers?param=${this.secureService.encrypt(body)}`);
  }
  getSysRunningNumberById(body: any) {
    return this.httpService.get(`${this.runningNumberUrl}/getSysRunningNumberById?param=${this.secureService.encrypt(body)}`);
  }
  genDocumentNumber(body: any) {
    return this.httpService.get(`${this.runningNumberUrl}/genDocumentNumber?param=${this.secureService.encrypt(body)}`);
  }
  genDocumentNumbers(body: any) {
    return this.httpService.get(`${this.runningNumberUrl}/genDocumentNumbers?param=${this.secureService.encrypt(body)}`);
  }

  // Running Number Type
  getSysRunningNumberTypes(body: any) {
    return this.httpService.get(`${this.runningNumberTypeUrl}/getSysRunningNumberTypes?param=${this.secureService.encrypt(body)}`);
  }
  createSysRunningNumberType(body: any) {
    return this.httpService.post(`${this.runningNumberTypeUrl}/createSysRunningNumberType`, body);
  }
  getSysRunningNumberTypeById(body: any) {
    return this.httpService.get(`${this.runningNumberTypeUrl}/getSysRunningNumberTypeById?param=${this.secureService.encrypt(body)}`);
  }
  updateSysRunningNumberType(body: any) {
    return this.httpService.patch(`${this.runningNumberTypeUrl}/updateSysRunningNumberType`, body);
  }
  deleteSysRunningNumberType(body: any) {
    return this.httpService.delete(`${this.runningNumberTypeUrl}/deleteSysRunningNumberType?param=${this.secureService.encrypt(body)}`);
  }
  activeSysRunningNumberType(body: any) {
    return this.httpService.patch(`${this.runningNumberTypeUrl}/activateSysRunningNumberType`, body);
  }

}

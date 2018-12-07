package com.jhy.wxxd.intf.dto;


/**
* @ClassName: OrderInfoDto
* @Description: 订单信息实体类
* @author 88385283
* @date 2018年10月26日
*/
public class OrderInfoDto {
	
	/** 订单编号 */
	private String orderNum;
	
	/** 店铺编码 */
	private String storeManagerId;
	
	/** 商品编码 */
	private String cmmdtyCode;
	
	/** 订单状态 */
	private String orderStutas;
	
	/** 顾客编码 */
	private String customerId;
	
	/** 购买价格 */
	private String shopPrice;
	
	/** 收件人姓名*/
	private String consigneeName;
	
	/** 收件人号码*/
	private String consigneePhoneNum;
	
	/** 收件人地址 */
	private String consigneeAddress;

	public String getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}

	public String getStoreManagerId() {
		return storeManagerId;
	}

	public void setStoreManagerId(String storeManagerId) {
		this.storeManagerId = storeManagerId;
	}

	public String getCmmdtyCode() {
		return cmmdtyCode;
	}

	public void setCmmdtyCode(String cmmdtyCode) {
		this.cmmdtyCode = cmmdtyCode;
	}

	public String getOrderStutas() {
		return orderStutas;
	}

	public void setOrderStutas(String orderStutas) {
		this.orderStutas = orderStutas;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getShopPrice() {
		return shopPrice;
	}

	public void setShopPrice(String shopPrice) {
		this.shopPrice = shopPrice;
	}

	public String getConsigneeName() {
		return consigneeName;
	}

	public void setConsigneeName(String consigneeName) {
		this.consigneeName = consigneeName;
	}

	public String getConsigneePhoneNum() {
		return consigneePhoneNum;
	}

	public void setConsigneePhoneNum(String consigneePhoneNum) {
		this.consigneePhoneNum = consigneePhoneNum;
	}

	public String getConsigneeAddress() {
		return consigneeAddress;
	}

	public void setConsigneeAddress(String consigneeAddress) {
		this.consigneeAddress = consigneeAddress;
	}

	@Override
	public String toString() {
		return "OrderInfoDto [orderNum=" + orderNum + ", storeManagerId=" + storeManagerId + ", cmmdtyCode="
				+ cmmdtyCode + ", orderStutas=" + orderStutas + ", customerId=" + customerId + ", shopPrice="
				+ shopPrice + ", consigneeName=" + consigneeName + ", consigneePhoneNum=" + consigneePhoneNum
				+ ", consigneeAddress=" + consigneeAddress + "]";
	}
}

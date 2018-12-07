package com.jhy.wxxd.intf.entity;

import java.util.Date;

/**
* @ClassName: StoreManagerInfo
* @Description: 店长店铺信息实体类
* @author 88385283
* @date 2018年10月25日
*
*/
public class StoreManagerInfo {

	/** 店铺编码 */
	public String storeManagerId;
	
	/** 店铺名称 */
	public String storeName;
	
	/** 店铺地址 */
	public String storeAddress;
	
	/** 店铺类型 */
	public String storeTpye;//暂时不启用
	
	/** 店铺电话 */
	public String storePhone;
	
	/** 店铺店长 */
	public String storeManagerName;
	
	/** 店铺LOG */
	public String storeLogUrl;
	
	/** 店铺经度 */
	public String storeLng;
	
	/** 店铺维度 */
	public String storeLat;
	
	/** 更新时间*/
	private Date updateTime;
	
	/** 创建时间*/
	private Date createTime;
	
	/** 启用标志*/
	private String usedFlag;

	public String getStoreManagerId() {
		return storeManagerId;
	}

	public void setStoreManagerId(String storeManagerId) {
		this.storeManagerId = storeManagerId;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getStoreAddress() {
		return storeAddress;
	}

	public void setStoreAddress(String storeAddress) {
		this.storeAddress = storeAddress;
	}

	public String getStoreTpye() {
		return storeTpye;
	}

	public void setStoreTpye(String storeTpye) {
		this.storeTpye = storeTpye;
	}

	public String getStorePhone() {
		return storePhone;
	}

	public void setStorePhone(String storePhone) {
		this.storePhone = storePhone;
	}

	public String getStoreManagerName() {
		return storeManagerName;
	}

	public void setStoreManagerName(String storeManagerName) {
		this.storeManagerName = storeManagerName;
	}

	public String getStoreLogUrl() {
		return storeLogUrl;
	}

	public void setStoreLogUrl(String storeLogUrl) {
		this.storeLogUrl = storeLogUrl;
	}

	public String getStoreLng() {
		return storeLng;
	}

	public void setStoreLng(String storeLng) {
		this.storeLng = storeLng;
	}

	public String getStoreLat() {
		return storeLat;
	}

	public void setStoreLat(String storeLat) {
		this.storeLat = storeLat;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getUsedFlag() {
		return usedFlag;
	}

	public void setUsedFlag(String usedFlag) {
		this.usedFlag = usedFlag;
	}

	@Override
	public String toString() {
		return "StoreManagerInfo [storeManagerId=" + storeManagerId + ", storeName=" + storeName + ", storeAddress="
				+ storeAddress + ", storeTpye=" + storeTpye + ", storePhone=" + storePhone + ", storeManagerName="
				+ storeManagerName + ", storeLogUrl=" + storeLogUrl + ", storeLng=" + storeLng + ", storeLat=" + storeLat
				+ ", updateTime=" + updateTime + ", createTime=" + createTime + ", usedFlag=" + usedFlag + "]";
	}
	
	
}

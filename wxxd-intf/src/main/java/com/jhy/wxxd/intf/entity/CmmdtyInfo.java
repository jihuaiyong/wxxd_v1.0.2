package com.jhy.wxxd.intf.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
* @ClassName: cmmdtyInfo
* @Description: 商品信息实体类
* @author 88385283
* @date 2018年10月25日
*
*/
@Entity
@Table(name="wxxd_cmmdty_info")
public class CmmdtyInfo {

	/** 主键 */
	private String id;
	
	/** 商品编码 */
	private String cmmdtyCode;//数字 9位
	
	/** 店铺编码 */
	private String storeManagerId;//数字 9位
	
	/** 子码标识 */
	private String childCodeFlag;//判断是否存在子码 :Y/N
	
	/** 商品关系码 */
	private String cmmdtyShipCode;//数字 9位 ,当childCodeFlag为Y时,存在,查询商品关系表获取子码
	
	/** 商品名称 */
	private String cmmdtyName;
	
	/** 商品描述 */
	private String cmmdtyDescription;
	
	/** 商品图片Url */
	private String cmmdtyPictureUrl;
	
	/** 商品价格 */
	private String cmmdtyPrice;
	
	/** 商品品牌*/
	private String cmmdtyBrand;
	
	/** 商品产地*/
	private String cmmdtyAddress;
	
	/** 商品类别*/
	private String cmmdtyType;
	
	/** 商品型号*/
	private String cmmdtyModel;
	
	/** 商品展示级别*/
	private String cmmdtyShowLevel;//数字越大 ,级别越低
	
	/** 更新时间*/
	private Date updateTime;
	
	/** 创建时间*/
	private Date createTime;
	
	/** 启用标志*/
	private String usedFlag;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	@Column(name="id")
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name="cmmdtyCode" ,unique=true)
	public String getCmmdtyCode() {
		return cmmdtyCode;
	}

	public void setCmmdtyCode(String cmmdtyCode) {
		this.cmmdtyCode = cmmdtyCode;
	}

	@Column(name="storeManagerId")
	public String getStoreManagerId() {
		return storeManagerId;
	}

	public void setStoreManagerId(String storeManagerId) {
		this.storeManagerId = storeManagerId;
	}

	@Column(name="childCodeFlag")
	public String getChildCodeFlag() {
		return childCodeFlag;
	}

	public void setChildCodeFlag(String childCodeFlag) {
		this.childCodeFlag = childCodeFlag;
	}

	@Column(name="cmmdtyShipCode")
	public String getCmmdtyShipCode() {
		return cmmdtyShipCode;
	}

	public void setCmmdtyShipCode(String cmmdtyShipCode) {
		this.cmmdtyShipCode = cmmdtyShipCode;
	}

	@Column(name="cmmdtyName")
	public String getCmmdtyName() {
		return cmmdtyName;
	}

	public void setCmmdtyName(String cmmdtyName) {
		this.cmmdtyName = cmmdtyName;
	}

	@Column(name="cmmdtyDescription")
	public String getCmmdtyDescription() {
		return cmmdtyDescription;
	}

	public void setCmmdtyDescription(String cmmdtyDescription) {
		this.cmmdtyDescription = cmmdtyDescription;
	}

	@Column(name="cmmdtyPictureUrl")
	public String getCmmdtyPictureUrl() {
		return cmmdtyPictureUrl;
	}

	public void setCmmdtyPictureUrl(String cmmdtyPictureUrl) {
		this.cmmdtyPictureUrl = cmmdtyPictureUrl;
	}

	@Column(name="cmmdtyPrice")
	public String getCmmdtyPrice() {
		return cmmdtyPrice;
	}

	public void setCmmdtyPrice(String cmmdtyPrice) {
		this.cmmdtyPrice = cmmdtyPrice;
	}

	@Column(name="cmmdtyBrand")
	public String getCmmdtyBrand() {
		return cmmdtyBrand;
	}

	public void setCmmdtyBrand(String cmmdtyBrand) {
		this.cmmdtyBrand = cmmdtyBrand;
	}

	@Column(name="cmmdtyAddress")
	public String getCmmdtyAddress() {
		return cmmdtyAddress;
	}

	public void setCmmdtyAddress(String cmmdtyAddress) {
		this.cmmdtyAddress = cmmdtyAddress;
	}

	@Column(name="cmmdtyType")
	public String getCmmdtyType() {
		return cmmdtyType;
	}

	public void setCmmdtyType(String cmmdtyType) {
		this.cmmdtyType = cmmdtyType;
	}

	@Column(name="cmmdtyModel")
	public String getCmmdtyModel() {
		return cmmdtyModel;
	}

	public void setCmmdtyModel(String cmmdtyModel) {
		this.cmmdtyModel = cmmdtyModel;
	}

	@Column(name="cmmdtyShowLevel")
	public String getCmmdtyShowLevel() {
		return cmmdtyShowLevel;
	}

	public void setCmmdtyShowLevel(String cmmdtyShowLevel) {
		this.cmmdtyShowLevel = cmmdtyShowLevel;
	}

	@Column(name="updateTime")
	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	@Column(name="createTime")
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Column(name="usedFlag")
	public String getUsedFlag() {
		return usedFlag;
	}

	public void setUsedFlag(String usedFlag) {
		this.usedFlag = usedFlag;
	}

	@Override
	public String toString() {
		return "CmmdtyInfo [cmmdtyCode=" + cmmdtyCode + ", storeManagerId=" + storeManagerId + ", childCodeFlag="
				+ childCodeFlag + ", cmmdtyShipCode=" + cmmdtyShipCode + ", cmmdtyName=" + cmmdtyName
				+ ", cmmdtyDescription=" + cmmdtyDescription + ", cmmdtyPictureUrl=" + cmmdtyPictureUrl
				+ ", cmmdtyPrice=" + cmmdtyPrice + ", cmmdtyBrand=" + cmmdtyBrand + ", cmmdtyAddress=" + cmmdtyAddress
				+ ", cmmdtyType=" + cmmdtyType + ", cmmdtyModel=" + cmmdtyModel + ", cmmdtyShowLevel=" + cmmdtyShowLevel
				+ ", updateTime=" + updateTime + ", createTime=" + createTime + ", usedFlag=" + usedFlag + "]";
	}

}

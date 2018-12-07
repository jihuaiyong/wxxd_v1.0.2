package com.jhy.wxxd.intf.dto;

import java.util.List;


/**
* @ClassName: CmmdtyInfoDto
* @Description: 商品信息实体类
* @author 88385283
* @date 2018年10月26日
*/
public class CmmdtyInfoDto {

	/** 商品编码 */
	private String cmmdtyCode;
	
	/** 子码标识 */
	private boolean childCodeFlag;
	
	/** 商品关系码 */
	private String cmmdtyShipCode;
	
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
	private String cmmdtyShowLevel;

	/** 子商品集合*/
	private List<CmmdtyInfoDto> CmmdtyInfoDtoList;

	public String getCmmdtyCode() {
		return cmmdtyCode;
	}

	public void setCmmdtyCode(String cmmdtyCode) {
		this.cmmdtyCode = cmmdtyCode;
	}

	public boolean getChildCodeFlag() {
		return childCodeFlag;
	}

	public void setChildCodeFlag(boolean childCodeFlag) {
		this.childCodeFlag = childCodeFlag;
	}

	public String getCmmdtyShipCode() {
		return cmmdtyShipCode;
	}

	public void setCmmdtyShipCode(String cmmdtyShipCode) {
		this.cmmdtyShipCode = cmmdtyShipCode;
	}

	public String getCmmdtyName() {
		return cmmdtyName;
	}

	public void setCmmdtyName(String cmmdtyName) {
		this.cmmdtyName = cmmdtyName;
	}

	public String getCmmdtyDescription() {
		return cmmdtyDescription;
	}

	public void setCmmdtyDescription(String cmmdtyDescription) {
		this.cmmdtyDescription = cmmdtyDescription;
	}

	public String getCmmdtyPictureUrl() {
		return cmmdtyPictureUrl;
	}

	public void setCmmdtyPictureUrl(String cmmdtyPictureUrl) {
		this.cmmdtyPictureUrl = cmmdtyPictureUrl;
	}

	public String getCmmdtyPrice() {
		return cmmdtyPrice;
	}

	public void setCmmdtyPrice(String cmmdtyPrice) {
		this.cmmdtyPrice = cmmdtyPrice;
	}

	public String getCmmdtyBrand() {
		return cmmdtyBrand;
	}

	public void setCmmdtyBrand(String cmmdtyBrand) {
		this.cmmdtyBrand = cmmdtyBrand;
	}

	public String getCmmdtyAddress() {
		return cmmdtyAddress;
	}

	public void setCmmdtyAddress(String cmmdtyAddress) {
		this.cmmdtyAddress = cmmdtyAddress;
	}

	public String getCmmdtyType() {
		return cmmdtyType;
	}

	public void setCmmdtyType(String cmmdtyType) {
		this.cmmdtyType = cmmdtyType;
	}

	public String getCmmdtyModel() {
		return cmmdtyModel;
	}

	public void setCmmdtyModel(String cmmdtyModel) {
		this.cmmdtyModel = cmmdtyModel;
	}

	public String getCmmdtyShowLevel() {
		return cmmdtyShowLevel;
	}

	public void setCmmdtyShowLevel(String cmmdtyShowLevel) {
		this.cmmdtyShowLevel = cmmdtyShowLevel;
	}

	public List<CmmdtyInfoDto> getCmmdtyInfoDtoList() {
		return CmmdtyInfoDtoList;
	}

	public void setCmmdtyInfoDtoList(List<CmmdtyInfoDto> cmmdtyInfoDtoList) {
		CmmdtyInfoDtoList = cmmdtyInfoDtoList;
	}

	@Override
	public String toString() {
		return "CmmdtyInfoDto [cmmdtyCode=" + cmmdtyCode + ", childCodeFlag=" + childCodeFlag + ", cmmdtyShipCode="
				+ cmmdtyShipCode + ", cmmdtyName=" + cmmdtyName + ", cmmdtyDescription=" + cmmdtyDescription
				+ ", cmmdtyPictureUrl=" + cmmdtyPictureUrl + ", cmmdtyPrice=" + cmmdtyPrice + ", cmmdtyBrand="
				+ cmmdtyBrand + ", cmmdtyAddress=" + cmmdtyAddress + ", cmmdtyType=" + cmmdtyType + ", cmmdtyModel="
				+ cmmdtyModel + ", cmmdtyShowLevel=" + cmmdtyShowLevel + ", CmmdtyInfoDtoList=" + CmmdtyInfoDtoList
				+ "]";
	}
	
	
	
}

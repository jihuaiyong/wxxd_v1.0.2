package com.jhy.wxxd.intf.service;

import java.util.List;

import com.jhy.wxxd.intf.dto.CmmdtyInfoDto;


/**
* @ClassName: queryStoreCmmdtyService
* @Description: 查询门店商品信息接口
* @author 88385283
* @date 2018年10月25日
*
*/
public interface QueryStoreCmmdtyService {

	
	/**   
	 * @Title: queryStoreCmmdty   
	 * @Description: 根据门店编码查询门店商品信息
	 * @param storeManagerId
	 * @return List<CmmdtyInfoDto> 
	 */
	public List<CmmdtyInfoDto> queryStoreCmmdty(String storeManagerId);
}

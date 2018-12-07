package com.jhy.wxxd.intf.service;

import java.util.List;

import com.jhy.wxxd.intf.dto.OrderInfoDto;

/**
* @ClassName: queryOrderInfoByStoreManagerId
* @Description: 根据店铺编码查询订单信息服务接口
* @author 88385283
* @date 2018年10月26日
*/
public interface QueryOrderInfoByStoreManagerIdService {

	/**   
	 * @Title: queryOrderInfoByStoreManagerId   
	 * @Description: 根据店铺编码查询订单信息   
	 * @param storeManagerId
	 * @return List<OrderInfo> 
	 */
	public List<OrderInfoDto> queryOrderInfoByStoreManagerId(String storeManagerId);
}

package com.jhy.wxxd.intf.service;

import java.util.List;

import com.jhy.wxxd.intf.dto.OrderInfoDto;

/**
* @ClassName: QueryOrderInfoByCustomerIdService
* @Description: 根据顾客编码查询订单服务接口
* @author 88385283
* @date 2018年10月26日
*/
public interface QueryOrderInfoByCustomerIdService {

	/**   
	 * @Title: queryOrderInfoByStoreManagerId   
	 * @Description: 根据顾客编码查询订单  
	 * @param customerId
	 * @return List<OrderInfoDto> 
	 */
	public List<OrderInfoDto> queryOrderInfoByStoreManagerId(String customerId); 
}

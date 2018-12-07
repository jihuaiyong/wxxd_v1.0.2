package com.jhy.wxxd.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jhy.wxxd.intf.dto.OrderInfoDto;
import com.jhy.wxxd.intf.entity.OrderInfo;
import com.jhy.wxxd.intf.service.QueryOrderInfoByCustomerIdService;


/**
* @ClassName: QueryOrderInfoByCustomerIdServiceImpl
* @Description: 根据顾客编码查询订单服务实现类
* @author 88385283
* @date 2018年10月26日
*/
@Service
public class QueryOrderInfoByCustomerIdServiceImpl implements QueryOrderInfoByCustomerIdService {

	/* (非 Javadoc)
	* <p>Title: queryOrderInfoByStoreManagerId</p>
	* <p>Description: </p>
	* @param customerId
	* @return
	* @see com.jhy.wxxd.intf.service.QueryOrderInfoByCustomerIdService#queryOrderInfoByStoreManagerId(java.lang.String)
	*/
	@Override
	public List<OrderInfoDto> queryOrderInfoByStoreManagerId(String customerId) {

		//查询wxxd_orderInfo库,条件customerId
		List<OrderInfo>  OrderInfoList = new ArrayList<OrderInfo>();
		
		List<OrderInfoDto> OrderInfoDtoList = transEntity(OrderInfoList);
		return OrderInfoDtoList;
	}
	
	/**   
	 * @Title: transEntity   
	 * @Description: 出参转换
	 * @param OrderInfoList
	 * @return List<OrderInfoDto> 
	 */
	private List<OrderInfoDto> transEntity(List<OrderInfo>  OrderInfoList){
		List<OrderInfoDto> OrderInfoDtoList = new ArrayList<OrderInfoDto>();
		OrderInfoDto orderInfoDto;
		for(OrderInfo orderInfo : OrderInfoList) {
			orderInfoDto = new OrderInfoDto();
			orderInfoDto.setOrderNum(orderInfo.getOrderNum());
			
			OrderInfoDtoList.add(orderInfoDto);
		}
		return OrderInfoDtoList;
	}
}

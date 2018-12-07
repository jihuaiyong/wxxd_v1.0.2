package com.jhy.wxxd.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jhy.wxxd.intf.dto.OrderInfoDto;
import com.jhy.wxxd.intf.entity.OrderInfo;
import com.jhy.wxxd.intf.service.QueryOrderInfoByStoreManagerIdService;


/**
* @ClassName: queryOrderInfoByStoreManagerIdServiceImpl
* @Description: 根据店铺编码查询订单信息服务实现
* @author 88385283
* @date 2018年10月26日
*/
@Service
public class QueryOrderInfoByStoreManagerIdServiceImpl implements QueryOrderInfoByStoreManagerIdService {

	/* (非 Javadoc)
	* <p>Title: queryOrderInfoByStoreManagerId</p>
	* <p>Description: </p>
	* @return
	* @see com.jhy.wxxd.intf.service.queryOrderInfoByStoreManagerIdService#queryOrderInfoByStoreManagerId()
	*/
	@Override
	public List<OrderInfoDto> queryOrderInfoByStoreManagerId(String storeManagerId) {
		//查询wxxd_OrderInfo表,条件 storeManagerId;
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

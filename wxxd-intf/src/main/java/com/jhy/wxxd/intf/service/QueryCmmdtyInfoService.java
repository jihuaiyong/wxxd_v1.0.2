package com.jhy.wxxd.intf.service;

import java.util.List;

import com.jhy.wxxd.intf.dto.CmmdtyInfoDto;

/**
* @ClassName: queryCmmdtyInfoService
* @Description: 查询商品信息服务接口
* @author 88385283
* @date 2018年10月25日
*
*/
public interface QueryCmmdtyInfoService {

	/**   
	 * @Title: queryCmmdtyCodes   
	 * @Description: TODO(这里用一句话描述这个方法的作用)   
	 * @param storeManagerId
	 * @return List<CmmdtyInfoDto> 
	 */
	public List<CmmdtyInfoDto> queryCmmdtyCodes(String storeManagerId);

	/**   
	 * @Title: queryCmmdtyInfo   
	 * @Description: 根据店铺编码与商品编码 查询商品详情信息   
	 * @param storeManagerId
	 * @param cmmdtyCode
	 * @return CmmdtyInfoDto 
	 */
	public CmmdtyInfoDto queryCmmdtyInfo(String storeManagerId ,String cmmdtyCode);
}

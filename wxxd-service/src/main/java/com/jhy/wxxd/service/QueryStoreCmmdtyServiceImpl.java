package com.jhy.wxxd.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jhy.wxxd.intf.dto.CmmdtyInfoDto;
import com.jhy.wxxd.intf.entity.CmmdtyInfo;
import com.jhy.wxxd.intf.service.QueryStoreCmmdtyService;


/**
* @ClassName: managerCmmdtyServiceImpl
* @Description: 查询店铺商品信息服务实现
* @author 88385283
* @date 2018年10月25日
*
*/
@Service
public class QueryStoreCmmdtyServiceImpl implements QueryStoreCmmdtyService{

	/* (非 Javadoc)
	* <p>Title: queryStoreCmmdty</p>
	* <p>Description: </p>
	* @param storeManagerId
	* @return
	* @see com.jhy.wxxd.intf.service.queryStoreCmmdtyService#queryStoreCmmdty(java.lang.String)
	*/
	@Override
	public List<CmmdtyInfoDto> queryStoreCmmdty(String storeManagerId) {
		//查询wxxd_cmmdtyInfo表, 分页查询 每页展示50条数据
		//查询条件:storeManagerId, childCodeFlag为false ;orderBy根据 cmmdtyShowLevel
		List<CmmdtyInfo> cmmdtyInfoList = new ArrayList<CmmdtyInfo>();
		//商品组信息
		List<CmmdtyInfoDto> cmmdtyInfoDtoList = new ArrayList<CmmdtyInfoDto>();
		for(CmmdtyInfo cmmdtyInfo :cmmdtyInfoList) {
			CmmdtyInfoDto cmmdtyInfoDto =transEntity(cmmdtyInfo);
			cmmdtyInfoDtoList.add(cmmdtyInfoDto);
		}
		return cmmdtyInfoDtoList;
	}

	/**   
	 * @Title: transEntity   
	 * @Description: 出参转换  
	 * @param cmmdtyInfo
	 * @return CmmdtyInfoDto 
	 */
	private CmmdtyInfoDto transEntity(CmmdtyInfo cmmdtyInfo) {
		CmmdtyInfoDto cmmdtyInfoDto = new CmmdtyInfoDto();
		cmmdtyInfoDto.setCmmdtyCode(cmmdtyInfo.getCmmdtyCode());
		return cmmdtyInfoDto;
		
	}

}

package com.jhy.wxxd.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jhy.wxxd.intf.dao.CmmdtyInfoDao;
import com.jhy.wxxd.intf.dto.CmmdtyInfoDto;
import com.jhy.wxxd.intf.entity.CmmdtyInfo;
import com.jhy.wxxd.intf.service.QueryCmmdtyInfoService;


/**
* @ClassName: queryCmmdtyInfoServiceImpl
* @Description: 查询商品信息服务实现
* @author 88385283
* @date 2018年10月25日
*/
@Service
public class QueryCmmdtyInfoServiceImpl implements QueryCmmdtyInfoService {

	@Autowired
	private CmmdtyInfoDao daoImpl;
	
	@Override
	public CmmdtyInfoDto queryCmmdtyInfo(String storeManagerId, String cmmdtyCode) {
		if(StringUtils.isEmpty(storeManagerId) &&StringUtils.isEmpty(cmmdtyCode)) {
			return null;
		}
		//wxxd_cmmdtyInfo表,查询条件cmmdtyCode ,storeManagerId
		CmmdtyInfo entity = new CmmdtyInfo();
		Date now = new Date();
		entity = daoImpl.queryCmmdtyInfo(storeManagerId, cmmdtyCode);
		Date now1 = new Date();
		System.out.println(now1.getTime()-now.getTime());
		CmmdtyInfoDto dto = new CmmdtyInfoDto();
		if(entity != null) {
			dto = transEntity(entity);
		}
		return dto;

////		daoImpl.findByStoreManagerId("123456789");
////		daoImpl.findByChildCodeFlag("Y");
////		daoImpl.findByCmmdtyName("123456789");
////		daoImpl.findByCmmdtyDescription("123456789");
////		daoImpl.findByCmmdtyPrice("123456789");
//		Date now2 = new Date();
//		Date now3 = new Date();
//		System.out.println(now3.getTime()-now2.getTime());
//		CmmdtyInfo entity1 = new CmmdtyInfo();
//		entity1.setCmmdtyCode("123444444");
//		Date now4 = new Date();
//		daoImpl.save(entity1);
//		Date now5 = new Date();
//		System.out.println(now5.getTime()-now4.getTime());
//		CmmdtyInfoDto cmmdtyInfoDto = transEntity(entity);
//		if(entity.getChildCodeFlag().equals("Y")){
//			List<CmmdtyInfoDto> cmmdtyInfoDtoList = new ArrayList<CmmdtyInfoDto>();
//			//wxxd_cmmdtyInfo表,查询条件cmmdtyShipCode ,storeManagerId ;childCodeFlag=false
//			List<CmmdtyInfo> cmmdtyInfoList = new ArrayList<CmmdtyInfo>();
//			for(CmmdtyInfo cmmdtyInfo : cmmdtyInfoList){
//				CmmdtyInfoDto cmmdtyChild = transEntity(cmmdtyInfo);
//				cmmdtyInfoDtoList.add(cmmdtyChild);
//			}
//		}
		
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

	@Override
	public List<CmmdtyInfoDto> queryCmmdtyCodes(String storeManagerId) {
		if(StringUtils.isEmpty(storeManagerId)) {
			return null;
		}
		List<CmmdtyInfoDto> cmmdtyInfoDtoList = new ArrayList<CmmdtyInfoDto>();
		Date now = new Date();
		List<CmmdtyInfo >cmmdtyInfoList = daoImpl.queryCmmdtyInfoList(storeManagerId);
		Date now1 = new Date();
		System.out.println(now1.getTime()-now.getTime());
		if(cmmdtyInfoList != null) {
			for(CmmdtyInfo info : cmmdtyInfoList) {
				CmmdtyInfoDto dto = transEntity(info);
				cmmdtyInfoDtoList.add(dto);
			}
		}
		return cmmdtyInfoDtoList;
	} 
}

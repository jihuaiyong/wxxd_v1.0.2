package com.jhy.wxxd.intf.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jhy.wxxd.intf.entity.CmmdtyInfo;

@Repository
public interface CmmdtyInfoDao extends JpaRepository<CmmdtyInfo, Integer>,JpaSpecificationExecutor<CmmdtyInfo>{
	
	/**   
	 * @Title: queryCmmdtyInfo   
	 * @Description: 根据店铺ID和商品编码查询商品信息详情   
	 * @param storeManagerId
	 * @param cmmdtyCode
	 * @return CmmdtyInfo 
	 */
	@Query(value="select * from wxxd_cmmdty_info where storeManagerId =?1  AND cmmdtyCode = ?2", nativeQuery = true)
	CmmdtyInfo queryCmmdtyInfo(String storeManagerId, String cmmdtyCode);
	
	/**   
	 * @Title: queryCmmdtyInfoList   
	 * @Description: 根据店铺编码查询商品信息列表 
	 * @param storeManagerId
	 * @return List<CmmdtyInfo> 
	 */
	@Query(value="select * from wxxd_cmmdty_info  where storeManagerId = ?1", nativeQuery = true)
	List<CmmdtyInfo> queryCmmdtyInfoList(String storeManagerId);
	
	
}

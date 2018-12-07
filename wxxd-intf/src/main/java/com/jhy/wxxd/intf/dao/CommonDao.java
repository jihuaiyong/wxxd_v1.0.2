package com.jhy.wxxd.intf.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * @ClassName: CommonDao
 * @Description: 通用Dao操作服务接口
 * @author 88385283
 * @date 2018年10月26日
 */

@Repository
public interface CommonDao<T> extends JpaSpecificationExecutor<T>{
	
}

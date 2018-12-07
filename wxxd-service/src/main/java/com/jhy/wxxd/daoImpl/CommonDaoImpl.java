package com.jhy.wxxd.daoImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.jhy.wxxd.intf.dao.CommonDao;

@Service
public class CommonDaoImpl<T> implements CommonDao<T>{

	@Override
	public Optional<T> findOne(Specification<T> spec) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<T> findAll(Specification<T> spec) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<T> findAll(Specification<T> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<T> findAll(Specification<T> spec, Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long count(Specification<T> spec) {
		// TODO Auto-generated method stub
		return 0;
	}


}

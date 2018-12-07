package com.jhy.wxxd.admin.controller.manage;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jhy.wxxd.service.QueryCmmdtyInfoServiceImpl;




@Controller
public class admin {
	@Autowired
	private QueryCmmdtyInfoServiceImpl queryCmmdtyInfoService;
	
	@Autowired
	private RestHighLevelClient restHighLevelClient;
	
	@Autowired
	private RestClient restClient;
	
	private static Log LOGGER = LogFactory.getLog(admin.class);
	@RequestMapping("/to.do")
	public String home() throws IOException {
		
		LOGGER.debug(queryCmmdtyInfoService.queryCmmdtyInfo("000000000", "000000001"));
		
		LOGGER.info(restHighLevelClient.getClass());
		
		LOGGER.info(restClient.getClass());
		//增, source 里对象创建方式可以是JSON字符串，或者Map，或者XContentBuilder 对象
//		Map<String,Object> builder = new HashMap<String,Object>();
//		IndexRequest indexRequest = new IndexRequest("指定index", "指定type", "指定ID") .source(builder);
//		IndexResponse indexResponse = restHighLevelClient.index(indexRequest);
//		LOGGER.info(indexResponse.toString());
//		//删
//		DeleteRequest deleteRequest = new DeleteRequest("指定index", "指定type", "指定ID");
//		restHighLevelClient.delete(deleteRequest);
//
//		//改, source 里对象创建方式可以是JSON字符串，或者Map，或者XContentBuilder 对象
//		UpdateRequest updateRequest = new UpdateRequest("指定index", "指定type", "指定ID").doc(builder);
//		restHighLevelClient.update(updateRequest);

		//查
		GetRequest getRequest = new GetRequest("cmmdtycodes", "cmmdtycode", "1");
		GetResponse getResponse = restHighLevelClient.get(getRequest);
		LOGGER.info(getResponse);
		
        SearchRequest searchRequest = new SearchRequest();
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.termQuery("type.keyword", "服装"));
        sourceBuilder.timeout(new TimeValue(60, TimeUnit.SECONDS));
        searchRequest.source(sourceBuilder);
        
        try {
        	
            SearchResponse response = restHighLevelClient.search(searchRequest);
            Arrays.stream(response.getHits().getHits())
                    .forEach(i -> {
                        System.out.println(i.getIndex());
                        System.out.println(i.getSourceAsMap());
                        System.out.println(i.getType());
                    });
            System.out.println(response.getHits().totalHits);
            return "hello";
        } catch (IOException e) {
            e.printStackTrace();
            return "hello";
        }
    
	}
}
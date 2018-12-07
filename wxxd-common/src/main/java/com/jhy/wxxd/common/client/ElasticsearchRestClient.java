package com.jhy.wxxd.common.client;

import java.util.Arrays;
import java.util.Objects;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class ElasticsearchRestClient {
	
	private static Log LOGGER = LogFactory.getLog(ElasticsearchRestClient.class);
	/**
	 * 使用冒号隔开ip和端口
	 */
//	@Value("${elasticsearch.ip}")
	String[] ipAddress = new String[] {"127.0.0.1:9200"};

	private static final int ADDRESS_LENGTH = 2;

	private static final String HTTP_SCHEME = "http";

	@Bean(name = "restClient")
	public RestClient restClient() {
		HttpHost[] hosts = Arrays.stream(ipAddress).map(this::makeHttpHost).filter(Objects::nonNull)
				.toArray(HttpHost[]::new);
		LOGGER.info("hosts:{}"+ Arrays.toString(hosts));
		return RestClient.builder(hosts).build();
	}

	@Bean(name = "highLevelClient")
	public RestHighLevelClient highLevelClient() {
		HttpHost[] hosts = Arrays.stream(ipAddress).map(this::makeHttpHost).filter(Objects::nonNull)
				.toArray(HttpHost[]::new);
		return new RestHighLevelClient(RestClient.builder(hosts));
	}

	private HttpHost makeHttpHost(String s) {
		assert StringUtils.isNotEmpty(s);
		String[] address = s.split(":");
		if (address.length == ADDRESS_LENGTH) {
			String ip = address[0];
			int port = Integer.parseInt(address[1]);
			return new HttpHost(ip, port, HTTP_SCHEME);
		} else {
			return null;
		}
	}
}

<!--logo  [[-->
<div class="logo-area">
	<div class="logo">
		<a href="${request.contextPath}/main/bsp.action"><img src="${request.contextPath}/staticfile/images/logo.jpg" alt="苏宁商家运营服务平台" title="苏宁商家运营服务平台" height="95" width="527"/></a>
	</div>
	<div class="myphotoshop">
		<dl class="person-account">
			<dt><a><img src="${request.contextPath}/staticfile/images/photo.jpg" alt="图像" title="图像" /></a></dt>
			<dd>
				<#setting number_format="#">
				<#assign userInfoMap=Session.userInfoMapJson?eval />
				<p><em class="my-name" title="${userInfoMap.userNickname!}(${userInfoMap.userName!})">${userInfoMap.userNickname!}(${userInfoMap.userName!})</em><a href="${logoutUrl}" title="注销" class="zhuxiao">注销</a></p>
				<p>角色：${userInfoMap.userRoleName!}</p>
			</dd>
		</dl>
	</div>
</div>
<!--logo  ]]-->
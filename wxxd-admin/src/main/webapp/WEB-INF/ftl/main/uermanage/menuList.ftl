<#if pageInfo.list??>
    <#list pageInfo.list as menuInfo>
        <tr>
		    <td><input id ="${menuInfo.menuId?c}" type="checkbox" name="menuCheckBox" value="${menuInfo.menuId?c}"/></td>
		    <td>${menuInfo.menuName}</td>
		    <td>${menuInfo.menuId?c}</td>
		    <td>${menuInfo.sequenceNo}</td>
		    <td><#if menuInfo.status ==1>有效<#else>无效</#if></td>
		    <td><#if menuInfo.menuType =="M">菜单<#else>按钮</#if></td>
		    <td>${menuInfo.createDate}</td>
		    <td>${menuInfo.action}</td>
    	</tr>
     </#list>
 </#if>

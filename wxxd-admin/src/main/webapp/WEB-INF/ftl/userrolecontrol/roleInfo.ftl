<table width="80%">
	<tr>
		<th>权限代码</th>
		<th>权限名称</th>
		<th>状态描述</th>
		<th></th>
	</tr>
	<#list roleList as detail>
		<tr>
			<td>${detail.roleCode?c!''}<input type="hidden" name="roleCode" value="${detail.roleCode?c!''}"/></td>
			<td>${detail.roleName!''}<input type="hidden" name="roleName" value="${detail.roleName!''}"</td>
			<td>
				<input type="text" name="roleDesc"/>
			</td>
			<td><input type="button" value="添加" onclick="addRoleInfo();"/></td>
		</tr>
	</#list>
</table>
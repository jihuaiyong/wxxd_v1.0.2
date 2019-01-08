/* **********************
   Event Handlers
   These are my custom event handlers to make my
   web application behave the way I went when SWFUpload
   completes different tasks.  These aren't part of the SWFUpload
   package.  They are part of my application.  Without these none
   of the actions SWFUpload makes will show up in my application.
 ********************** */
function preLoad() {
	if (!this.support.loading) {
		alert("You need the Flash Player 9.028 or above to use SWFUpload.");
		return false;
	}
}
function loadFailed() {
	alert("Something went wrong while loading SWFUpload. If this were a real application we'd clean up and then give you an alternative");
}

function fileDialogStart() {
}

function fileQueueError(file, errorCode, message) {
	try {
		if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
			alert("您一次选择的图片数量超过了限制！\n"
					+ (message == 0 ? "文件数已经达到极限" : "您最多还可以选择" + message
							+ "个文件"));
			return;
		}
		var fileinfo = new fileInfo(file, this.customSettings.fileInfoTarget);
		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			fileinfo.setStatus("图片规格超过限制", "fileInfo reddd");
			fileinfo.setsummary(file);
			this.debug("Error Code: File too big, File name: " + file.name
					+ ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			fileinfo.setStatus("不能上传0字节文件", "fileInfo redd");
			fileinfo.setsummary(file);
			this.debug("Error Code: Zero byte file, File name: " + file.name
					+ ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			fileinfo.setStatus("不符合要求的文件类型", "fileInfo redd");
			fileinfo.setsummary(file);
			this.debug("Error Code: Invalid File Type, File name: " + file.name
					+ ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
			alert("您一次选择的图片数量超过了限制！\n"
					+ (message === 0 ? "文件数已经达到极限" : "您最多还可以选择" + message
							+ "个文件"));
			break;
		default:
			if (file !== null) {
				fileinfo.setStatus("未捕获到的异常", "fileInfo redd");
				fileinfo.setsummary(file);
			}
			this.debug("Error Code: " + errorCode + ", File name: " + file.name
					+ ", File size: " + file.size + ", Message: " + message);
			break;
		}

		
	} catch (ex) {
		this.debug(ex);
	}
}

function fileQueued(file) {
	try {
		var fileinfo = new fileInfo(file, this.customSettings.fileInfoTarget);
		fileinfo.setStatus("<span style='color: green'>等待上传</span>", "fileInfo green");
		fileinfo.setsummary(file);
		parent.iFrameHeight("content");
	} catch (ex) {
		this.debug(ex);
	}
}
function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {

		if (this.getStats().files_queued > 0) {
			// 更新按钮与文件列表头的状态
			var uploadbutton = $("#" + swfu3.customSettings.uploadButtonTarget);
			var cleanbutton = $("#" + swfu3.customSettings.cleanButtonTarget);
			// var fileinfohead = $("#"+swfu.customSettings.fileInfoheadTarget);
			uploadbutton.attr("disabled", false);
			cleanbutton.attr("disabled", false);
			// fileinfohead.attr("style","display:''");
		}
		var surpluscapacity = $("#"
				+ swfu3.customSettings.fileSurplusCapacityTarget);
		if (surpluscapacity.text() < 0) {
			alert("剩余空间大小:" + surpluscapacity.text() + "请重新选择图片或者升级图片空间容量");
			return;
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadStart(file) {
	try {
		/*
		 * I don't want to do any file validation or anything, I'll just update
		 * the UI and return true to indicate that the upload should start
		 */

	} catch (ex) {
	}

	return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {

	try {
		var fileinfo = new fileInfo(file, this.customSettings.fileInfoTarget);
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
		fileinfo.setPercent(percent);
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadError(file, errorCode, message) {
	try {
		var fileinfo = new fileInfo(file, this.customSettings.fileInfoTarget);
		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
			fileinfo.setStatus("HTTP错误: " + message, "fileInfo redd");
			this.debug("Error Code: HTTP Error, File name: " + file.name
					+ ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
			fileinfo.setStatus("URL配置错误", "fileInfo redd");
			this.debug("Error Code: No backend file, File name: " + file.name
					+ ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
			fileinfo.setStatus("上传失败", "fileInfo redd");
			this.debug("Error Code: Upload Failed, File name: " + file.name
					+ ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.IO_ERROR:
			fileinfo.setStatus("服务器(IO)错误", "fileInfo redd");
			this.debug("Error Code: IO Error, File name: " + file.name
					+ ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
			fileinfo.setStatus("安全问题", "fileInfo redd");

			this.debug("Error Code: Security Error, File name: " + file.name
					+ ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			fileinfo.setStatus("超出上载限制！", "fileInfo redd");

			this.debug("Error Code: Upload Limit Exceeded, File name: "
					+ file.name + ", File size: " + file.size + ", Message: "
					+ message);
			break;
		case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
			fileinfo.setStatus("文件不存在！", "fileInfo redd");

			this.debug("Error Code: The file was not found, File name: "
					+ file.name + ", File size: " + file.size + ", Message: "
					+ message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
			fileinfo.setStatus("校验失败", "fileInfo redd");
			this.debug("Error Code: File Validation Failed, File name: "
					+ file.name + ", File size: " + file.size + ", Message: "
					+ message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			fileinfo.setStatus("取消上传", "fileInfo redd");
			this.debug("Error Code: File Validation Failed, File name: "
					+ file.name + ", File size: " + file.size + ", Message: "
					+ message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			fileinfo.setStatus("停止上传", "fileInfo redd");
			this.debug("Error Code: File Validation Failed, File name: "
					+ file.name + ", File size: " + file.size + ", Message: "
					+ message);
			break;
		default:
			fileinfo.setStatus("未捕获到的异常", "fileInfo redd");
			this.debug("Error Code: " + errorCode + ", File name: " + file.name
					+ ", File size: " + file.size + ", Message: " + message);
			break;
		}
		addFileInfo(file.id, message, "red");
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccess(file, serverData) {
	try {
		var fileinfo = new fileInfo(file, this.customSettings.fileInfoTarget);
		if (serverData.indexOf("OK") >= 0) {
			fileinfo.setStatus("图片上传成功!", "fileInfo blue");
			fileinfo.setDeleteFlag();
		}else if(serverData.indexOf("Cookes") >= 0) {
			fileinfo.setStatus("回话超时请重新登录!", "fileInfo red");
		}else {
			fileinfo.setStatus(serverData, "fileInfo red");
		}
		$("#picUploadStatus").val("1");
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadComplete(file) {
	try {
		this.startUpload();

		// 设置按钮状态
		if (swfu3.getStats().files_queued === 0) {
			var uploadbutton = $("#" + swfu3.customSettings.uploadButtonTarget);
			uploadbutton.attr("disabled", true);
		}

	} catch (ex) {
		this.debug(ex);
	}
}

function fileInfo(file, targetID) {
	this.fileList = document.getElementById(file.id);
	if (!this.fileList) {
		// var id = document.createElement("td");
		// id.innerHTML = file.index+1;

		var name = document.createElement("td");
		name.innerHTML = file.name;

		var size = document.createElement("td");
		size.innerHTML = Math.round((file.size / 1024 / 1024) * 100) / 100
				+ "MB";

		var percent = document.createElement("td");
		percent.innerHTML = 0 + "%";

		var status = document.createElement("td");
		status.innerHTML = "";

		var del = document.createElement("a");
		del.href = "javascript:delFile(\"" + file.id + "\",\"" + file.size
				+ "\")";
		del.appendChild(document.createTextNode("删除"));

		var option = document.createElement("td");
		option.appendChild(del);

		this.fileList = document.createElement("tr");
		this.fileList.id = file.id;

		// this.fileList.appendChild(id);
		this.fileList.appendChild(name);
		this.fileList.appendChild(size);
		this.fileList.appendChild(percent);
		this.fileList.appendChild(status);
		this.fileList.appendChild(option);
		document.getElementById(targetID).appendChild(this.fileList);
	}

	fileInfo.prototype.setStatus = function(status, classtpye) {
		//this.fileList.className = classtpye;
		this.fileList.childNodes[3].innerHTML = status;
	};

	fileInfo.prototype.setDeleteFlag = function() {
		// 将删除连接改成标签，不可删除
		this.fileList.childNodes[4].innerHTML = "";
	};
	fileInfo.prototype.setsummary = function(file) {
		// 更新选择的图片数量，总大小，剩余容量
		var selectcount = $("#" + swfu3.customSettings.fileSelectCountTarget);
		var selectsumsize = $("#" + swfu3.customSettings.fileSelectSumSizeTarget);
		var surpluscapacity = $("#"
				+ swfu3.customSettings.fileSurplusCapacityTarget);
		selectcount.text(parseInt(selectcount.text()) + 1);
		selectsumsize
				.text(Math
						.round((parseFloat(selectsumsize.text()) + file.size / 1024 / 1024) * 100) / 100);
		surpluscapacity
				.text(Math
						.round((parseFloat(surpluscapacity.text()) - file.size / 1024 / 1024) * 100) / 100);

	};

	fileInfo.prototype.setPercent = function(percent) {
		this.fileList.childNodes[2].innerHTML = percent + "%";
	};

}

// delete file by id from Filelist
function delFile(fileId, fileSize) {
	// 更新选择的图片数量，总大小，剩余容量
	var selectcount = $("#" + swfu3.customSettings.fileSelectCountTarget);
	var selectsumsize = $("#" + swfu3.customSettings.fileSelectSumSizeTarget);
	var surpluscapacity = $("#" + swfu3.customSettings.fileSurplusCapacityTarget);
	selectcount.text(parseInt(selectcount.text()) - 1);
	selectsumsize
			.text(Math
					.round((parseFloat(selectsumsize.text()) - fileSize / 1024 / 1024) * 100) / 100);
	surpluscapacity
			.text(Math
					.round((parseFloat(surpluscapacity.text()) + fileSize / 1024 / 1024) * 100) / 100);

	// 删除选中的记录
	var span = document.getElementById(fileId);
	span.parentNode.removeChild(span);
	swfu3.cancelUpload(fileId, false);
	// 设置按钮与文件列表头的状态
	if (swfu3.getStats().files_queued === 0) {
		var uploadbutton = $("#" + swfu3.customSettings.uploadButtonTarget);
		//var cleanbutton = $("#" + swfu.customSettings.cleanButtonTarget);
		// var fileinfohead = $("#"+swfu.customSettings.fileInfoheadTarget);
		uploadbutton.attr("disabled", true);
		//cleanbutton.attr("disabled", true);
		// fileinfohead.attr("style","display:none");
	}
}

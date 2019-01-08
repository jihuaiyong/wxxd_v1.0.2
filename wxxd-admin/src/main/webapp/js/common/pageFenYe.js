/**
 * -----------分页js函数---------
 * pno--页数
 * psize--每页显示记录数
 * totalNum--页面数据记录总数
 * 分页部分是从真实数据行开始，因而存在加减某个常数，以确定真正的记录数
 * 纯js分页实质是数据行全部加载，通过是否显示属性完成分页功能
 **/
function goPage(pno,psize,totalNum){
    var itable = document.getElementById("authList1");//tbody的id
    var num = totalNum;//表格所有行数(所有记录数)
    //console.log(num);
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
    //总共分几页 
    if(num/pageSize > parseInt(num/pageSize)){   
            totalPage=parseInt(num/pageSize)+1;   
       }else{   
           totalPage=parseInt(num/pageSize);   
       }   
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize+1;//开始显示的行 
       var endRow = currentPage * pageSize;//结束显示的行   
       endRow = (endRow > num)? num : endRow;    //
      // console.log(endRow);
       //遍历显示数据实现分页
    for(var i=1;i<(num+1);i++){    
        var irow = itable.rows[i-1];
        if(i>=startRow && i<=endRow){
            irow.style.display = "table-row"; 
            //irow.style.display = "block"; 
        }else{
            irow.style.display = "none";
        }
    } 
    //var tempStr = "共"+"<button class='numshow'>"+num+"</button>"+"条记录  分"+"<button class='numshow'>"+totalPage+"</button>"+"页  当前在第"+"<button class='numshow'>"+currentPage+"</button>"+"页";
    var tempStr = "";
    if(currentPage>1){
        tempStr += "<span class='btnF' href=\"#\" onClick=\"goPage("+(1)+","+psize+","+num+")\">首页</span>";
        tempStr += "<span class='btnF' href=\"#\" onClick=\"goPage("+(currentPage-1)+","+psize+","+num+")\">上一页</span>"
    }else{
        tempStr += "<span class='btnF'>首页</span>";
        tempStr += "<span class='btnF'>上一页</span>";    
    }

//    for(var pageIndex= 1;pageIndex<totalPage+1;pageIndex++){
//        tempStr += "<a onclick=\"goPage("+pageIndex+","+psize+","+num+")\"><span class='btnF'>"+ pageIndex +"</span></a>";
//    }
    
    if(currentPage<totalPage){
        tempStr += "<span class='btnF' href=\"#\" onClick=\"goPage("+(currentPage+1)+","+psize+","+num+")\">下一页</span>";
        tempStr += "<span class='btnF' href=\"#\" onClick=\"goPage("+(totalPage)+","+psize+","+num+")\">尾页</span>";
    }else{
        tempStr += "<span class='btnF'>下一页</span>";
        tempStr += "<span class='btnF'>尾页</span>";    
    }

    document.getElementById("barcon").innerHTML = tempStr;
    
}
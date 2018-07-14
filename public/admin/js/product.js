$(function(){

    //render一下
    var page =1;
    var pageSize =5;
    render();
    function render(){
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: page,
                pageSize: pageSize,
            },
            success: function(info){
                console.log( info );
                $("tbody").html( template("tpl", info) );
                $("#query_parduct").html( template("tpll", info) );
                 //分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page ,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(a, b, c,p){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      page = p;
                      render();
                    }
                  
                })
            }
        })
    }

    //显示模态框
    $("#btn-add").on("click",function(){
        $("#addproduct").modal("show");

       

    })
       

})
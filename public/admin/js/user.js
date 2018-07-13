$(function(){
    //调用一下
    render();

    var page=1;
    var pageSize=5;
    var currentPage;
    function render(){
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: page||1,
                pageSize: pageSize||5,
            },
            success: function(info){
                $("tbody").html( template("tpl",info) );
                //分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,    //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: page,          //当前页
                    totalPages: Math.ceil(info.total/info.size) ,     //总页数
                    size:"small",               //设置控件的大小，mini, small, normal,large
                    onPageClicked:function(a, b, c,p){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                       page = p;
                       render();
                    }
                  });
                  
            }
        })
    }

    //启用禁用 部分
    $("tbody").on("click",".btn",function(){
        $("#start").modal("show");

        var id= $(this).parent().data("id");
        var status = $(this).hasClass("btn-success")? 1: 0 ;
        $(".btn_start").on("click",function(){
            $.ajax({
                type: "post",
                url: "/user/updateUser",
                data: {
                    id: id,
                    isDelete: status,
                },
                success: function(info){
                    console.log( info );
                    $("#start").modal("hide");
                    render();
                    
                }
            })
        })
    })
})
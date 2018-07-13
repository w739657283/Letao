$(function(){
    //渲染页面
    var page =1;
    var pageSize=5;
    function render(){
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(info){
                console.log( info );
                $("tbody").html( template("tpl",info) );

            }
        })
    }
    render();

    //打开添加页面
    $("#btn-add").on("click",function(){
        $("#addcategory").modal("show");
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 50,
            },
            success: function(info){
                console.log( info );
                $("#query_category").html( template("tpll",info) );
            }
        })
    })
    
    //给下拉框注册事件
    $("#query_category").on("click","a",function(){
        var id = $(this).data("id");
        var category = $(this).text();
        console.log( id,category );
        
    })
    
})



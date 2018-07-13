$(function(){

    render();
    var page =1;
    var pageSize=5;

    function render(){
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize,
            },
            success: function(info){
                console.log( info );
            }
        })
    }
})
$(function(){

    
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
                
                $("tbody").html( template("tpl", info ) );
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
    render();

    //打开模态框
    $("#btn-add").on("click",function(){
        $("#addFirst").modal("show");
       
    })
    //表单校验
    
//使用表单校验插件
$("form").bootstrapValidator({
    //配置校验时的图标,
    feedbackIcons: {
       //校验成功的图标
       valid: 'glyphicon glyphicon-fire',
       invalid:'glyphicon glyphicon-thumbs-down',
       validating: 'glyphicon glyphicon-refresh'
     },
   //3. 指定校验字段
    fields: {
        //校验用户名，对应name表单的name属性
        categoryName: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '分类不能为空'
                },
                callback: {
                    message: '用户名错误'
                }
            }
        },
    }
 });

    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        //确定添加分类
        
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $("form").serialize(),// serialize
            success: function(info){
                console.log( info );
                page=1;
                render();
                $("#form").data('bootstrapValidator').resetForm(true);//没有用reset 时候要加true;
            // $("#form").data("bootstrapValidator").resetForm();
                 $("#addFirst").modal("hide");
            }
        })
       
    })
})
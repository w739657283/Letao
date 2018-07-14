$(function () {
    //渲染页面
    var page = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                $("tbody").html(template("tpl", info));

            }
        })
    }
    render();

    //打开添加页面
    $("#btn-add").on("click", function () {
        $("#addcategory").modal("show");
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 50,
            },
            success: function (info) {
                console.log(info);
                $("#query_category").html(template("tpll", info));
            }
        })
    })

    //给下拉框注册事件
    $("#query_category").on("click", "a", function () {
        var id = $(this).data("id");
        var category = $(this).text();
        console.log(id, category);
        //渲染到 隐藏域
        $("[name='categoryId']").val(id);
        $(".check_first").text(category);

        //手动设置通过校验
        $("form").data("bootstrapValidator").updateStatus("categoryId","VALID");
    })  

    //添加文件 
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            $(".add_img").attr("src", data.result.picAddr);
            $("#add_logo").val( data.result.picAddr );
            //手动设置校验通过 
            $("form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
    });

    // // //表单校验
    $("form").bootstrapValidator({
        excluded: [],//不校验的内容
        //配置校验时的图标,
        feedbackIcons: {
            //校验成功的图标
            valid: 'glyphicon glyphicon-fire',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段 categoryId
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '一级分类不能为空'
                    },
                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '二级分类不能为空'
                    },
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '图片不能为空'
                    },
                }
            }

        }

    });




    $("form").on("success.form.bv",function(e){
        e.preventDefault();
        //发送数据
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $("form").serialize(),
            success: function(info){
                console.log( info );
                page=1;
                render();

                 //3. 重置内容和样式
                $("form")[0].reset();
                $("form").data("bootstrapValidator").resetForm();

                //4. 重置下拉框组件和图片
                $(".check_first").text("请选择一级分类");
                $("[name='categoryId']").val('');
                $(".add_img").attr("src", "image/none.png");
                $("[name='brandLogo']").val('');
            }
        })
    })
  
})
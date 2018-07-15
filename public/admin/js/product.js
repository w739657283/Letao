$(function(){

    //render一下
    var page =1;
    var pageSize =5;
    var img=[];
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
                $("tbody").html( template("tpl", info) );
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

       //查询二级分类
       $.ajax({
           type: "get",
           url: "/category/querySecondCategoryPaging",
           data: {
               page: 1,
               pageSize: 100,
           },
           success: function(info){
               console.log( info );
               $("#query_parduct").html( template("tpll",info) );
           }
       })

    })

    //给选择二级分类框注册点击事件brandId
    $("#query_parduct").on("click","a",function(){
        var id = $(this).data("id");
        var brandName = $(this).text();
        $(".check_first").text( brandName );
        $("[name='brandId']").val(id);
        
        $("form").data("bootstrapValidator").updateStatus("brandId","VALID");
        
    })
   
    //添加图片
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            if(img.length>=3){
                return;
            }
            img.push( data.result );
            console.log( img );
            $(".img_box").append( "<img src="+ data.result.picAddr +" width='100' height='100' alt='' >" );
            if( img.length===3 ){
              $("form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
            }else {
              $("form").data("bootstrapValidator").updateStatus("brandLogo","INVALID");
            }
        }
    });
       
    //表单校验功能
    $("form").bootstrapValidator({
        // 包含隐藏域时一定要设置这个属性!!!!
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],
      
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
          valid: 'glyphicon glyphicon-grain',
          invalid: 'glyphicon glyphicon-flash',
          validating: 'glyphicon glyphicon-refresh'
        },
      
        //3. 指定校验字段
        fields: {
          //校验用户名，对应name表单的name属性
          proName: {
            validators: {
              //不能为空
              notEmpty: {
                message: '商品名称不能为空'
              },
            }
          },
          brandId: {
            validators: {
              //不能为空
              notEmpty: {
                message: '二级分类不能为空'
              },
            }
          },
          proDesc: {
            validators: {
              //不能为空
              notEmpty: {
                message: '描述不能为空'
              },
            }
          },
          oldPrice: {
            validators: {
              //不能为空
              notEmpty: {
                message: '老价格不能为空'
              },
              //正则校验
              regexp: {
                regexp: /^[1-9]\d{0,9}$/,
                message: '价格太高了吧'
              },
            }
          },
          price: {
            validators: {
              //不能为空
              notEmpty: {
                message: '价格不能为空'
              },
              //正则校验
              regexp: {
                regexp: /^[1-9]\d{0,9}$/,
                message: '价格太高了吧'
              },
            }
          },
          size: {
            validators: {
              //不能为空
              notEmpty: {
                message: '用户名不能为空'
              },
              //正则校验
              regexp: {
                regexp: /^\d{2}-\d{2}$/,
                message: "尺码是32-55之间"
              },
            }
          },
          num: {
            validators: {
              //不能为空
              notEmpty: {
                message: '库存不能为空'
              },
              //正则校验
              regexp: {
                regexp: /^\d{1,4}$/,
                message: '库存是1-9999'
              },
            }
          },
          brandLogo: {
            validators: {
              //不能为空
              notEmpty: {
                message: '图片不能为空'
              },
              
              callback: {
                message: "必须三张"
              }
            }
          },
        }
      });

      //表单成功事件 
    $("form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        var datas = $("form").serialize();
//brandId=10&statu=1&proName=wewe&proDesc=wewewe&num=111&size=11-90&oldPrice=42&price=54&brandLogo=
        datas += "&picName1"+img[0].picName +"&picAddr1"+ img[0].picAddr +
                 "&picName2"+img[1].picName +"&picAddr2"+ img[1].picAddr +
                 "&picName3"+img[2].picName +"&picAddr3"+ img[2].picAddr ;
        console.log( datas );
        $.ajax({
          type: "post",
          url: "/product/addProduct",
          data: datas,
          success: function(info){
            console.log( info );
            //关闭模态框
            $("#addproduct").modal("hide");
            //重置表单 bootstrapValidator
            $("form")[0].reset();
            $("form").data("bootstrapValidator").resetForm();
            //重置图片
            img=[];
            $(".img_box").empty()
            //重置二级分类
            $(".check_first").text( "选择二级分类" );
            
          }
        })
    });
})
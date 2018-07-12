$(function(){


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
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 3,
            max: 6,
            message: '用户名长度必须在3到6之间'
          },
          callback: {
              message: '用户名错误'
          }
          
        }
    },
        password: {
            validators: {
              //不能为空
              notEmpty: {
                message: '密码不能为空'
              },
              //长度校验
              stringLength: {
                min: 6,
                max: 12,
                message: '密码长度必须在6到12之间'
              },
              callback: {
                message: '密码错误'
              }
            }
        }
    
    }
  
  });
 
  $("form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        url: "/employee/employeeLogin",
        type: "post",
        data: $("form").serialize(),
        success: function(info){
            if(info.error === 1000){
                //用户名不存在
                $("form").data('bootstrapValidator').updateStatus("username","INVALID","callback");
            }
             if(info.error ===1001) {
                //密码错误
                $("form").data('bootstrapValidator').updateStatus("password","INVALID","callback");

            }
            if(info.success)(
                location.href = "index.html"
            )
        }
    });
  });
  
  //重置按钮
  $("[type='reset']").on("click",function(){
       
    $("form").data('bootstrapValidator').resetForm();//重置表单，并且会隐藏所有的错误提示和图标
  })
      
})

$(function(){


  
  //进度条
  $(document).ajaxStart(function () {
      NProgress.start();
    });
  $(document).ajaxStop(function () {
    NProgress.done();
  });

  //左边分级
  $("#lt_cate").on("click",function(){
    $(".left_cate").slideToggle();
    
  })

  //左侧栏显示隐藏
  $("#nav_top1").on("click",function(){
    
    $(".lt_left").toggleClass("now");
    $(".left_lt").toggleClass("aaaaa")
  })

  //退出功能
  $("#nav_top2").on("click",function(){
    $("#modal_lt").modal("show");
    
  })
//确认退出功能 
  $(".btn_loginOut").on("click",function(){
    $.ajax({
      type: "get",
      url:"/employee/employeeLogout",
      success: function(info){
        if(info.success){
          location.href = "login.html";
        }
        
      }
    })
  })


})
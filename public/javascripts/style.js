
$(function(){
   $("div.list_lh").myScroll({
        speed:60, //数值越大，速度越慢
        rowHeight:63//li的高度
    });
    $('#myVerticalCarousel').carousel({
      interval: 5000
    })
	//导航头部hover显示与隐藏

	$('#username').hover(function(){
 	   $('.user-info').show();
	},function(){
		$('.user-info').hide();
	});
	$('.user-info').hover(function(){
 	   $('.user-info').show();
	},function(){
		$('.user-info').hide();
	});
    
    // 首页 新闻栏限定四条
    var count = $('.website-info-list li').length;
    if(count > 4){
    	$('.website-info-list li:gt(3)').hide();
    };

    
    // 日期选择控件
	$('#datetimepicker').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		format: 'yyyy-mm-dd',
		forceParse: 0
    });
    
    //用户中心 图片显示隐藏
    $('#showImg0').click(function(){
    	$('.img-show-wrap img').toggle();
    });
    
    // 用户中心 表单增加
    $('#saveInfo').click(function(){
    	console.log("点击事件获取");
        var tbString ='';
		var tbStringall ='';
		var tbStringHtml ='';
    	$('#info2 form :input').each(function(key,value){
    		console.log(key);

    		if(key==0){
    			firstId =value.value;
    			console.log(firstId);
    		}
    		else if(key==1){
    			var secondId =  value.value;
    			console.log(secondId);
    			 comm = firstId +"/"+secondId;
    			console.log(comm);
    			tbStringHtml = "<td>"+comm+"</td>";
    		}else {
    			tbStringHtml = tbStringHtml + "<td>"+value.value+"</td>";
    		}
    	});
    	var fullHtml = "<tr>"+tbStringHtml+"</tr>";
    	$('.table-prof-info').append(fullHtml);
    });

    
    
    // 导航条选中样式
    $('.navbar-right-select li a').each(function(){
        
        if($($(this))[0].href==String(window.location))

            $(this).parent().addClass('active');
    });


    // 新建任务卡
    $('.add-task-event').click(function(){
        $('.add-task').hide();
        $('.task-save').show();
    });

    $('#save').click(function(){
        var inputValue = $('.task-save input').val();
        console.log(inputValue);
        $('.add-task-event').css('display','none');
        $('.task-pannel').show();
        $('.task-name').text(inputValue);
   
    });
    
    

    //承接项目模态框
    $('#sureBtn').click(function (){
        console.log("确认模态框点击事件");
        $('#undertakeModal').modal('hide');

        $('#addTaskModal').modal('show');
        console.log("aaa");
    });


    //日历行程

    $('.fc-future').click(function(){
        console.log("aaa");
        $('#calendarStrokeModal').modal('show');
    });
    

  
});

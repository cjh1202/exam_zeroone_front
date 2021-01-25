$(function(){

    load();


})

function reLoad(){
    $("#table1").bootstrapTable("refresh");
}

function load() {
    var jsondata = {};
    var item = localStorage.getItem("user");
    var user = JSON.parse(item);
    var q_content = localStorage.getItem("q_content");
    var q_id=[]
    var q_idAll=[]

    $("#table1").bootstrapTable({
        url: "http://localhost:8080/exam_zeroone_ssm/fuzzySearch",

        striped: true,//是否显示隔行换色
        pageNumber: 1,//初始化加载第一页
        pagination: true,//是否分页
        sidePagination: 'server',
        pageSize: 15,//每页记录数
        method: 'POST',
        queryParams: function (params) {
            var paramsJSON = {
                offset: params.offset,
                pageNumber: params.limit,
                u_id: user.u_id,
                q_content:q_content
            };

            return JSON.stringify(paramsJSON)
        },

        columns: [
            {
                field : 'checked',
                checkbox: true,
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    return index+1;
                }
            },
            {
                title: '行号',
                align: "center",//水平居中
                halign: "center",//垂直居中
                width: 100,
                formatter: function (value, row, index) {
                    return index + 1;
                }

            },
            // {
            //     title:'行号',
            //     field:'id'
            // },
            {
                title: '题目类型',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'q_type',
                width: 100
            },
            {
                title: '试题分类',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'q_classify',
                width: 100
            },
            {
                title: '试题内容',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'q_content',

            },
            {
                title: '添加时间',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'q_createTime',
                width: 100
            }
            ,
            {
                title: '操作',
                // field:'createTime', //和后台pojo属性进行对应
                align: 'center',//列名称、列数据居中 水平居中
                halign: 'center', //垂直居中
                width: '150px',//设置列宽
                formatter: function (value, row, index) {
                    //如果将来 涉及到字符串数据传入参数  需要设置单引号
                    let d = '<a href="javascript:void(0);" onclick="removeData(\'' + row.q_id + '\')">删除</a>'
                    let m='<a href="javascript:void(0);" onclick="modifyTopic(\''+row.q_id+'\',\''
                        +row.q_type+'\',\''+row.q_classify+'\',\''+row.q_content+'\',\''+row.q_a+'\',\''
                        +row.q_b+'\',\''+row.q_c+'\',\''+row.q_d+'\',\''+row.q_answer+'\',\''+row.q_score+'\')">修改</a>'

                    return d + " " + m + " "
                }
            }
        ],
        onClickRow : function(row, tr,flied){
            // 书写自己的方法
            //console.log(row);
            console.log(tr);
            console.log(flied)
            //
        },
        onCheckAll:function(rows){
            for (let i = 0; i < rows.length; i++) {
                q_idAll.push(rows[i].q_id)
            }
            localStorage.setItem("fuzzySearchAll",q_idAll)
            localStorage.removeItem("fuzzySearch")
            console.log(localStorage.getItem("fuzzySearchAll"))

        },
        onCheck:function(row){
            //console.log(row.q_id)
            q_id.push(row.q_id)
            //console.log(q_id)
            localStorage.setItem("fuzzySearch",q_id)
            localStorage.removeItem("fuzzySearchAll")
            //console.log(localStorage.getItem("fuzzySearch")+1)
        },
        onUncheck:function(row){
            var a=q_id.indexOf(row.q_id);
            q_id.splice(a,1);
            localStorage.setItem("fuzzySearch",q_id)
            //console.log(localStorage.getItem("fuzzySearch"))
        },
        onUncheckAll:function (rows) {
            q_idAll.splice(0);
            localStorage.setItem("fuzzySearchAll",q_idAll)
            //console.log(localStorage.getItem("fuzzySearchAll"))
        }
    })


}

function removeData(q_id) {
    console.log(q_id)
    if (q_id) {
        let url = "http://localhost:8080/exam_zeroone_ssm/deleteTopic"
        var dataJSON = {};

        dataJSON.q_id = q_id;
        console.log(dataJSON)
        $.ajax({
            url: url,
            data: dataJSON,
            dataType: 'json',
            type: 'POST',
            success: function (result) {
                console.log(result.mark)
                //将返回的result数据，渲染到页面上
                if (result.mark == 1) {
                    //删除成功-->重新渲染表格的数据
                    reLoad()
                } else {
                    alert("删除失败");
                }
            },
            error: function (result) {
            }
        })

    } else {
        alert("数据有问题！无法删除");
    }
}

function modifyTopic(q_id,q_type,q_classify,q_content,q_a,q_b,q_c,q_d,q_answer,q_score) {


   if(q_type=="单选题"){
       localStorage.setItem("q_id",q_id);
       layer.open({
           type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
           title:'试题修改',
           maxmin:false,
           shadeClose:false,
           area:[1000+'px',($(window).height() - 50)+'px'],//弹出层的宽高
           content:'../main/updateSingleChoice.html',//设置弹出层打开的页面
           //弹出层页面成功打开后，的设置
           success:function(layero,index){
               //当前是表格页面     修改是表格的子页面   父页面JS代码中将数据传递给子页面中
               //获取子页面HTML对象
               let childBody= layer.getChildFrame('body',index);

               //在childBody子页面body区域中find（查找）input标签name属性是xxx的那个input对象，给其设置值为xxx
               $(childBody).find('textarea[id=content]').val(q_content);
               $(childBody).find('input[id=answerA]').val(q_a);
               $(childBody).find('input[id=answerB]').val(q_b);
               $(childBody).find('input[id=answerC]').val(q_c);
               $(childBody).find('input[id=answerD]').val(q_d);
               $(childBody).find('input[name=answer][value='+ q_answer +']').checked="checked";
               $(childBody).find('input[id=score]').val(q_score);
               $(childBody).find('input[id=classify]').val(q_classify);
               //获取子页面JS对象
           }
       });


   }else {
       localStorage.setItem("q_id",q_id);
       layer.open({
           type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
           title:'试题修改',
           maxmin:false,
           shadeClose:false,
           area:[1000+'px',($(window).height() - 50)+'px'],//弹出层的宽高
           content:'../main/updateBriefAnswer.html',//设置弹出层打开的页面
           //弹出层页面成功打开后，的设置
           success:function(layero,index){
               //当前是表格页面     修改是表格的子页面   父页面JS代码中将数据传递给子页面中
               //获取子页面HTML对象
               let childBody= layer.getChildFrame('body',index);

               //在childBody子页面body区域中find（查找）input标签name属性是xxx的那个input对象，给其设置值为xxx
               $(childBody).find('textarea[id=content1]').val(q_content);
               $(childBody).find('textarea[id=answer1]').val(q_answer);
               $(childBody).find('input[id=score1]').val(q_score);
               $(childBody).find('input[id=classify1]').val(q_classify);
               //获取子页面JS对象
           }
       });

   }



}
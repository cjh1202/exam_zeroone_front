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


    $("#table1").bootstrapTable({
        url: "http://localhost:8080/exam_zeroone_ssm/findAllTestPaper",

        striped: true,//是否显示隔行换色
        pageNumber: 1,//初始化加载第一页
        pagination: true,//是否分页
        sidePagination: 'server',
        pageSize: 2,//每页记录数
        method: 'POST',
        queryParams: function (params) {
            var paramsJSON = {
                offset: params.offset,
                pageNumber: params.limit,
                u_id: user.u_id
            };

            return JSON.stringify(paramsJSON)
        },

        columns: [
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
                title: '试卷分类',
                align: "center",//水平居中
                halign: "center",//垂直居中
                width: 100,
                field: 't_classify',

            },
            {
                title: '标题',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 't_title',

            },
            {
                title: '状态',
                align: "center",//水平居中
                halign: "center",//垂直居中
                width: 100,
                field: 't_statusStr',


            },
            {
                title: '添加时间',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 't_createTime',
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
                    let d = '<a href="javascript:void(0);" onclick="removeData(\'' + row.t_id + '\')">删除试卷</a>'
                    let m='<a href="javascript:void(0);" onclick="modifyTest(\''+row.t_id+'\',\''
                        +row.t_classify+'\',\''+row.t_title+'\',\''+row.t_startTime+'\',\''+row.t_endTime+'\',\''
                        +'\')">修改试卷</a>'
                    let s='<a href="javascript:void(0);" onclick="openTestPaper(\''+row.t_id+'\')">开启试卷</a>'
                    let n='<a href="javascript:void(0);" onclick="updateTest(\''+row.t_id+'\')">编辑试卷</a>'

                    return d + " " + m + " "+ s+" "+n
                }
            }
        ]
    })


}

function openTestPaper(t_id) {
    console.log(t_id);
    if (t_id) {
        let url = "http://localhost:8080/exam_zeroone_ssm/deleteTestPaper"
        var dataJSON = {};
        dataJSON.t_id = t_id;
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
                    alert("试卷开启成功")
                    reLoad()
                } else {
                    alert("试卷开启失败");
                }
            },
            error: function (result) {
            }
        })

    } else {
        alert("数据有问题！无法开启");
    }
}
function removeData(t_id) {
    console.log(t_id)
    if (t_id) {
        let url = "http://localhost:8080/exam_zeroone_ssm/deleteTestPaper"
        var dataJSON = {};

        dataJSON.t_id = t_id;
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

function updateTest(t_id) {
    console.log(t_id)
    localStorage.setItem("Tid",t_id);
    window.location.href="updateTestQuestionBank.html";
}

function modifyTest(t_id,t_classify,t_title,t_startTime,t_endTime) {

    /* console.log(t_id);
     console.log(t_classify);
     console.log(t_title);
     console.log(t_startTime);
     console.log(t_endTime);*/
    localStorage.setItem("t_id",t_id);
    layer.open({
        type:2,//可传入的值有：0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）。
        title:'试卷修改',
        maxmin:false,
        shadeClose:false,
        area:[1000+'px',($(window).height() - 50)+'px'],//弹出层的宽高
        content:'../main/updateTestPaper.html',//设置弹出层打开的页面
        //弹出层页面成功打开后，的设置
        success:function(layero,index){
            //当前是表格页面     修改是表格的子页面   父页面JS代码中将数据传递给子页面中
            //获取子页面HTML对象
            let childBody= layer.getChildFrame('body',index);

            //在childBody子页面body区域中find（查找）input标签name属性是xxx的那个input对象，给其设置值为xxx
            $(childBody).find('textarea[id=title]').val(t_title);
            $(childBody).find('input[id=classify]').val(t_classify);
            $(childBody).find('input[id=startTime]').val(t_startTime);
            $(childBody).find('input[id=endTime]').val(t_endTime);
            /* $(childBody).find('input[id=answerD]').val(q_d);
             $(childBody).find('input[name=answer][value='+ q_answer +']').checked="checked";
             $(childBody).find('input[id=score]').val(q_score);
             $(childBody).find('input[id=classify]').val(q_classify);*/
            //获取子页面JS对象
        }
    });
}
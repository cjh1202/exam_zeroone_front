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
        pageSize:15,//每页记录数
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
            },
            {
                title: '操作',
                // field:'createTime', //和后台pojo属性进行对应
                align: 'center',//列名称、列数据居中 水平居中
                halign: 'center', //垂直居中
                width: '150px',//设置列宽
                formatter: function (value, row, index) {
                    //如果将来 涉及到字符串数据传入参数  需要设置单引号
                    let d = '<a href="javascript:void(0);" onclick="addData(\'' + row.q_id + '\')">添加</a>'
                    return d
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

function addData(q_id) {
    var item1 = localStorage.getItem("Tid");
    console.log(q_id)
    if (q_id) {
        let url = "http://localhost:8080/exam_zeroone_ssm/addTopicToTestPaper"
        var dataJSON = {};
        dataJSON.q_id = q_id;
        dataJSON.t_id = item1;
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
                    alert("添加成功")
                    reLoad()
                } else {
                    alert("添加失败");
                }
            },
            error: function (result) {
            }
        })

    } else {
        alert("数据有问题！无法添加");
    }
}
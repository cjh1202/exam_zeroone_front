$(function(){

    load();


})

function reLoad(){
    $("#table1").bootstrapTable("refresh");
}

function load() {
    var jsondata = {};


    $("#table1").bootstrapTable({
        url: "http://localhost:8080/exam_zeroone_ssm/findAllUser",
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
            };

            return JSON.stringify(paramsJSON)
        },
        columns: [
            {
                title: '行号',
                align: "center",//水平居中
                halign: "center",//垂直居中
                formatter: function (value, row, index) {
                    return index + 1;
                }

            },
            {
                title: '用户姓名',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'u_username',
            },
            {
                title: '用户手机号',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'u_phone',
            },
            {
                title: '用户状态',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'u_status_Str',

            },
            {
                title: '注册时间',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'u_createTime',
            },
            {
                title: '操作',
                // field:'createTime', //和后台pojo属性进行对应
                align: 'center',//列名称、列数据居中 水平居中
                halign: 'center', //垂直居中
                formatter: function (value, row, index) {
                    //如果将来 涉及到字符串数据传入参数  需要设置单引号
                    let d = '<a href="javascript:void(0);" onclick="removeData(\'' + row.u_id + '\')">删除用户</a>'
                    if (row.u_status==0){
                        let s='<a href="javascript:void(0);" onclick="closeUser(\''+row.u_id+'\')">禁用用户</a>'
                    }else {
                        let s='<a href="javascript:void(0);" onclick="openUser(\''+row.u_id+'\')">开启用户</a>'
                    }
                    return d + " " + s
                }
            }
        ]
    })
}

function removeData(u_id) {
    console.log(u_id)
    if (u_id) {
        let url = "http://localhost:8080/exam_zeroone_ssm/deleteUser"
        var dataJSON = {};

        dataJSON.u_id = u_id;
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

function closeUser(u_id) {
    if (u_id) {
        let url = "http://localhost:8080/exam_zeroone_ssm/closeUser"
        var dataJSON = {};
        dataJSON.u_id = u_id;
        //     console.log(dataJSON)
        $.ajax({
            url: url,
            data: dataJSON,
            dataType: 'json',
            type: 'POST',
            success: function (result) {
                //            console.log(result.mark)
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

function openUser(u_id) {
    if (u_id) {
        let url = "http://localhost:8080/exam_zeroone_ssm/openUser"
        var dataJSON = {};
        dataJSON.u_id = u_id;
        //     console.log(dataJSON)
        $.ajax({
            url: url,
            data: dataJSON,
            dataType: 'json',
            type: 'POST',
            success: function (result) {
                //            console.log(result.mark)
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
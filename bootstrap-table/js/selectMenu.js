$(function(){

    load();


})

function reLoad(){
    $("#table1").bootstrapTable("refresh");
}

function load() {


    $("#table1").bootstrapTable({
        url: "http://47.94.174.61:8080/exam_zeroone_ssm/findAllMenu",

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
                width: 100,
                formatter: function (value, row, index) {
                    return index + 1;
                }

            },
            {
                title: '菜单名称',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'menu_name',

            },
            {
                title: '菜单等级',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'menu_level',

            },
            {
                title: '添加时间',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'menu_createTime',
            },
            {
                title: '操作',
                // field:'createTime', //和后台pojo属性进行对应
                align: 'center',//列名称、列数据居中 水平居中
                halign: 'center', //垂直居中
                width: '150px',//设置列宽
                formatter: function (value, row, index) {
                    //如果将来 涉及到字符串数据传入参数  需要设置单引号
                    let d = '<a href="javascript:void(0);" onclick="removeData(\'' + row.menu_id + '\')">删除菜单</a>'
                    return d
                }
            }
        ]
    })


}
function removeData(menu_id) {
    //console.log(t_id)
    if (menu_id) {
        let url = "http://47.94.174.61:8080/exam_zeroone_ssm/deleteMenu"
        var dataJSON = {};

        dataJSON.menu_id = menu_id;
       // console.log(dataJSON)
        $.ajax({
            url: url,
            data: dataJSON,
            dataType: 'json',
            type: 'POST',
            success: function (result) {
               // console.log(result.mark)
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
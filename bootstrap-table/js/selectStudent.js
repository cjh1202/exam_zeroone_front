$(function(){

    load();


})

function reLoad(){
    $("#table1").bootstrapTable("refresh");
}

function load() {
    var jsondata = {};
    var item = localStorage.getItem("t_id");



    $("#table1").bootstrapTable({
        url: "http://47.94.174.61:8080/exam_zeroone_ssm/queryScore",

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
                t_id:item
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
                title: '学生姓名',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'stu_name',

            },
            {
                title: '学生手机号码',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'stu_phone',

            },
            {
                title: '开考时间',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'stu_createTime',


            },
            {
                title: '交卷时间',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'stu_finishTime',

            }
            ,
            {
                title: '学生成绩',
                align: "center",//水平居中
                halign: "center",//垂直居中
                field: 'stu_score',
            },
            {
                title: '操作',
                // field:'createTime', //和后台pojo属性进行对应
                align: 'center',//列名称、列数据居中 水平居中
                halign: 'center', //垂直居中
                width: '150px',//设置列宽
                formatter: function (value, row, index) {
                    //如果将来 涉及到字符串数据传入参数  需要设置单引号
                    let d = '<a href="javascript:void(0);" onclick="selectData(\'' + row.t_id + '\',\'' + row.stu_id + '\')">查看详情</a>'
                    return d
                }
            }
        ]
    })


}

function selectData(t_id,stu_id) {
    console.log(stu_id);
    localStorage.setItem("t_id",t_id);
    localStorage.setItem("stu_id",stu_id);
    window.location.href="../main/selectOneStudentScore.html"
}

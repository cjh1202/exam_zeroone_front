$(function(){

    load();


})

function reLoad(){
    $("#table1").bootstrapTable("refresh");
}

function load(){
    var jsondata={};
    var item = localStorage.getItem("user");
    var user = JSON.parse(item);


    $("#table1").bootstrapTable({
        url:"http://localhost:8080/exam_zeroone_ssm/findAllQuestionBank",

        striped:true,//是否显示隔行换色
        pageNumber:1,//初始化加载第一页
        pagination:true,//是否分页
        sidePagination:'server',
        pageSize:2,//每页记录数
        method:'POST',
        queryParams: function (params) {
            var paramsJSON ={
                offset:params.offset,
                pageNumber:params.limit,
                u_id:user.u_id
            };

            return JSON.stringify(paramsJSON)
        },

/*
        method:"POST",
        dataType:"JSON",
        striped : true, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        singleSelect:false,//是否可多选
        sidePagination : "server",//server:服务器端分页|client：前端分页
        pageSize : 10,//单页记录数  告知前端使用者 每页显示多少个
        // showRefresh : true,//刷新按钮
        //查询时携带的参数  data：JSON.stringify()
        queryParams: function (params) {
            var paramsJSON ={};
            paramsJSON.u_id=user.u_id;

            var temp = {
                offset :params.offset,// SQL语句起始索引
                pageNumber : params.limit  // 每页显示数量
            };
            return JSON.stringify(paramsJSON,temp);

        },*/
        columns:[
            {
                title:'行号',
                align:"center",//水平居中
                halign:"center",//垂直居中
                width: 100,
                formatter:function(value,row,index){
                    return index+1;
                }

            },
            // {
            //     title:'行号',
            //     field:'id'
            // },
            {
                title:'题目类型',
                align:"center",//水平居中
                halign:"center",//垂直居中
                field:'q_type',
                width: 100
            },
            {
                title:'试题分类',
                align:"center",//水平居中
                halign:"center",//垂直居中
                field:'q_classify',
                width: 100
            },
            {
                title:'试题内容',
                align:"center",//水平居中
                halign:"center",//垂直居中
                field:'q_content',

            },
            {
                title:'添加时间',
                align:"center",//水平居中
                halign:"center",//垂直居中
                field:'q_createTime',
                width: 100
            }
             ,
            {
                title:'操作',
                // field:'createTime', //和后台pojo属性进行对应
                align:'center',//列名称、列数据居中 水平居中
                halign:'center', //垂直居中
                width:'150px',//设置列宽
                formatter:function(value,row,index){
                    //如果将来 涉及到字符串数据传入参数  需要设置单引号
                    let d='<a href="javascript:void(0);" onclick="removeData(\''+row.id+'\')">删除</a>'
                    let m='<a href="javascript:void(0);" onclick="modifyGoods(\''+row.id+'\',\''
                        +row.detail+'\',\''+row.name+'\',\''+row.category+'\',\''+row.stock+'\',\''+row.money+'\')">修改</a>'
                    let detail='<a href="javascript:void(0);" onclick="fetchDetail(\''+row.id+'\')">详情</a>'
                    return d+" "+m+" "+detail
                }
            }
         ]
    })
}


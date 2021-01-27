$(function(){

    load();


})

function reLoad(){
    $("#table1").bootstrapTable("refresh");
}

function load() {
    var jsondata = {};
    var item = localStorage.getItem("user");
    var item1 = localStorage.getItem("Tid");
    console.log(item1)
    var user = JSON.parse(item);
    var tq_id=[]
    var tq_idAll=[]

    $("#table1").bootstrapTable({
        url: "http://localhost:8080/exam_zeroone_ssm/findAllTestQuestionBank",

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
                t_id:item1
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
                title: '序号',
                halign: "center",//垂直居中
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },
            {
                title: "试题详情",
                //align:"center",
                halign:"center",
                formatter:function (value,row,index){
                    if (row.tq_type==="单选题"){
                        return "<p>["+row.tq_type+"]"+row.tq_content+"("+row.tq_score+"分)</p><p style='color: gray'>"+row.tq_classify+"</p><p class='singel'>A、"+row.tq_a+"</p><p class='singel'>B、"+row.tq_b+"</p><p class='singel'>C、"+row.tq_c+"</p><p class='singel'>D、"+row.tq_d+"</p><p>正确答案："+row.tq_answer+"</p>"
                    }else if (row.tq_type==="简答题"){
                        return "<p>["+row.tq_type+"]"+row.tq_content+"("+row.tq_score+"分)</p><p style='color: gray'>"+row.tq_classify+"</p><p>正确答案："+row.tq_answer+"</p>"
                    }
                }

            },
            {
                title: '操作',
                // field:'createTime', //和后台pojo属性进行对应
                align: 'center',//列名称、列数据居中 水平居中
                halign: 'center', //垂直居中
                width: '150px',//设置列宽
                formatter: function (value, row, index) {
                    //如果将来 涉及到字符串数据传入参数  需要设置单引号
                    let d = '<a href="javascript:void(0);" onclick="removeData(\'' + row.tq_id + '\')">删除</a>'
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
               tq_idAll.push(rows[i].tq_id)
            }
            localStorage.setItem("testQusetionBankAll",tq_idAll)
            localStorage.removeItem("testQusetionBank")
           // console.log(localStorage.getItem("testQusetionBankAll"))

        },
        onCheck:function(row){
            //console.log(row.tq_id)
            tq_id.push(row.tq_id)
            //console.log(tq_id)
            localStorage.setItem("testQusetionBank",tq_id)
            localStorage.removeItem("testQusetionBankAll")
            //console.log(localStorage.getItem("testQusetionBank"))
        },
        onUncheck:function(row){
            var a=tq_id.indexOf(row.tq_id);
            tq_id.splice(a,1);
            localStorage.setItem("testQusetionBank",tq_id)
            //console.log(localStorage.getItem("testQusetionBank"))
        },
        onUncheckAll:function (rows) {
            tq_idAll.splice(0);
            localStorage.setItem("testQusetionBankAll",tq_idAll)
            //console.log(localStorage.getItem("testQusetionBankAll"))
        }
    })
}

function removeData(tq_id) {
    console.log(tq_id)
    if (tq_id) {
        let url = "http://localhost:8080/exam_zeroone_ssm/deleteTopicFromTestPaper"
        var dataJSON = {};

        dataJSON.tq_id = tq_id;
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







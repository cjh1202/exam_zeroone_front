$(function(){

    load();


})

function reLoad(){
    $("#table1").bootstrapTable("refresh");
}

function load() {
    var jsondata = {};
    var t_id = localStorage.getItem("t_id");
    var stu_id = localStorage.getItem("stu_id");
    console.log(item1)
    var user = JSON.parse(item);

    $("#table1").bootstrapTable({
        url: "http://localhost:8080/exam_zeroone_ssm/testAndAnswer",

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
                stu_id: stu_id,
                t_id:t_id
            };

            return JSON.stringify(paramsJSON)
        },
        columns: [
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
                        return "<p>["+row.tq_type+"]"+row.tq_content+"("+row.tq_score+"分)</p><p style='color: gray'>"+row.tq_classify+"</p><p class='singel'>A、"+row.tq_a+"</p><p class='singel'>B、"+row.tq_b+"</p><p class='singel'>C、"+row.tq_c+"</p><p class='singel'>D、"+row.tq_d+"</p><p>正确答案："+row.tq_answer+"</p><p>学生答案："+row.sa_answer+"</p><p>本题得分："+"["+row.tq_answer+"分]"+"</p>"
                    }else if (row.tq_type==="简答题"){
                        return "<p>["+row.tq_type+"]"+row.tq_content+"("+row.tq_score+"分)</p><p style='color: gray'>"+row.tq_classify+"</p><p>正确答案："+row.tq_answer+"</p><p>学生答案："+row.sa_answer+"</p><p>本题得分："+"["+row.tq_answer+"分]"+"</p>"
                    }
                }

            }
        ]
    })
}








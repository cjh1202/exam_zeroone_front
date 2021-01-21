$(function(){

    load();


})

function reLoad(){
    $("#myTable1").bootstrapTable("refresh");
}

function load(){

    $("#myTable1").bootstrapTable({
        url:"http://localhost:8080/exam_zeroone_ssm/findAllSingleChoice",
        method:'POST',
        dataType:"JSON",

        striped:true,//是否显示隔行换色


        columns:[
            {
                title:'序号',
                align:"center",//水平居中
                halign:"center",//垂直居中
                formatter:function(value,row,index){
                    return index+1;
                }
            },
            {
                title:'试题内容',
                field:'s_content',


            },
            {
                title:'题目类型',
                field:'s_type',

            },
            {
                title:'试题分类',
                field:'s_classify',


            },
            {
                title:'发布时间',
                field:'s_createTime',
            },


            {
                title:'操作',
                formatter:function(value,row,index){
                    /*let url= 'http://localhost:8080/SpringMVC_1/removeData/'+index;*/
                    let deleteRow='<a href="javascript:query(\''+row.bid+'\')">查详情</a>';





                   /* let update="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:remove(\'"+url+"\')'>修改</a>";*/

                    return deleteRow;
                }
            }
            /*,
            {
                title:'操作2'
            }*/
        ],
        onDblClickRow:function(row, $element){
            console.log(row);
            console.log($element.innerHTML);
            // console.log(field)
        }
    });
}



function query(bid){

    var jsondata={};
    jsondata.bid=bid;
    $.ajax({
        url:"http://localhost:8080/07-Blog/queryDetail1",
        type:"post",
        data:jsondata,
        dataType: "json",
        success:function(result){

            if(result.mark==1){
                window.location.href="detail.html"
            }else if(result.mark==0){

            }
        }



    });

}
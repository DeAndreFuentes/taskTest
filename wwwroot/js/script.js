
var detailVisible = true;
var important = false;
var serverURL = "http://fsdi.azurewebsites.net/api";

var hideIcon = `<i class="far fa-eye-slash"></i>`;
var showIcon = `<i class="far fa-eye"></i>`;


function toggleDetails(){
    if(detailVisible) {
    $("#details").hide();

    $("#btnDetails")
     .html(showIcon = "show details")
     .removeClass("btn-secondary")
     .addClass("btn-primary");

    detailVisible = false;

} else {

    $("#details").show();

    $("btnDetails")
    .html(hideIcon + "Hide details")
    .removeClass("btn-primary")
    .addClass("btn-secondary");

    detailVisible = true;
}

}

function toggleImportant(){
    if(important){
        $("#iconImp").removeClass("fas").addClass("far");
        important = false;


    }
    else{
        $("#iconImp").removeClass("far").addClass("fas");
        important = true;
    }

}

function createTask(){

    var title = $("#txtTitle").val();
    var startDate = $("#txtStartDate").val();
    var dueDate = $("#dueDate").val();
    var status = $("#selStatus").val();
    var discription = $("#txtDescription").val();

    let errors = false;
    $("#listErrors").html("");


    if (!title) {
        errors = true;
        $("#listErrors").append("<li>Please verify the Title</li>");
    }

    if (status == "0"){
        errors = true;
        $("#listErrors").append("<li>Please select an initial Status</li>");
    }

    if(errors){
        $("#alertError").removeClass("hide");

        setTimeout(
            function () {
                $("#alertError").addClass("hide");
            },
            6000
        );


        return;
    }


    let task = new Task(0, title, important, startDate, dueDate, discription, +status);

    $.ajax({
        url: "/api/saveTask",
        type: "POST",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function (res) {
            console.log("Server response", res);
        },
        error: function (errDetails){
            console.log("Error", errDetails);
        },
    });

}

    function fetchData() {
        $.ajax({
            url: serverURL + "/tasks",
            type: "GET",
            success: function (res) {
                console.log("Response", res);


                for (let i = 0; i < res.length; i++) {
                    let task = res[i];
                    if (task.user == "DeAndre") {
                       displayTask(task);
                    }
                }



            },

            error: function (errDetails){
                console.log("Error getting data", errDetails);
            },

        });
    }


   



function displayTask(task) {
    let syntax = `<div class="task">
    <h3> ${task.title} </h3>
     <label>  <i id="iconImp" class="far fa-star"></i> ${task.important}  </label> 
     <p> <i id="iconImp" class="far fa-star"></i>${task.startDate}</p>
     <p><i id="iconImp" class="<i class="fas fa-calendar"></i>"${task.dueDate}</p>
     <p><i id="iconImp" class="far fa-star"></i>${task.discription}</p>
     <p><i class="fas fa-calendar"></i>"${task.startDate}</p>
     
</div>`;



    $("#pendingTasks").append(syntax);
    

}



function init(){
$("#btnDetails").click(toggleDetails);
$("#iconImp").click(toggleImportant);
$("#btnSave").click(createTask);

fetchData();

}

function testGet() {
    console.log("creating a test Req"); 

    $.ajax({
        url: "https://restclass.azurewebsites.net/api/test",
        type: "GET",
        success: function (res){
            console.log("Req succeed");
            console.log(res);
            
        },
        error: function(errDetails){
            console.log("Error on Req");
            console.log(errDetails);
        }
    });

}

window.onload = init; 
(function(){

    "use strict";


    /* -------------------------------------------------------------------- */
    /*
            App.Acme.Account
    */
    /* -------------------------------------------------------------------- */


    App.namespace("App.Acme.Accounts");


    /* -------------------------------------------------------------------- */
    /*
            Public
    */
    /* -------------------------------------------------------------------- */


    App.Acme.Accounts = {

        initialize : function(){

            var self = this;

            $.ajax({
                url : "/viewAccount",
                type : "GET",
                data : { userID : "15" },
                success : function(data){
                    self.displayAccounts(data);
                },
                error : function(data){
                    self.displayErrorMessage(data);
                }
            });

            $(document).on("click", "#withdraw", function(){

                self.account = $(this).data("account");

                if(!$("#withdraw-error").is(".hidden")){
                    $("#withdraw-error").addClass("hidden");
                }

                $("#withdraw-modal").modal("toggle");

            });

            $(document).on("click", "#deposit", function(){

                self.account = $(this).data("account");

                // reset the error message
                if(!$("#deposit-error").is(".hidden")){
                    $("#deposit-error").addClass("hidden");
                }

                $("#deposit-modal").modal("toggle");

            });

            $(document).on("click", "#deposit-confirm", function(){

                var valid = true;
                var error = "";
                var amount = parseInt($("#deposit-amount").val());

                if(isNaN(amount)){
                    error = "Please insert valid number";
                    valid = false;
                }

                // validate here

                if(valid === true){
                    $("#deposit-modal").modal("toggle");
                }
                else{
                    $("#deposit-error").removeClass("hidden");
                    $("#deposit-error").html(error);
                }

            });

            $(document).on("click", "#withdraw-confirm", function(){

                var valid = true;
                var error = "";
                var amount = parseInt($("#withdraw-amount").val());

                if(isNaN(amount)){
                    error = "Please insert valid number";
                    valid = false;
                }

                if(valid === true){
                    $("#withdraw-modal").modal("toggle");
                }
                else{
                    $("#withdraw-error").removeClass("hidden");
                    $("#withdraw-error").html(error);
                }

            });

        },

        displayAccounts : function(data){

            var html = "";

            for(var i = 0; i < data.length; i++){

                var account = data[i];

                var classStyle = "success";

                if(account["balance"] < 0){
                    classStyle = "warning";
                }

                html+= "<tr class='" + classStyle + "'>";
                html += "<td>" + account["account_number"] + "</td>";
                html += "<td>" + account["created_date"] + "</td>";
                html += "<td>" + account["type"] + "</td>";
                html += "<td> R" + account["balance"] + "</td>";

                if(account["overdraft_limit"] !== undefined){
                    html += "<td> R" + account["overdraft_limit"] + "</td>";
                }

                else{
                    html += "<td> -- </td>";
                }

                // buttons with account number id
                html += "<td>" +
                        "<button type='button' id='withdraw' data-account='" + JSON.stringify(account) + "' class='btn btn-primary'>Withdraw</button> " +
                        "<button type='button' id='deposit' data-account='" + JSON.stringify(account) + "' class='btn btn-info'>Deposit</button>" +
                        "</td>";

                html+= "</tr>";

                $("#my-accounts-body").append(html);

                html = "";

            }

            $("#my-accounts").removeClass("loading");
            $(".loader-container").addClass("hidden");

        },

        displayErrorMessage : function(error){
            console.log(error);
        }

    };


    /* -------------------------------------------------------------------- */
    /*
            Bootstrap
    */
    /* -------------------------------------------------------------------- */


    $(function(){
        App.Acme.Accounts.initialize();
    });

})();

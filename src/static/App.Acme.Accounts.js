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
                url : "/accountsList",
                type : "GET",
                data : {},
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

            $(document).on("click", "#history", function(){

                self.account = $(this).data("account");

                $.ajax({
                    url : "/viewAccount",
                    type : "GET",
                    data : { account_number : self.account["account_number"] },
                    success : function(data){
                        self.createTransactionHistory(data);
                    },
                    error : function(data){
                        self.displayErrorMessage(data);
                    }
                });

                $("#history-modal").modal("toggle");

            });

            $(document).on("click", "#deposit-confirm", function(){

                var amount = parseInt($("#deposit-amount").val());
                var valid = true;
                var error = "";

                if(isNaN(amount)){

                    error = "Please insert valid number";
                    valid = false;

                }

                if(valid === true){

                    self.deposit(amount);

                    $("#deposit-modal").modal("toggle");

                }
                else{

                    $("#deposit-error").removeClass("hidden");
                    $("#deposit-error").html(error);

                }

            });

            $(document).on("click", "#withdraw-confirm", function(){

                var amount = parseInt($("#withdraw-amount").val());
                var valid = true;
                var error = "";

                if(isNaN(amount)){

                    error = "Please insert valid number";
                    valid = false;

                }

                if(self.account["type"] === "current"){

                    if((self.account["overdraft_limit"] + self.account["balance"]) < amount){

                        error = "Can not withdraw more than current and overdraft limit.";
                        valid = false;

                    }

                }

                if(self.account["type"] === "savings"){

                    if((self.account["balance"] - amount) < 1000){

                        error = "Savings account needs a minimum of R1000.00";
                        valid = false;

                    }

                }

                if(valid === true){

                    self.withdraw(amount);

                    $("#withdraw-modal").modal("toggle");

                }
                else{

                    $("#withdraw-error").removeClass("hidden");
                    $("#withdraw-error").html(error);

                }

            });

        },

        createTransactionHistory : function(data){

            var html = "";

            for(var i = 0; i < data.transactions.length; i++){

                var transaction = data.transactions[i];
                var classStyle = "info";

                if(transaction["type"] === "withdraw"){
                    classStyle = "bg-primary";
                }

                html += "<tr class='" + classStyle + "'>" +
                            "<td class='col-xs-4'>" + transaction["date"] + "</td>" +
                            "<td class='col-xs-2'>" + transaction["type"] + "</td>" +
                            "<td class='col-xs-3'> R" + transaction["balance"] + "</td>" +
                            "<td class='col-xs-3'> R" + transaction["amount"] + "</td>" +
                        "</tr>";

            }

            $("#transactions-table").html(html);

        },

        deposit : function(amount){

            var self = this;

            self.displayInfoMessage("Depositing...");

            $.ajax({
                url : "/deposit",
                type : "PUT",
                data : { account_number : self.account.account_number, amount : amount },
                success : function(data){

                    self.displaySuccessMessage("Success");
                    self.reloadAccounts();

                },
                error : function(data){
                    self.displayErrorMessage(data);
                }
            });

        },

        withdraw : function(amount){

            var self = this;

            self.displayInfoMessage("Withdrawing...");

            $.ajax({
                url : "/withdraw",
                type : "PUT",
                data : { account_number : self.account.account_number, amount : amount },
                success : function(data){

                    self.displaySuccessMessage("Success");
                    self.reloadAccounts();

                },
                error : function(data){
                    self.displayErrorMessage(data);
                }
            });

        },

        reloadAccounts : function(){

            var self = this;

            $("#my-accounts-body").html("");

            $.ajax({
                url : "/accountsList",
                type : "GET",
                data : {},
                success : function(data){
                    self.displayAccounts(data);
                },
                error : function(data){
                    self.displayErrorMessage(data);
                }
            });

            $("#my-accounts").addClass("loading");

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

                // one should never parse such sensitive information into a view
                // the only reason why I am is for time constraint to get validation client side later on
                // this can be changed for a live environment
                html += "<td>" +
                        "<button type='button' id='withdraw' data-account='" + JSON.stringify(account) + "' class='btn btn-primary'>Withdraw</button> " +
                        "<button type='button' id='deposit' data-account='" + JSON.stringify(account) + "' class='btn btn-info'>Deposit</button> " +
                        "<button type='button' id='history' data-account='" + JSON.stringify(account) + "' class='btn btn-default'>History</button>" +
                        "</td>";

                html+= "</tr>";

                $("#my-accounts-body").append(html);

                html = "";

            }

            $("#my-accounts").removeClass("loading");
            $(".loader-container").addClass("hidden");

        },

        displayErrorMessage : function(message){

            var self = this;

            $(".message").removeClass("alert-info alert-success");
            $(".message").html(message);
            $(".message").addClass("alert-error");
            $(".message").removeClass("hidden");

            setTimeout(function(){
                self.hideMessage();
            }, 5000);

        },

        displaySuccessMessage : function(message){

            var self = this;

            $(".message").removeClass("alert-error alert-info");
            $(".message").html(message);
            $(".message").addClass("alert-success");
            $(".message").removeClass("hidden");

            setTimeout(function(){
                self.hideMessage();
            }, 5000);

        },

        displayInfoMessage : function(message){

            var self = this;

            $(".message").removeClass("alert-error alert-success");
            $(".message").html(message);
            $(".message").addClass("alert-info");
            $(".message").removeClass("hidden");

            setTimeout(function(){
                self.hideMessage();
            }, 5000);

        },

        hideMessage : function(){

            if(!$(".message").is(".hidden")){
                $(".message").addClass("hidden");
            }
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

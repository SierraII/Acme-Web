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

            $.ajax({
               url : "/viewAccount",
               type : "GET",
               data : { userID : "15" },
               success : function(data){
                   console.log(data);
               },
               error : function(data){
                   console.log("error");
               }
           });


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

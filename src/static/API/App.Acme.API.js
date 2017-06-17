(function(){

    "use strict";


    /* -------------------------------------------------------------------- */
    /*
            App.Accounts
    */
    /* -------------------------------------------------------------------- */


    App.namespace("App.Acme.API");


    /* -------------------------------------------------------------------- */
    /*
            Public
    */
    /* -------------------------------------------------------------------- */


    App.Acme.API = {

        initialize : function(){

        },

        getUserAccount : function(userID){

            $.ajax({
                url : "/viewAccount",
                type : "GET",
                data : { userID : userID },
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

        App.Acme.API.initialize();

    });


})();

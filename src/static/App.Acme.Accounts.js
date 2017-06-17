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

            App.Acme.API.getUserAccount(15);

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

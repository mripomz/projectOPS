module.service('Accounts', function (requestServiceRegister) {

    var apiController = 'Account';

    return {
       
         Register : function(name,email,oldPasswod,newPassword,rolename,phone,department,room,callback)
        {
            return requestServiceRegister({
                verb: 'GET',
                controller: apiController,
                endpoint: 'Register',
                usertoken: false,
                query:
                {
                    'name' :name,
                    'email' :email,
                    'password' : oldPasswod,
                    'confirmPassword' : newPassword,
                    'name' :name,
                    'rolename': rolename,
                    'phone' : phone,
                    'department' : department,
                    'room' : room

                },
                callback: callback
            });
        },
    getUser : function( callback)
        {
            return requestServiceRegister({
                verb: 'GET',
                controller: apiController,
                endpoint: 'getUser',
                usertoken: true,
                callback: callback
            });
        },
         upadteUser : function( name,email,oldPasswod,newPassword,rolename,phone,department,room,callback)
        {
            return requestServiceRegister({
                verb: 'GET',
                controller: apiController,
                endpoint: 'upadteUser',
                usertoken: true,
                query:
                {
                    'name' :name,
                    'email' : email,
                    'oldPasswod' : oldPasswod,
                    'newPassword' : newPassword,
                    'name' :name,
                    'rolename': rolename,
                    'phone' : phone,
                    'department' : department,
                    'room' : room
                },
                callback: callback
            });
        },
         GetAllRoles : function( callback)
        {
            return requestServiceRegister({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetAllRoles',
                usertoken: false,
                callback: callback
            });
        },
    };
});
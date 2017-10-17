    <div id="wrapper" ng-controller="UsersCtrl" ng-init="initData()">
        <div class="vertical-align-wrap">
            <div class="vertical-align-middle">
                <div class="auth-box ">
                    <div class="left">
                        <div class="content">
                            <div class="header">
                                <div class=""><img src="assets/img/logo-dark.png" alt="Klorofil Logo"></div>
                                <p class="lead">Create your account</p>
                            </div>
                            
                            <div class="form-auth-small" >
                                <div class="form-group">
                                    <label for="name" class="control-label sr-only">Name</label>
                                      
                                    <input type="text" class="form-control" ng-model="createUser.name" id="signup-email" value="" placeholder="Your name">
                                </div>
                                <div class="form-group">
                                    <label for="signup-email" class="control-label sr-only">Email</label>
                                    <input type="text"  ng-model="createUser.email" class="form-control" id="signup-email"  placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <label for="signup-password" class="control-label sr-only">Password</label>
                                    <input type="password" ng-model="createUser.password" class="form-control" id="signup-password"  placeholder="Password">
                                </div>
                                <div class="form-group">
                                    <label for="signup-password" class="control-label sr-only">Confirm Password</label>
                                    <input type="password" 
                                    ng-model="createUser.confirmPassword" class="form-control" id="signup-password" placeholder="Confirm Password">
                                </div>
                                <button type="submit" class="btn btn-primary btn-lg btn-block"  ng-click="register()">Register</button>
                                <div class="row">
                                    <div class="bottom">
                                        <div class="col-md-6">
                                    <span class="helper-text"><i class="fa fa-arrow-left"></i> <a href="#">Back to Login</a></span>
                                        </div>
                                        <div class="col-md-6">
                                    <span class="helper-text"><i class="fa fa-lock"></i> <a href="#">Forgot password?</a></span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="overlay"></div>
                        <div class="content text">
                            <h1 class="heading">Organization Points System</h1>
                            <p></p>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
<!--     <div id="wrapper" ng-controller="UsersCtrl" ng-init="initData()">
        <div class="vertical-align-wrap">
            <div class="vertical-align-middle">
                <div class="auth-box ">
                    <div class="left">
                        <div class="content">
                            <div class="header">
                                <div class=""><img src="<?php echo Router::url("/img/logo.png");?>" alt="Klorofil Logo"></div>
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
    </div> -->

    <div id="wrapper" ng-controller="UsersCtrl" ng-init="initData()" style="padding-top: 20px">
        <div class="vertical-align-wrap">
            <div class="vertical-align-middle">

                <div class="regis-box">
                    <div class="row">
                        <div class="col-12">
                            <div class="content">
                                <div class="header">
                                    <div class="lead"><img src="<?php echo Router::url("/img/logo.png");?>" alt="Logo"></div>
                                    <p class="lead">Create your account</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="left">
                                <div class="content">
                                    <p>User Information</p>
                             <form class="form-auth-small" action="index.php">
                                <div class="form-group">
                                    <label for="name" class="control-label sr-only">Name</label>
                                    <input type="text" class="form-control" id="signup-email" ng-model="createUser.name"  placeholder="Your name">
                                </div>
                                <div class="form-group">
                                    <label for="signup-email" class="control-label sr-only">Email</label>
                                    <input type="email" class="form-control" id="signup-email" ng-model="createUser.email" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <label for="signup-password" class="control-label sr-only">Password</label>
                                    <input type="password" class="form-control" id="signup-password" ng-model="createUser.password"  placeholder="Password">
                                </div>
                                <div class="form-group">
                                    <label for="signup-password" class="control-label sr-only">Confirm Password</label>
                                    <input type="password" class="form-control" id="signup-password" ng-model="createUser.confirmPassword"  placeholder="Confirm Password">
                                </div>

                            </form>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="right">
                                <div class="content">
                                    <p>Personal Information</p>
                            <form class="form-auth-small" action="index.php">
                                <div class="form-group">
                                    <label for="name" class="control-label sr-only">Telephone Number</label>
                                    <input type="tel" class="form-control" id="signup-email" ng-model="createUser.phone" placeholder="Telephone Number/Organization Number">
                                </div>
                                <div class="form-group">
                                    <label for="signup-email" class="control-label sr-only">Lecturer or staff</label>
                                     <select class="form-control" ng-model="createUser.rolename" id="vehicleRoute" ng-options="ur for ur in userRole">
                                            <option value="">Select your roles</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="signup-password" class="control-label sr-only">Department</label>
                                    <input type="text" placeholder="Department" class="form-control" id="signup-password" ng-model="createUser.department">
                                </div>
                                <div class="form-group">
                                    <label for="signup-password" class="control-label sr-only">Room</label>
                                    <input type="text" class="form-control" id="signup-password" ng-model="createUser.room" placeholder="Room/Office">
                                </div>


                            </form>
                                </div>
                            </div>
                        </div>
                    </div>                  

                    <div class="row">
                        <div class="col">
                            <div class="right">
                                <div class="content">
                                    <button type="submit" class="btn btn-primary btn-lg btn-block" ng-click="register()">Register</button>
                                        <div class="bottom">
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="left">
                                            <span class="helper-text"><i class="fa fa-arrow-left"></i> <a href="<?php echo $this->base;?>
">Back to Login</a></span>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="right">
                                            <span class="helper-text"><i class="fa fa-lock"></i> <a href="#">Forgot password?</a></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                          
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
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
                            <?php echo $this->Form->create('Users'); ?>
                            <div class="form-auth-small" >
                                <div class="form-group">
                                    <label for="name" class="control-label sr-only">Name</label>
                                      
                                      <?php echo $this->Form->input('name', array("label" => "", "class" => "form-control", "placeholder" => __("Email"))); ?>
                                    
                                </div>
                                <div class="form-group">
                                    <label for="signup-email" class="control-label sr-only">Email</label>
                                    <?php echo $this->Form->input('email', array("label" => "", "class" => "form-control", "placeholder" => __("Email"))); ?>
                                
                                </div>
                                <div class="form-group">
                                    <label for="signup-password" class="control-label sr-only">Password</label>
                                    <?php echo $this->Form->input('password', array("label" => "", "class" => "form-control", "placeholder" => __("Email"))); ?>
                                   
                                </div>
                                <div class="form-group">
                                    <label for="signup-password" class="control-label sr-only">Confirm Password</label>
                                    <?php echo $this->Form->input('confirmPassword', array("label" => "", "class" => "form-control", "placeholder" => __("Email"))); ?>
                                    
                                </div>
                                <!-- <button type="submit" class="btn btn-primary btn-lg btn-block"  ng-click="register()">Register</button> -->
                                 <?php 
                                echo $this->Form->button(__("usersmanagement")." <i class='fa fa-fw fa-unlock-alt'></i>", array('type' => 'submit', 'class' => 'btn btn-primary btn-lg btn-block, 'escape' => false));    
                                ?>
                                <?php echo $this->Form->end(); ?>
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
                            <?php echo $this->Form->end(); ?>
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
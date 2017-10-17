<div id="wrapper">
        <div class="vertical-align-wrap">
            <div class="vertical-align-middle">
                <div class="auth-box ">
                    <div class="left">
                        <div class="content">
                            <div class="header">
                                <div class="logo text-center"><img style="margin-top:10px" src="<?php echo Router::url("/img/logo.png");?>" /></div>
                                <p class="lead">Login to your account</p>
                            </div>
                            <?php echo $this->Form->create('Users'); ?>
                                <div class="form-group">
                                    <label for="signin-email" class="control-label sr-only">Email</label>
                                    <!-- <input type="email" class="form-control" id="signin-email" value="email@domain.com" placeholder="Email">
 -->                                <?php echo $this->Form->input('username', array("label" => "", "class" => "form-control", "placeholder" => __("Email"))); ?>
                                 </div>
                                <div class="form-group">
                                    <label for="signin-password" class="control-label sr-only">Password</label>
                                    <?php echo $this->Form->password('password', array("label" => "", "class" => "form-control", "placeholder" => __("Password"), "maxlength" => 25)); ?>
                                </div>
                                <div class="form-group clearfix">
                                    <label class="fancy-checkbox element-left">
                                        <input type="checkbox">
                                        <span>Remember me</span>
                                    </label>
                                </div>
                                <!-- <button type="submit" class="btn btn-primary btn-lg btn-block">LOGIN</button> -->
                                <?php 
                                echo $this->Form->button(__("LOGIN")." <i class='fa fa-fw fa-unlock-alt'></i>", array('type' => 'submit', 'class' => 'btn btn-success', 'escape' => false));    
                            ?>

                                <div class="row">
                                    <div class="bottom">
                                        <div class="col-md-6">
                                    <span class="helper-text"><i class="fa fa-user-plus"></i> <a href="<?php echo $this->base."/Account/register";?>">Sign Up</a></span>
                                        </div>
                                        <div class="col-md-6">
                                    <span class="helper-text"><i class="fa fa-lock"></i> <a href="#">Forgot password?</a></span>
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
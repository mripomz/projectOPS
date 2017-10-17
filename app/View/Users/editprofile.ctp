<div id="wrapper" ng-controller="UsersCtrl" ng-init="getUser()">
		<!-- NAVBAR -->
		<nav class="navbar navbar-default navbar-fixed-top">
			<div class="brand">
				<a href="index.html"><img src="assets/img/logo.png" alt="Klorofil Logo" class="img-responsive logo"></a>
			</div>
			<div class="container-fluid">
				<div class="navbar-btn">
					<button type="button" class="btn-toggle-fullwidth"><i class="lnr lnr-arrow-left-circle"></i></button>
				</div>
				<form class="navbar-form navbar-left">
					<div class="input-group">
						<input type="text" value="" class="form-control" placeholder="Search dashboard...">
						<span class="input-group-btn"><button type="button" class="btn btn-primary">Go</button></span>
					</div>
				</form>
			
				<div id="navbar-menu">
					<ul class="nav navbar-nav navbar-right">
						<li class="dropdown">
							<a href="#" class="dropdown-toggle icon-menu" data-toggle="dropdown">
								<i class="lnr lnr-alarm"></i>
								<span class="badge bg-danger">1</span>
							</a>
							<ul class="dropdown-menu notifications">
								<li><a href="#" class="notification-item"><span class="dot bg-warning"></span>One reply from your post</a></li>
								<li><a href="#" class="more">See all notifications</a></li>
							</ul>
						</li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="lnr lnr-question-circle"></i> <span>Help</span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
							<ul class="dropdown-menu">
								<li><a href="#">About</a></li>
							</ul>
						</li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="assets/img/user.png" class="img-circle" alt="Avatar"> <span>{{user.Name}}</span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
							<ul class="dropdown-menu">
								<li><a href="page-profile.html"><i class="lnr lnr-user"></i> <span>My Profile</span></a></li>
								<li><a href="#"><i class="lnr lnr-exit"></i> <span>Logout</span></a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<!-- END NAVBAR -->
		<!-- LEFT SIDEBAR -->
		<div id="sidebar-nav" class="sidebar">
			<div class="sidebar-scroll">
				<nav>
					<ul class="nav">
						<li><a href="index.html" class=""><i class="lnr lnr-home"></i> <span>Dashboard</span></a></li>
					</ul>
				</nav>
			</div>
		</div>
		<!-- END LEFT SIDEBAR -->
		<!-- MAIN -->
		<div class="main">
			<!-- MAIN CONTENT -->
			<div class="main-content">
				<div class="container-fluid">
					<div class="panel panel-profile">
						<div class="clearfix">
							<!-- LEFT COLUMN -->
							<div class="profile-left">
								<!-- PROFILE HEADER -->
								<div class="profile-header">
									<div class="overlay"></div>
									<div class="profile-main">
										<img src="assets/img/user-medium.png" class="img-circle" alt="Avatar">
										<br>
										<input class="form-control" placeholder="Upload different photo.." type="file">
										<h3 class="name">{{user.Name}}</h3>
									</div>
									<div class="profile-stat">
										<div class="row">
											<div class="col-md-4 stat-item">
												45 <span>Posts</span>
											</div>
											<div class="col-md-4 stat-item">
												15 <span>Reply</span>
											</div>
											<div class="col-md-4 stat-item">
												2174 <span>Points</span>
											</div>
										</div>
									</div>
								</div>
								<!-- END PROFILE HEADER -->
								<!-- PROFILE DETAIL -->
								<div class="profile-detail">
									<div class="profile-info">
										<h4 class="heading">Basic Info</h4>
										<ul class="list-unstyled list-justify">
											<li>Name <span>{{user.Name}}</span></li>
											<li>Birthdate <span>24 Aug, 2016</span></li>
											<li>Mobile <span>{{user.Phone}}</span></li>
											<li>Email <span>{{user.Email}}</span></li>
										</ul>
									</div>
									
								</div>
								<!-- END PROFILE DETAIL -->
							</div>
							<!-- END LEFT COLUMN -->
							<!-- RIGHT COLUMN -->
							<div class="profile-right">
								<!-- TABBED CONTENT -->
								<div class="custom-tabs-line tabs-line-bottom left-aligned">
									<ul class="nav" role="tablist">
										<li class="active"><a href="#tab-info" role="tab" data-toggle="tab">User Information</a></li>
										<li class=""><a href="#tab-recent" role="tab" data-toggle="tab">Recent Activity</a></li>
									</ul>
								</div>
								<div class="tab-content">
									<div class="tab-pane fade in active" id="tab-info">
										<div>
											<h3 class="">Information</h3>
											<ul class="list-unstyled list-justify">
											
											<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-user"></i></span>
										<input class="form-control" ng-model='user.Name' placeholder="Name" type="text">
											</div>
											<br>
											<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-envelope-o"></i></span>
										<input class="form-control" placeholder="E-mail" ng-model='user.Email' type="email">
											</div>
											<br>
											<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-phone"></i></span>
										<input class="form-control" placeholder="Mobile-Number" ng-model='user.Phone' type="tel">
											</div>
											<br>
											<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-building-o"></i></span>
										<input class="form-control" placeholder="Department" type="text">
											</div>
											<br>
											<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-facebook"></i></span>
										<input class="form-control" placeholder="Facebook" type="">
											</div>
											<br>
											<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-twitter"></i></span>
										<input class="form-control" placeholder="Twitter" type="">
											</div>
											<br>
											<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-unlock-alt"></i></span>
										<input class="form-control" ng-model='user.oldPssword' placeholder="Old Password" type="password">
											</div>
											<br>
											<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-key"></i></span>
										<input class="form-control" placeholder="New Password" ng-model='user.newPasword'  type="password">
											</div>
											</ul>
										</div>
										<div>	
											<h3 class="">Social</h3>
											<ul class="list-inline social-icons">
											<li><a href="#" class="facebook-bg"><i class="fa fa-facebook"></i></a></li>
											<li><a href="#" class="twitter-bg"><i class="fa fa-twitter"></i></a></li>
											</ul>
										</div>

									<div class="row">
										<div class="col-md-6">
											<button type="button" class="btn btn-default right">Cancel</button>
										</div>
										<div class="col-md-6" id="toastr-demo">
											<button type="button" ng-click ="upadteUser()" class="btn btn-primary">Save Chanages</button>
										</div>
									</div>

									</div>

									<div class="tab-pane fade" id="tab-recent">
										<ul class="list-unstyled activity-timeline">
											<li>
												<i class="fa fa-comment activity-icon"></i>
												<p>Commented on post <a href="#">Prototyping</a> <span class="timestamp">2 minutes ago</span></p>
											</li>
											<li>
												<i class="fa fa-cloud-upload activity-icon"></i>
												<p>Uploaded new file <a href="#">Proposal.docx</a> to project <a href="#">New Year Campaign</a> <span class="timestamp">7 hours ago</span></p>
											</li>
											<li>
												<i class="fa fa-plus activity-icon"></i>
												<p>Added <a href="#">Martin</a> and <a href="#">3 others colleagues</a> to project repository <span class="timestamp">Yesterday</span></p>
											</li>
											<li>
												<i class="fa fa-check activity-icon"></i>
												<p>Finished 80% of all <a href="#">assigned tasks</a> <span class="timestamp">1 day ago</span></p>
											</li>
										</ul>
										<div class="margin-top-30 text-center"><a href="#" class="btn btn-default">See all activity</a></div>
									</div>
									
								</div>
								<!-- END TABBED CONTENT -->
							</div>
							<!-- END RIGHT COLUMN -->
						</div>
					</div>
				</div>
			</div>
			<!-- END MAIN CONTENT -->
		</div>
		<!-- END MAIN -->
		<div class="clearfix"></div>
		<footer>
			<div class="container-fluid">
				<p class="copyright">&copy; 2017 <a href="" target="_blank"></a>. All Rights Reserved.</p>
			</div>
		</footer>
	</div>
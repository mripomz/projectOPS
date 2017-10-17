<?php
App::uses('AppController', 'Controller');

class UsersController extends AppController {

	public function beforeFilter() {
            
        parent::beforeFilter();
        $this->layout = "default";
        $this->Auth->allow(array('logout'));
    }

    public function login() {

    	if ($this->request->is('post')) {

    		$username = $this->request->data['Users']['username'];
            $password = $this->request->data['Users']['password'];
            $dataReasponse = parent::POSTAPI(Configure::read("API_URL") . "/Account/Login/?accessToken=".Configure::read("AccessToken"), 
            	array( 
            		"username" => urlencode($username), 
            		"password" => urlencode($password),
                    "ip" => urlencode($_SERVER['REMOTE_ADDR'])
            	)
            );

            if(isset($dataReasponse) && ($dataReasponse->ServiceStatus == "LOGIN_SUCCESS"))
            {
            	//Auth in cakePHP
            	$this->Auth->login($dataReasponse);

            	//Token session
            	$this->Cookie->write('accessToken', $dataReasponse->UserToken, $encrypt = false, $expires = null);
                $this->Cookie->write('userId', $dataReasponse->UserId, $encrypt = false, $expires = null);
                $this->Cookie->write('roleName', $dataReasponse->Roles, $encrypt = false, $expires = null);

				return $this->redirect(Router::url('/home/dashboard', true));
            }
            else if(isset($dataReasponse) && ($dataReasponse->ServiceStatus == "LOGIN_FAIL"))
            {
                $this->set('ErrorMessage',parent::DisplayMessageError($dataReasponse->FailMessages));
            }
            else
            {
                $this->set('ErrorMessage', "Error!! Please contact admin.");
            }
    	}
    	else
    	{
    		$this->set('ErrorMessage',"");
    	}

    	$this->set("title", "TITLE_LOGIN");
    }

    public function logout()
    {
        $this->autoRender = false;
    	parent::GETAPI(Configure::read("API_URL") . "/Account/Logout/?accessToken=".urlencode($this->Auth->user()->UserToken));
        $this->Cookie->delete('accessToken');
        $this->Cookie->delete('userId');
        $this->Cookie->delete('roleName');
        $this->Auth->logout();

    	return  $this->redirect(Router::url('/users/login', true));
    }

     public function usersmanagement()
    {
        
        $name = $this->request->data['Users']['name'];
            $email = $this->request->data['Users']['email'];
            $password = $this->request->data['Users']['password'];
            $confirmPassword = $this->request->data['Users']['confirmPassword'];
            $roleName = 'roleName';
     

 }

 
    public function salesmanagement()
    {

        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Sales Management")." | Avia Business Management");
    }
    public function salesagencymanagement(){
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Sales agecy Management")." | Avia Business Management");
    }

    public function agencymanagement()
    {
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Agency Management")." | Avia Business Management");
    }
       public function editprofile()
    {
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Agency Management")." | Avia Business Management");
    }
}	
<?php
App::uses('Controller', 'Controller');

class RegisterController extends Controller {

	//public $uses = array("AviaBusinessManagement");
public $components = array(
        'Session',
        'Auth' => array(
            'loginRedirect' => array(
                'controller' => 'Account',
                'action' => 'usersmanagement'
            ),
            'logoutRedirect' => array(
                'controller' => 'users',
                'action' => 'login'
            )
        ),
        'Cookie'
    );

	


	public function beforeFilter() 
    {
		//Check language
        $this->_setLanguage();
        $this->Cookie->write('name', 'Larry');
	}

    public function _setLanguage()
    {
        if($this->Cookie->read('lang'))
        {
            if($this->Cookie->read('lang') != Configure::read('Config.language'))
            {
                Configure::write('Config.language', $this->Cookie->read('lang'));
            }
        }
    }

    //Helper Method
    /*
        EXAMPLE

        parent::GETAPI(Configure::read("API_URL") . "users/getdate", 
            array( 
                "username" => $username, 
                "password" => $password
            )
        );
    */
    public function GETAPI($url, $parameter = array())
    {
        if(count($parameter) > 0)
        {
            $parameter['language'] = Configure::read('Config.language');
            $url .= '&'.http_build_query($parameter);
        }

        //Start CURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);

        $result = curl_exec($ch);

        curl_close($ch);

        return json_decode($result);
    }

    /*
        EXAMPLE

        parent::POSTAPI(Configure::read("API_URL") . "users/login", 
            array( 
                "username" => urlencode($username), 
                "password" => urlencode($password)
            )
        );
    */
    public function POSTAPI($url, $parameter = array())
    {
        //Add language to api
        $url .= "&language=".Configure::read('Config.language');

        $fields_string = "";
        foreach($parameter as $key=>$value) 
        { 
            $fields_string .= $key.'='.$value.'&'; 
        }
        rtrim($fields_string, '&');

        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL, $url);
        curl_setopt($ch,CURLOPT_POST, count($parameter));
        curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $result = curl_exec($ch);

        curl_close($ch);

        return json_decode($result);
    }

    public function DisplayMessageError($object)
    {
        $messageError = "";

        foreach($object as $key => $error)
        {
            $messageError .= __($key)." : ".$error->DefaultMSG."<br/>";
        }

        return $messageError;
    }

}

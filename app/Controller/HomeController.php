<?php
App::uses('Controller', 'Controller');
App::uses('CakeEmail', 'Network/Email');
class HomeController extends AppController {

	public function beforeFilter() 
	{
            
        parent::beforeFilter();
        $this->layout = "default";
        
    }

    public function dashboard()
    {
        $this->set("userDetail", $this->Auth->user());
    	$this->set("title", "Dashboard | Avia Business Management");
    }

    public function emailTest()
    {
        $this->autoRender = false;
        $Email = new CakeEmail('smtp');
        $Email->to('nattapol@lannasoftworks.com');
        $Email->subject('About');
        $Email->send('My message');
    }
}
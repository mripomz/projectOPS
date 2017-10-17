<?php
App::uses('AppController', 'Controller');

class TestController extends AppController {

	public function beforeFilter() 
	{
            
        parent::beforeFilter();
        $this->layout = "admin";
        
    }
    public function test()
    {
    	$this->layout = "admin";
    
    }
  
}
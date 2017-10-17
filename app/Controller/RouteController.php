<?php
App::uses('Controller', 'Controller');

class RouteController extends AppController {

	public function beforeFilter() 
	{
            
        parent::beforeFilter();
        $this->layout = "admin";
        
    }

    public function routemanagement()
    {
        $this->set("userDetail", $this->Auth->user());
    	$this->set("title", __("Route Management")." | Avia Business Management");
    }

    public function stoppointmanagement()
    {
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Stop Point Management")." | Avia Business Management");
    }

    public function vehicleoperations()
    {
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Route Vehicle Operations")." | Avia Business Management");
    }

    public function vehiclemultipleoperations()
    {
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Route Vehicle Multiple Operations")." | Avia Business Management");
    }
    
}
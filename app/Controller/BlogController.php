<?php

App::uses('AppController', 'Controller');

class BlogController extends AppController {

	public $allow = array("home");

	public function beforeFilter() {

        parent::beforeFilter();
        //$this->Auth->allow($this->allow);

    }

    public function addblogmanagement()
    {
    	$this->layout = "admin";
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Pages Management")." | Avia Business Management");
    }

    public function bloglistmanagement()
    {
    	$this->layout = "admin";
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Pages Management")." | Avia Business Management");
    }

     public function Test()
    {
        $this->layout = "admin";
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Pages Management")." | Avia Business Management");
    }


	
}

<?php

App::uses('AppController', 'Controller');

class LocationController extends AppController {

	public function beforeFilter() {

        parent::beforeFilter();
    }

    public function locationmanagement()
    {
    	$this->layout = "admin";
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Location Management")." | Avia Business Management");
    }


}
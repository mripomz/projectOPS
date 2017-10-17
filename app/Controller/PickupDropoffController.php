<?php

App::uses('AppController', 'Controller');

class PickupDropoffController extends AppController {

    public function pricemanagement()
    {
    	$this->layout = "admin";
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Price Location Management")." | Avia Business Management");
    }

    public function servicemanagement()
    {
    	$this->layout = "admin";
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Service Management")." | Avia Business Management");
    }

    public function passengermanagement()
    {
        $this->layout = "admin";
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Passenger Management")." | Avia Business Management");   
    }
}	
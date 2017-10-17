<?php

App::uses('PaymentController', 'Controller');

class PaymentController extends AppController {

	public function beforeFilter() {

        parent::beforeFilter();
    }

    public function discountmanagement()
    {
		$this->layout = "admin";
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Discount Management")." | Avia Business Management");
    }

    public function feemanagement()
    {
    	$this->layout = "admin";
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Fee Management")." | Avia Business Management");
    }

    public function costqueuemanagement()
    {
        $this->layout = "admin";
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Fee Management")." | Avia Business Management");   
    }

}

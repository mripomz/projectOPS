<?php

App::uses('AppController', 'Controller');

class BankController extends AppController {

	public function beforeFilter() {

        parent::beforeFilter();
    }

    public function aviabankaccount()
    {
		$this->layout = "admin";
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Bank Account Management")." | Avia Business Management");
    }
}

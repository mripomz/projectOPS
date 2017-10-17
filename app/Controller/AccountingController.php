<?php
App::uses('AppController', 'Controller');

class AccountingController extends AppController {

	public function beforeFilter() {
            
        parent::beforeFilter();
        $this->layout = "admin";
        
    }

    public function informtransferlist()
    {
    	$this->set("userDetail", $this->Auth->user());
    	$this->set("title", __("Accounting Inform Transfer")." | Avia Business Management");
    }

    public function withdrawallist()
    {
    	$this->set("userDetail", $this->Auth->user());
    	$this->set("title", __("Accounting Withdrawal")." | Avia Business Management");
    }

    public function borrowcredit()
    {
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Borrow Credit")." | Avia Business Management");
    }

    public function debtor()
    {
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Unpaid Debtor")." | Avia Business Management");   
    }
}
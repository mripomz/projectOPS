<?php
App::uses('AppController', 'Controller');

class AgencyController extends AppController {

	public function beforeFilter() {
            
        parent::beforeFilter();
        $this->layout = "admin";
        
    }

    public function agencybooking()
    {
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Agency Booking")." | Avia Business Management");
    }

    public function topup()
   	{
   		$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Agency Topup")." | Avia Business Management");	
   	}

   	public function informtransfer()
   	{
   		$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Inform Transfer Topup")." | Avia Business Management");	
   	}

   	public function withdrawal()
   	{
   		$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Agency Withdrawal")." | Avia Business Management");	
   	}

   	public function history()
   	{
   		$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Agency History")." | Avia Business Management");	
   	}

    public function setting() 
    {
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Agency Setting")." | Avia Business Management");
    }
    public function paymentonlinebanking() 
    {
      $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Agency Setting")." | Avia Business Management");
    }

    public function omisecredit() 
    {
      $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Agency Setting")." | Avia Business Management");
    }
     public function omise() 
    {
      $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Agency Setting")." | Avia Business Management");
    }
     public function twoctwop() 
    {
      $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Agency Setting")." | Avia Business Management");
    }

}
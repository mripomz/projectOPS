<?php

App::uses('ReportController', 'Controller');

class ReportController extends AppController {
	public function beforeFilter() {

        parent::beforeFilter();
    }

    public function reports()
    {
		$this->layout = "admin";
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Reports")." | Avia Business Management");
    }

    public function reportspickupdropoff()
    {
    	$this->layout = "admin";
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Reports")." | Avia Business Management");
    }
    public function reporttaxandinsurance()
    {
        $this->layout = "admin";
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Reports")." | Avia Business Management");
    }
    public function reportpassenger()
    {
        $this->layout = "admin";
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Reports")." | Avia Business Management");
    }
    public function reportticketbooking()
    {
        $this->layout = "admin";
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Reports")." | Avia Business Management");
    }
    public function reportoperations()
    {
        $this->layout = "admin";
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Reports")." | Avia Business Management");
    }
    public function reportsellingticket()
    {
        $this->layout = "admin";
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Reports")." | Avia Business Management");
    }
    public function reportact()
    {
        $this->layout = "admin";
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Reports")." | Avia Business Management");
    }
    public function reporttaxandinspection()
    {
        $this->layout = "admin";
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Reports")." | Avia Business Management");
    }
    public function reportinsurance()
    {
        $this->layout = "admin";
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Reports")." | Avia Business Management");
    }
  
}

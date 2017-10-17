<?php

App::uses('AppController', 'Controller');

class AssetController extends AppController {

	public function beforeFilter() {

        parent::beforeFilter();
    }

    public function assetmanagement()
    {
		$this->layout = "admin";
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Assets Management")." | Avia Business Management");
    }

    public function seatcapacityarrangement()
    {
    	$this->layout = "admin";
    	$this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Seat Capacity and Seat Arrangement")." | Avia Business Management");
    }

    public function vehicletypemanage()
    {
        $this->layout = "admin";
        $this->set("userDetail", $this->Auth->user());
        $this->set("title", __("Vehicle Type Management")." | Avia Business Management");
    }

}

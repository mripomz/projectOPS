<?php

App::uses('Controller', 'Controller');

class AccountController extends Controller {


    public function register()
    {
		$this->layout = "default";

        $this->set("title", __("Booking Management")." | Avia Business Management");
    }


}

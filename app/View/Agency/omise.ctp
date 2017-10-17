<?php

define('OMISE_API_VERSION', '2015-11-17');
// define('OMISE_PUBLIC_KEY', 'PUBLIC_KEY');
// define('OMISE_SECRET_KEY', 'SECRET_KEY');
define('OMISE_PUBLIC_KEY', 'pkey_test_52jyu0r8o4307z0zz00');
define('OMISE_SECRET_KEY', 'skey_test_52jyu0r8mim84ylp454');

$charge = OmiseCharge::create(array(
  'amount' => 10025,
  'currency' => 'thb',
  'card' => $_POST["omiseToken"]
));

if ($charge['status'] == 'successful') {
  echo 'Success';
} else {
  echo 'Fail';
}

print('<pre>');
print_r($charge);
print('</pre>')
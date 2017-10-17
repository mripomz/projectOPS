<?php

  //Merchant Account Information
  $secretKey = "value";   //Get SecretKey from 2C2P Merchant Interface

  $stringToHash = '6.9' . '764764000000463' . 'description' . '0000000001000009152' . '1234'  .'000000199900'  . 'apiwat@lannasoftworks.com' . 'Y1005'.''. '' . '' . '' . '' . ''.'http://localhost:8080/avia-website/users/login'   . 'https://www.google.co.th' . 'Y' ;$hash = strtoupper(hash_hmac('sha1', $stringToHash ,'mAwRNxBQCX0R', false));   //Calculate Hash Value
 
?>

<!--Construct form to submit authorization request to 2c2p PGW-->
<!--Payment request data should be sent to 2c2p PGW with POST method inside parameter named 'paymentRequest'-->
<form action='https://demo2.2c2p.com/2C2PFrontEnd/RedirectV3/payment' method='POST' name='authForm'>
  <!--display wait message to user when page is loading-->
  Please wait for a while. Do not close the browser or refresh the page.    
  <!--load request data-->

  
  <?php echo "<input type='text' id='version' name='version' value='6.9'/>"; ?>
  <?php echo "<input type='text' id='merchant_id' name='merchant_id' value='764764000000463'/>"; ?>
  <?php echo "<input type='text' id='payment_description' name='payment_description' value='description' /> "; ?>
  <?php echo "<input type='text' id='order_id' name='order_id' value='0000000001000009152' />    ";?>                    
  <?php echo "<input type='text' id='invoice_no' name='invoice_no' value='1234' />"; ?>

  <?php echo "<input type='text' id='amount' name='amount' value='000000199900'/>"; ?>
  <?php echo "<input type='text' id='customer_email' name='customer_email' value='apiwat@lannasoftworks.com' />"; ?>
  <?php echo "<input type='text' id='pay_category_id' name='pay_category_id' value='Y1005'/>"; ?>
  <?php echo "<input type='text' id='promotion' name='promotion' value=''/>"; ?>
  <?php echo "<input type='text' id='user_defined_1' name=' user_defined_1' value=''/>"; ?>
  <?php echo "<input type='text' id='user_defined_2' name=' user_defined_2' value=''/>"; ?>
  <?php echo "<input type='text' id='user_defined_3' name=' user_defined_3' value=''/>"; ?>
  <?php echo "<input type='text' id='user_defined_4' name=' user_defined_4' value=''/>"; ?>
  <?php echo "<input type='text' id='user_defined_5' name=' user_defined_5' value=''/>"; ?>
  <?php echo "<input type='text' id='result_url_1' name='result_url_1' value='http://localhost:8080/avia-website/users/login'/>"; ?>
  <?php echo "<input type='text' id='result_url_2' name='result_url_2' value='https://www.google.co.th'/>"; ?>
  <?php echo "<input type='text' id='request_3ds' name='request_3ds' value='Y'/>"; ?>
  <?php echo "<input type='hidden' id='hash_value' name='hash_value' value='".$hash."'/>"; ?>

</form>

<script language="JavaScript">
  document.authForm.submit();     //submit form to 2c2p Redirect 
</script>
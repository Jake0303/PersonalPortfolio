<?php
//Store our variables
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

//Return to the original location
if ($name != "" && $email != "" && $subject != "" && $message != "")
{
//Mail their message to my email
 mail("200228935@student.georgianc.on.ca",$subject,"Hello my name is " . $name . "  " . $message,"From " . $email);
 header('Refresh: 2; url=http://webdesign4.georgianc.on.ca/~200228935/Portfolio/index.html');
 $message = "Thank you for contacting Jake Entertainment, we will get back to you shortly.";
 echo "<script type='text/javascript'>alert('$message');</script>";
}
?>

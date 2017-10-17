module.directive("lswDisplayStatus", function ($rootScope, $compile) {
	return {
        restrict: 'A',
        scope: 
        { 
            transaction: '='
        },
        template: ' <span>\
                            \
                    </span>',
        link: function( scope , element , attributes ) {

            var messageStr = "";

            if(!!scope)
            {
                if(attributes.typedisplay == "withdrawal")
                {
                    console.log(scope.transaction);
                    switch(scope.transaction.WithdrawalCreditStatus)
                    {
                        case 0:
                            messageStr = '<span style="color:brown"><strong>ยกเลิกการถอนเงิน</strong></span>';
                            break;
                        case 1:
                            if(scope.transaction.IsAccountingReview)
                            {
                                messageStr = '<span style="color:blue"><strong>กำลังตรวจสอบโดย '+ scope.transaction.AccountingName +'</strong></span>';
                            }
                            else
                            {
                                messageStr = '<span style="color:red"><strong>รอตรวจสอบ</strong></span>';   
                            }
                            break;
                        case 2:
                            if(scope.transaction.IsAccountingReview)
                            {
                                messageStr = '<span style="color:orange"><strong>กำลังดำเนินการโดย '+ scope.transaction.AccountingName +'</strong></span>';
                            }
                            else
                            {
                                messageStr = '<span style="color:orange"><strong>กำลังดำเนินการ</strong></span>';   
                            }
                            break;
                        case 3:
                            messageStr = '<span style="color:grey"><strong>ปฏิเสธการถอนเงิน</strong></span>';
                            break;
                        case 4:
                            messageStr = '<span style="color:green"><strong>เสร็จสิ้น</strong></span>';
                            break;
                    }
                }
                else if(attributes.typedisplay == "topup")
                {
                    if(scope.transaction.AccountingUserId == null && scope.transaction.IsConfirm == false && scope.transaction.IsReject == false)
                    {
                        messageStr = '<span style="color:red"><strong>รอยืนยัน</strong></span>';
                    }
                    else if(scope.transaction.AccountingUserId != null && scope.transaction.IsConfirm == false && scope.transaction.IsReject == false)
                    {
                        messageStr = '<span style="color:blue"><strong>กำลังตรวจสอบโดย '+ scope.transaction.AccountingName +'</strong></span>';  
                    }
                    else if(scope.transaction.IsConfirm == true && scope.transaction.IsReject == false)
                    {
                        messageStr = '<span style="color:green"><strong>ยืนยันการชำระเงิน</strong></span>';
                    }
                    else if(scope.transaction.IsConfirm == false && scope.transaction.IsReject == true)
                    {
                        messageStr = '<span style="color:grey"><strong>ปฏิเสธการชำระเงิน</strong></span>';
                    }
                }
            }
            
            var e =$compile(messageStr)(scope);
            element.replaceWith(e);
        }
    }
});
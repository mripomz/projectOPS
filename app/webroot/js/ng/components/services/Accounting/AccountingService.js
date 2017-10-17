module.service('Accounting', function (requestService) {

    var apiController = 'Accounting';

    return {
    	GetInformTransferList : function (UserId, timezoneOffset, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetInformTransferList',
                usertoken: true,
                query: {
                	'UserId' : UserId,
                	'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GetInformTransferListForAccounting : function (dateStart, dateEnd, timezoneOffset, isIgnoreLoadingBar, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetInformTransferListForAccounting',
                query: {
                    'dateStart' : dateStart,
                    'dateEnd' : dateEnd,
                	'timezoneOffset' : timezoneOffset
                },
                usertoken: true,
                isIgnoreLoadingBar : isIgnoreLoadingBar,
                callback: callback
            });
        },
        InformTransfer : function (informDetail, timezoneOffset, callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'InformTransfer',
                usertoken: true,
                body: {
                	'inform' : informDetail
                },
                query: {
                	'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GetInformTransferById : function(InformMoneyTransferId, UserId, timezoneOffset, callback)
        {
        	return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetInformTransferById',
                usertoken: true,
                query: {
                	'InformMoneyTransferId' : InformMoneyTransferId,
                	'UserId' : UserId,
                	'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        ActionInformTransfer : function(informTransfer, TypeAction, callback)
        {
        	return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'ActionInformTransfer',
                usertoken: true,
                body:
                {
                	'informTransfer' : informTransfer
                },
                query: {
                	'TypeAction' : TypeAction
                },
                callback: callback
            });
        },
        GetWithdrawalList : function (UserId, timezoneOffset, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetWithdrawalList',
                usertoken: true,
                query: {
                    'UserId' : UserId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GetWithdrawalListForAccounting : function (dateStart, dateEnd, timezoneOffset, isIgnoreLoadingBar, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetWithdrawalListForAccounting',
                usertoken: true,
                query: {
                    'dateStart' : dateStart,
                    'dateEnd' : dateEnd,
                    'timezoneOffset' : timezoneOffset
                },
                isIgnoreLoadingBar : isIgnoreLoadingBar,
                callback: callback
            });
        },
        WithdrawalApplyRequest : function (withdrawal, callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'WithdrawalApplyRequest',
                usertoken: true,
                body: {
                    'withdrawal' : withdrawal
                },
                callback: callback
            });
        },
        CancelWithdrawalCredit : function (cancelWithdrawal, callback) {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'CancelWithdrawalCredit',
                usertoken: true,
                body: {
                    'WithdrawalCreditId' : cancelWithdrawal.WithdrawalCreditId,
                    'Notes' : cancelWithdrawal.Notes
                },
                callback: callback
            });
        },
        GetWithdrawalCreditById : function (WithdrawalCreditId, userId, timezoneOffset, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetWithdrawalCreditById',
                usertoken: true,
                query: {
                    'WithdrawalCreditId' : WithdrawalCreditId,
                    'UserId' : userId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        GetWithdrawalCreditByIdStep2 : function (WithdrawalCreditId, userId, timezoneOffset, callback) {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'GetWithdrawalCreditByIdStep2',
                usertoken: true,
                query: {
                    'WithdrawalCreditId' : WithdrawalCreditId,
                    'UserId' : userId,
                    'timezoneOffset' : timezoneOffset
                },
                callback: callback
            });
        },
        ActionWithdrawalCredit : function(withdrawal, TypeAction, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'ActionWithdrawalCredit',
                usertoken: true,
                body:
                {
                    'withdrawal' : withdrawal
                },
                query: {
                    'TypeAction' : TypeAction
                },
                callback: callback
            });
        },
        ActionWithdrawalCreditStep2 : function(withdrawal, timezoneOffset, callback)
        {
            return requestService({
                verb: 'POST',
                controller: apiController,
                endpoint: 'ActionWithdrawalCreditStep2',
                usertoken: true,
                body:
                {
                    'withdrawal' : withdrawal,
                    'timezoneOffset' : timezoneOffset

                },
                callback: callback
            });
        },
        AddCredit : function(AgencyCreditId, CreditAmount, CreditNotes, BorrowCreditType, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'AddCredit',
                usertoken: true,
                query:
                {
                    'AgencyCreditId' : AgencyCreditId,
                    'CreditAmount' : CreditAmount,
                    'CreditNotes' : CreditNotes,
                    'BorrowCreditType' : BorrowCreditType

                },
                callback: callback
            });
        },
        ReduceCredit : function(AgencyCreditId, CreditAmount, CreditNotes, ReduceFromCreditType, callback)
        {
            return requestService({
                verb: 'GET',
                controller: apiController,
                endpoint: 'ReduceCredit',
                usertoken: true,
                query:
                {
                    'AgencyCreditId' : AgencyCreditId,
                    'CreditAmount' : CreditAmount,
                    'CreditNotes' : CreditNotes,
                    'ReduceFromCreditType' : ReduceFromCreditType

                },
                callback: callback
            });
        },
    };
});
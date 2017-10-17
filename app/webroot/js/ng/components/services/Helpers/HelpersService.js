module.service('Helpers', function (requestService, $rootScope, $filter, $window) {

    var showErrorMessage = function(failMessage)
    {
        var messageReturn = "";

        if(!!failMessage.ERROR_MESSAGE){
            messageReturn = failMessage.ERROR_MESSAGE
        }else{
            angular.forEach(failMessage, function(eachMessage){
                messageReturn += eachMessage.DefaultMSG + "<br/>";
            });
        }
    
        return messageReturn;
    }

    var prepareDataListForVehicleRoute = function(data)
    {   
       /// console.log(data);
        var temp = [];
        var currentRouteId = null;
        var newData = {};
        angular.forEach(data, function(eachVehicleTrip)
        {
            if(eachVehicleTrip.RouteId != currentRouteId)
            {
                if(currentRouteId != null)
                {
                    temp.push(newData);
                    newData = {};
                }
                currentRouteId = eachVehicleTrip.RouteId;
                newData.RouteId = eachVehicleTrip.RouteId;
                newData.VehicleOperationList = [];
                newData.VehicleOperationList.push(eachVehicleTrip);
            }
            else
            {
                newData.VehicleOperationList.push(eachVehicleTrip); 
            }
        });

        if(newData.VehicleOperationList != null && newData.VehicleOperationList.length > 0)
        {
            temp.push(newData); 
        }
        
        return temp;
    }

    var prepareDataForVehicleSeat = function(data, VehicleStandardList, seatSelect)
    {
        
        var temp = [];
        var level = [];
        var currentLevel = 1;
        var parentIndex = 0;
        angular.forEach(data, function(each){
            each.VehicleSeatFloorStyle = each.VehicleSeatFloorStyle.toString();
            temp = [];
            level = [];
            currentLevel = 1;
            angular.forEach(each.VehicleSeatList, function(seat){

                angular.forEach(seatSelect, function(eachSeatSelect){
                    if(eachSeatSelect.VehicleSeatId == seat.VehicleSeatId)
                    {
                        seat.Gender = eachSeatSelect.Gender;
                    }
                });

                if(!!VehicleStandardList && VehicleStandardList.length > 0)
                {
                    seat.StandardName = VehicleStandardList[$filter('lswIndexOf')(VehicleStandardList, { VehicleStandardId: seat.VehicleStandardId },'VehicleStandardId')].VehicleStandardName;    
                }
                
                if(seat.VehicleSeatPositionX == currentLevel)
                {
                    level.push(seat);
                }
                else
                {
                    temp.push(level);
                    level = [];
                    level.push(seat);
                    currentLevel = seat.VehicleSeatPositionX;
                }
            });

            temp.push(level);
            each.NewList = temp;
            if(parentIndex++ == 0)
            {
                each.IsOpen = true; 
            }
            else
            {
                each.IsOpen = false;    
            }
            
        });

        return data;
    }

    var getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    /* Excel Generate */
    var uri='data:application/vnd.ms-excel;base64,';
    var template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    var base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));};
    var format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
    /* End Excel Generate */

    return {
        showErrorMessage : showErrorMessage,
        prepareDataListForVehicleRoute : prepareDataListForVehicleRoute,
        prepareDataForVehicleSeat : prepareDataForVehicleSeat,
        tableToExcel:function(tableId,worksheetName){
            var table=document.getElementById(tableId).outerHTML,
                ctx={worksheet:worksheetName,table:table},
                href = uri + base64(format(template,ctx));
            return href;
        },
        getDistanceFromLatLonInKm : getDistanceFromLatLonInKm
    };
});
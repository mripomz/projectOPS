


<div id="ticketPrint"  class="hide">
                                    <table border="0" cellspacing="0" cellpadding="0" style="width:8cm;height:13cm;">
                                        <tbody>
                                            <tr>
                                                <td colspan="3" style="height:1.0cm;border-bottom: 1px #000 solid;" align="center" >
        
                                                    <div  style="position: absolute;left: 6cm;margin-top: 7mm" id="qrcode">
                                                    asdasdasd
                                                    </div>
                                                    <img  img src="../img/AviaLogoTicket.png" style="height: 3.0cm;width: 4.0cm;margin-top: 15mm"/>
                                                </td>
            
                                            </tr>
                                            <tr valign="top" style="height:5mm">
                                                <td align="center">
                                                    <strong style="font-size:18px">ใบรับฝากชำระ</strong>
                                                </td>
                                            </tr>
                                            <tr valign="top">
                                                <td>
                                                    <table border="0" cellspacing="0" cellpadding="0" style="width:100%">
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-head" style="width:4cm;">วันที่</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-head" style="width:3cm;">วันที่ DATE</td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-detail" style="width:4cm;">
                                                                <strong>
                                                                    {{globalVariable.currentVehicleOpreDetail.VehicleOperationDate | jsonDateTHAI:'DD MMMM YYYY'}} {{RouteProviceList[(RouteProviceList | lswIndexOf: { StopPointId: VehicleOperationSeats.StopPointStartId } : 'StopPointId')].Time | date:'HH:mm'}}
                                                                </strong>
                                                            </td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-detail" style="width:3cm;">
                                                                <strong>
                                                                    {{globalVariable.currentVehicleOpreDetail.VehicleOperationDate | jsonDateEN:'DD MMM YYYY'}} {{RouteProviceList[(RouteProviceList | lswIndexOf: { StopPointId: VehicleOperationSeats.StopPointStartId } : 'StopPointId')].Time | date:'HH:mm'}}
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-head" style="width:4cm;">ชื่อผู้โดยสาร</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-head" style="width:3cm;">NAME</td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-detail" colspan="3">
                                                                <strong id="passenger_center">{{PassengerDetail.PassengerFirstName}} {{PassengerDetail.PassengerLastName}}</strong>
                                                            </td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 15px;">
                                                            <td class="ticket-head" style="width:4cm;">จาก FROM</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-head" style="width:3cm;">ถึง TO</td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 21px;font-size: 28px;font-weight: bolder;">
                                                            <td style="width:4cm;">
                                                                <span ng-style="{
                                                                    'font-size':globalVariable.fontThaiSize,
                                                                    'line-height':globalVariable.fontThaiLineHeight
                                                                }">
                                                                    {{stopPointData.StopPointList[(stopPointData.StopPointList | lswIndexOf: { StopPointId: VehicleOperationSeats.StopPointStartId } : 'StopPointId')].StopPointName_TH}}
                                                                </span>
                                                                <br/>
                                                                <span ng-style="{
                                                                    'font-size':globalVariable.fontEngSize,
                                                                    'line-height':globalVariable.fontEngLineHeight
                                                                }">
                                                                    {{stopPointData.StopPointList[(stopPointData.StopPointList | lswIndexOf: { StopPointId: VehicleOperationSeats.StopPointStartId } : 'StopPointId')].StopPointName_EN}}
                                                                </span>
                                                            </td>
                                                            <td style="width:1cm;" align="center"><i class="fa fa-chevron-right" aria-hidden="true"></i></td>
                                                            <td style="width:3cm;">
                                                                <span ng-style="{
                                                                    'font-size':globalVariable.fontThaiSize,
                                                                    'line-height':globalVariable.fontThaiLineHeight
                                                                }">
                                                                    {{stopPointData.StopPointList[(stopPointData.StopPointList | lswIndexOf: { StopPointId: VehicleOperationSeats.StopPointEndId } : 'StopPointId')].StopPointName_TH}}
                                                                </span>
                                                                <br/>
                                                                <span ng-style="{
                                                                    'font-size':globalVariable.fontEngSize,
                                                                    'line-height':globalVariable.fontEngLineHeight
                                                                }">
                                                                    {{stopPointData.StopPointList[(stopPointData.StopPointList | lswIndexOf: { StopPointId: VehicleOperationSeats.StopPointEndId } : 'StopPointId')].StopPointName_EN}}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-head" style="width:4cm;line-height: 12px;">รถเบอร์<br/>Bus No.</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td style="width:3cm;">
                                                                <table border="0" cellspacing="0" cellpadding="0" style="width:100%">
                                                                    <tr style="height:8mm;">
                                                                        <td class="ticket-head" style="width:0.8cm;line-height: 12px;">ที่นั่ง<br/>SEAT No.</td>
                                                                        <td style="width:0.1cm;">&nbsp;</td>
                                                                        <td class="ticket-head" style="width:1.0cm;line-height: 12px;">ชานชาลา<br/>Platform No.</td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr style="height:5mm;">
                                                            <td style="width:4cm;">
                                                                <div style="width:100%;background:url('../img/background-black.png') repeat-x;">
                                                                    <div style="height:37px;">
                                                                        <strong style="margin-left: 5px;color:#FFF;font-size: 26px;">
                                                                            {{globalVariable.currentVehicleOpreDetail.VehicleNumber || '-'}}
                                                                        </strong>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td style="width:3cm;">
                                                                <table border="0" cellspacing="0" cellpadding="0" style="width:100%">
                                                                    <tr style="height:5mm;">
                                                                        <td style="width:0.8cm;">
                                                                            <div style="width:100%;background:url('../img/background-black.png') repeat-x;">
                                                                                <div style="height:37px;word-break: break-all;">
                                                                                    <strong style="margin-left: 5px;color:#FFF;font-size: 26px;" id="seat_no">2A</strong>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td style="width:0.1cm;">&nbsp;</td>
                                                                        <td style="width:1.0cm;">
                                                                            <div style="width:100%;background:url('../img/background-black.png') repeat-x;">
                                                                                <div 
                                                                                    ng-style="{
                                                                                        'font-size':globalVariable.fontTerminalName,
                                                                                        'line-height':globalVariable.fontTerminalNameLineHeight
                                                                                    }"
                                                                                    style="height:37px;word-break: break-all;">
                                                                                    <strong style="margin-left: 1px;color:#FFF;">{{TerminalName || '-'}}</strong>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td class="ticket-head" style="width:4cm;">รวมสุทธิ Total.</td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-head" style="width:3cm;">ผู้ดำเนินการ</td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td style="width:4cm;">
                                                                <strong style="line-height: 16px;font-size: 24px;" id="totalPrice_center">150</strong>
                                                            </td>
                                                            <td style="width:1cm;">&nbsp;</td>
                                                            <td class="ticket-detail" style="width:3cm;">
                                                                <strong>{{SellingName}}</strong>
                                                            </td>
                                                        </tr>
                                                        
                                                        <tr style="height:5mm;">
                                                            <td colspan="3">
                                                                <strong class="ticket-term-title">Terms and Conditions</strong>
                                                                <div class="ticket-term-detail">
                                                                1.กรณีที่ซื้อบัตรโดยสารแล้วไม่สามารถเดินทางได้ตามกำหนด กรุณาติดต่อพนักงานขายตั๋วก่อนเวลารถออก 2 ชม. เพื่อเลื่อนการเดินทางหรือคืนตั๋วโดยสาร มิฉะนั้นจะถือว่าสละสิทธิ์ Payment made are not refundable<br/>
                                                                2.กรณีคืนบัตรโดยสารหรือเลื่อนการเดินทาง จะมีค่าธรรมเนียม 30 บาททุกที่นั่ง The fare for changing the time or date of traveling are THB30 per seat.<br/>
                                                                3.นำสัมภาระติดตัวระหว่างเดินทางคนละไม่เกิน 2 ชั้น น้ำหนักรวมไม่เกิน 15 กก. หากสูญหายบริษัทฯ จะชดใช้ตามส่วน โดยไม่เกิน 500 บาท ของมีค่าควรนำติดตัวขึ้นไปบนรถ กรณีของที่ท่านนำติดตัวขึ้นไปบนรถทางบริษัทจะไม่รับผิดชอบไม่ว่ากรณีใดๆ เพราะอยู่ในความรับผิดชอบของผู้โดยสาร Valueable and Fragile Goods should be carried by the passenger. If passengers checked in such items as baggage, passengers agree they send for carriage of such items at their own risk.<br/>
                                                                4.กรณีรถเกิดอุบัติเหตุ ทางบริษัทเดินรถจะรับผิดชอบตามพระราชบัญญัติคุ้มครองผู้ประสบภัยจากรถ พ.ศ.2535 เท่านั้น In case of fault of accident, the operating company will be responsible for Victims Protection Act of 2535 only.
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr style="height:5mm;">
                                                            <td align="center" colspan="3">
                                                                <strong class="ticket-information">For more infomation please contact</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" colspan="3" >
                                                                <div style="background:url('../img/background-black.png') repeat-x; color:#FFF;    padding-bottom: 5px;padding-top: 5px;">
                                                                    <strong style="font-size: 36px;line-height: 18px;">aviabooking.net</strong>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr style="height:5mm; line-height: 0px;">
                                                            <td align="center" colspan="3">
                                                                <strong style="font-size: 22px;line-height: 0px;">info.aviabooking@gmail.com</strong>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
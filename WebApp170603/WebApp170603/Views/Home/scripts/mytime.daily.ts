namespace mytime {
    class Daily implements MytimeElement {
        private bodyContents: JQuery;

        htmlStructure = '<form class="form-horizontal">'
        + '<div class="form-group">'
        + '<div class="col-sm-2"></div>'
        + '<div class="col-sm-8">'
        + '<p>日付（出勤日）に時間を登録します．徹夜明けの終了時間の登録は徹夜明けのチェックボックスをONしてください．</p>'
        + '</div>'
        + '<div class="col-sm-2"></div>'
        + '</div>'
        + '<div class="form-group">'
        + '<label class="col-sm-3 control-label">日付 <span class="glyphicon glyphicon-calendar"></span></label>'
        + '<div class="col-sm-6">'
        + '<!--DatePicker-->'
        + '<input type="text" class="form-control" id="date-picker1" />'
        + '</div>'
        + '<div class="col-sm-3"></div>'
        + '</div>'
        + '<div class="form-group">'
        + '<label class="col-sm-3 control-label">時間 <span class="mytime-glyphicon-clock"></span></label>'
        + '<div class="col-sm-6">'
        + '<input type="text" class="form-control" id="time-picker1" />'
        + '</div>'
        + '<!--HH:SS OverNightCheck-->'
        + '<div class="col-sm-3">'
        + '<div class="checkbox"><label><input type="checkbox" id="check-box1" />徹夜明け</label></div>'
        + '</div>'
        + '</div>'
        + '<div class="form-group">'
        + '<!--Regist Start  Regist End-->'
        + '<div class="col-sm-2"></div>'
        + '<div class="col-sm-5"><button type="button" class="btn-info btn-lg btn-block" id="btn-start-time">出勤登録 <span class="glyphicon glyphicon-log-in"></span></button></div>'
        + '<div class="col-sm-5"><button type="button" class="btn-primary btn-lg btn-block" id="btn-end-time">退勤登録 <span class="glyphicon glyphicon-log-out"></span></button></div>'
        + '</div>'
        + '<div class="form-group">'
        + '<!--Return to Menu-->'
        + '<div class="col-sm-2"></div>'
        + '<div class="col-sm-10"><button type="button" class="btn-danger btn-lg btn-block" id="btn-goback-home">メニューに戻る <span class="glyphicon glyphicon-home"></span></button></div>'
        + '</div>'
        + '</form>';

        initModule = ($mainId: JQuery):void => {
            this.bodyContents = $mainId.find('#bodyContents');
        };

        loadDailyView = ($bodyContents: JQuery): void => {
            this.bodyContents.empty().append(this.htmlStructure);

            this.bindCrickHandle(this.bodyContents);
        }

        private bindCrickHandle = ($bodyContent: JQuery): void => {

            $bodyContent.find('#date-picker1').datepicker();
            $bodyContent.find('#time-picker1').timepicker({ 'timeFormat': 'H:i', 'step': 15 });

            $bodyContent.find('#btn-start-time').bind('click', () => {

                //the same as 'tap' event
                var loginName = $('#login-name').text();
                var dateTime = this.getDateTimeInput($bodyContent);

                if ($bodyContent.find('#check-box1').prop('checked')) {
                    alert("徹夜明けが入力されています");
                    dateTime = "fail";
                }
                

                if (dateTime != "fail") {
                    $.ajax({
                        type: mytime.Const.POST,
                        url: "/api/MytimeApi/",
                        data: { actionType: mytime.Const.AC02_ST_TIME, email0: loginName, startDateTime: dateTime }

                    }).done((data: mytime.JesonCarrier, textStatus: string, jqXHR: JQueryXHR) => {

                        if (data.actionResult == "processOK") {
                            //alert("data.actionResult " + data.actionResult);
                            daily.loadDailyView(this.bodyContents);
                            alert("登録を完了しました");
                        } else {
                            alert("response is " + data.actionResult + " " + textStatus);
                        }

                    }).fail((jqXHR: JQueryXHR, textStatus: string, errorThrown) => {
                        alert("error occured " + errorThrown);
                    });
                } else {
                    alert("入力が正しくありません");
                }

            });

            $bodyContent.find('#btn-end-time').bind('click', () => {

                //the same as 'tap' event
                var loginName = $('#login-name').text();
                var memo = $bodyContent.find('#date-picker1').val();
                
                var dateTime = this.getDateTimeInput($bodyContent);

                if (dateTime != "fail") {
                    //alert("email0: loginName, endDateTime: dateTime, memoColumn: memo " + loginName +" " + dateTime + " " + memo);
                    $.ajax({
                        type: mytime.Const.POST,
                        url: "/api/MytimeApi/",
                        data: { actionType: mytime.Const.AC03_END_TIME, email0: loginName, endDateTime: dateTime, memoColumn: memo.split("/").join("") }

                    }).done((data: mytime.JesonCarrier, textStatus: string, jqXHR: JQueryXHR) => {

                        if (data.actionResult == "processOK") {
                            //alert("data.actionResult " + data.actionResult);
                            daily.loadDailyView(this.bodyContents);
                            alert("登録を完了しました");
                        } else {
                            alert("response is " + data.actionResult + " " + textStatus);
                        }

                    }).fail((jqXHR: JQueryXHR, textStatus: string, errorThrown) => {
                        alert("error occured " + errorThrown);
                    });
                } else {
                    alert("入力が正しくありません");
                }

            });

            $bodyContent.find('#btn-goback-home').bind('click', () => {
                //alert("click btn-goback-home");
                home.loadHomeView(this.bodyContents);
            });
        };

        private getDateTimeInput = ($bodyContent: JQuery) => {
            var inputDate: string = $bodyContent.find('#date-picker1').val(); // 06/24/2017 MM/DD/YYYY
            var inputTime: string = $bodyContent.find('#time-picker1').val(); // 12:45 hh:mm
            var overNight: boolean = $bodyContent.find('#check-box1').prop('checked'); // true or false

            // validationはここに挿入 失敗時はreturn "fail"
            var dateCheck = mytime.utils.validate("MM/DD/YYYY", inputDate);
            var timeCheck = mytime.utils.validate("hh:mm", inputDate);
            if (dateCheck == "fail" || timeCheck == "fail") {
                return "fail";
            }

            if (overNight) {
                inputDate = mytime.utils.getNextDate(inputDate);
            }
            var retDate = inputDate.split("/").join("");
            var retTime = inputTime.split(":").join("");

            //alert("retDate + retTime " + retDate + retTime);
            return retDate + retTime;
        }

    }
    export var daily = new Daily();
}
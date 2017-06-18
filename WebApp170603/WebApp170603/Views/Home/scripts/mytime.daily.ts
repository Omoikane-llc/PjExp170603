namespace mytime {
    class Daily implements MytimeElement {
        private bodyContents: JQuery;

        htmlStructure = '<form class="form-horizontal">'
        + '<div class="form-group">'
        + '<div class="col-sm-2"></div>'
        + '<div class="col-sm-8">'
        + '<p>日付と時間を登録します．徹夜明けの終了時間の登録は徹夜明けのチェックボックスをONしてください．</p>'
        + '</div>'
        + '<div class="col-sm-2"></div>'
        + '</div>'
        + '<div class="form-group">'
        + '<label class="col-sm-3 control-label">日付 <span class="glyphicon glyphicon-calendar"></span></label>'
        + '<div class="col-sm-6">'
        + '<!--DatePicker-->'
        + '<input type="text" class="form-control" id="datepicker" />'
        + '</div>'
        + '<div class="col-sm-3"></div>'
        + '</div>'
        + '<div class="form-group">'
        + '<label class="col-sm-3 control-label">時間 <span class="mytime-glyphicon-clock"></span></label>'
        + '<div class="col-sm-6">'
        + '<input type="text" id="timepicker" class="form-control" />'
        + '</div>'
        + '<!--HH:SS OverNightCheck-->'
        + '<div class="col-sm-3">'
        + '<div class="checkbox"><label><input type="checkbox" />徹夜明け</label></div>'
        + '</div>'
        + '</div>'
        + '<div class="form-group">'
        + '<!--Regist Start  Regist End-->'
        + '<div class="col-sm-2"></div>'
        + '<div class="col-sm-5"><button class="btn-info btn-lg btn-block" id="btn-start-time">出勤登録 <span class="glyphicon glyphicon-log-in"></span></button></div>'
        + '<div class="col-sm-5"><button class="btn-primary btn-lg btn-block" id="btn-end-time">退勤登録 <span class="glyphicon glyphicon-log-out"></span></button></div>'
        + '</div>'
        + '<div class="form-group">'
        + '<!--Return to Menu-->'
        + '<div class="col-sm-2"></div>'
        + '<div class="col-sm-10"><button class="btn-danger btn-lg btn-block" id="btn-goback-home">メニューに戻る <span class="glyphicon glyphicon-home"></span></button></div>'
        + '</div>'
        + '</form>';

        initModule = ($mainId: JQuery) => {
            this.bodyContents = $mainId.find('#bodyContents');
            this.bodyContents.empty().append(this.htmlStructure);

            this.bindCrickHandle(this.bodyContents);
        };

        private bindCrickHandle = ($bodyContent: JQuery): void => {
            $bodyContent.find('#btn-start-time').bind('click', () => {
                //validate input value and update DB
                //the same as 'tap' event
                alert("click btn-start");
            });
        };


    }
    export var daily = new Daily();
}
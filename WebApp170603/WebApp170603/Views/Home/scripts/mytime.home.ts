namespace mytime {
    class Home implements MytimeElement {
        private bodyContents: JQuery;

        htmlStructure = '<form class="form-horizontal">'
        + '<div class="form-group">'
        + '<label class="col-sm-2 control-label" for="mail1">所属コード</label>'
        + '<div class="col-sm-10">'
        + '<input type="text" class="form-control" id="groupeName1" />'
        + '<p class="help-block">所属プロジェクト/グループを入力して下さい(不明の場合は入力不要)</p>'
        + '</div>'
        + '</div>'
        + '<div class="form-group">'
        + '<label class="col-sm-2 control-label" for="mail1">メールアドレス</label>'
        + '<div class="col-sm-10">'
        + '<input type="email" class="form-control" id="mail1" />'
        + '<p class="help-block">登録・照会するメールアドレスを入力して下さい</p>'
        + '</div>'
        + '</div>'
        + '<div class="form-group">'
        + '<div class="col-sm-2"></div>'
        + '<div class="col-sm-5"><button class="btn-info btn-lg btn-block" id="btn-daily-update">出退勤登録</button></div>'
        + '<div class="col-sm-5"><button class="btn-primary btn-lg btn-block" id="btn-monthly-download">月次照会</button></div>'
        + '</div>'
        + '</form>'
        + '</div>';

        initModule = ($mainId: JQuery) => {
            //this.bodyContents = $mainId.find('#bodyContents');
            //this.bodyContents.empty().append(this.htmlStructure);

        };

        private bindCrickHandle = ($bodyContent: JQuery): void => {

            $bodyContent.find('#btn-daily-update').bind('click', () => {
                alert("click btn-daily-update");
            });
        }
    }
    export var home = new Home();
}
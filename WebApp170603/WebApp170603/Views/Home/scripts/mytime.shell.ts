namespace mytime {
    class Shell implements MytimeElement {
        private bodyContents: JQuery;

        htmlStructure = '<div class="container">'
        + '<div class="navbar navbar-inverse navbar-fixed-top">'
        + '<div class="container">'
        + '<div class="navbar-header">'
        + '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'
        + '<span class="icon-bar"></span>'
        + '<span class="icon-bar"></span>'
        + '<span class="icon-bar"></span>'
        + '</button>'
        + '<a class="navbar-brand" href="/">マイタイムカード 実験版</a>'
        + '</div>'
        + '<div class="navbar-collapse collapse">'
        + '<ul class="nav navbar-nav">'
        + '<li><a href="/">ホーム</a></li>'
        + '<li><a href="/Help">API</a></li>'
        + '</ul>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="container" style="padding-top:70px" id="bodyContents">'
        + '<form class="form-horizontal">'
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
        + '</div>'
        + '</div>';

        initModule = ($mainId: JQuery) => {
            $mainId.html(this.htmlStructure);

            //this.bodyContents = $mainId;
            //mytime.home.initModule($mainId);
            this.bindCrickHandle($mainId);
        };

        private bindCrickHandle = ($bodyContent: JQuery): void => {

            $bodyContent.find('#btn-daily-update').bind('click', () => {
                alert("click btn-daily-update");
            });
        }
    }
    export var shell = new Shell();
}
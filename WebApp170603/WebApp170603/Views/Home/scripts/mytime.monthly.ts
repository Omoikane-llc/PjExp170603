namespace mytime {
    class Monthly implements MytimeElement {
        private bodyContents: JQuery;

        htmlStructure = '<div class="table-responsive">'
        + '<table class="table table-hover">'
        + '<thead>'
        + '<tr class="info">'
        + '<td>日付</td>'
        + '<td>出勤時間</td>'
        + '<td>退勤時間</td>'
        + '</tr>'
        + '</thead>'
        + '<tbody>'
        + '<tr>'
        + '<td>2017/06/01</td>'
        + '<td>09:30</td>'
        + '<td>18:45</td>'
        + '</tr>'
        + '<tr>'
        + '<td>2017/06/02</td>'
        + '<td>09:45</td>'
        + '<td>19:00</td>'
        + '</tr>'
        + '<tr>'
        + '<td>2017/06/03</td>'
        + '<td>10:00</td>'
        + '<td>19:45</td>'
        + '</tr>'
        + '<tr>'
        + '<td>2017/06/04</td>'
        + '<td>08:30</td>'
        + '<td>18:15</td>'
        + '</tr>'
        + '<tr>'
        + '<td>2017/06/05</td>'
        + '<td>09:30</td>'
        + '<td>18:30</td>'
        + '</tr>'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '<form class="form-horizontal">'
        + '<div class="form-group">'
        + '<!--Down load-->'
        + '<div class="col-sm-2"></div>'
        + '<div class="col-sm-8"><button type="button" class="btn-primary btn-lg btn-block" id="btn-download">ダウンロード <span class="glyphicon glyphicon-floppy-save"></span></button></div>'
        + '<div class="col-sm-2"></div>'
        + '</div>'
        + '<div class="form-group">'
        + '<!--Return to Menu-->'
        + '<div class="col-sm-2"></div>'
        + '<div class="col-sm-8"><button type="button" class="btn-danger btn-lg btn-block" id="btn-goback-home">メニューに戻る <span class="glyphicon glyphicon-home"></span></button></div>'
        + '<div class="col-sm-2"></div>'
        + '</div>'
        + '</form>';

        initModule = ($mainId: JQuery): void => {
            this.bodyContents = $mainId.find('#bodyContents');
        };

        loadMonthlyView = ($bodyContents: JQuery): void => {
            this.bodyContents.empty().append(this.htmlStructure);

            this.bindCrickHandle(this.bodyContents);
        }

        private bindCrickHandle = ($bodyContent: JQuery): void => {
            $bodyContent.find('#btn-download').bind('click', () => {
                alert("click btn-download");
                
            });

            $bodyContent.find('#btn-goback-home').bind('click', () => {
                alert("click btn-goback-home");
                home.loadHomeView(this.bodyContents);
            });
        };

    }
    export var monthly = new Monthly();
}
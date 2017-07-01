namespace mytime {
    class Monthly implements MytimeElement {
        private bodyContents: JQuery;
        private tableContents: JQuery;

        htmlStructure = '<form class="form-horizontal">'
        + '<div class="form-group">'
        + '<div class="col-sm-6"><button type="button" button class="btn-info btn-lg btn-block" id="btn-last-month"><span class="glyphicon glyphicon-arrow-left"></span> 先月を照会</button></div>'
        + '<div class="col-sm-6"><button type="button" button class="btn-primary btn-lg btn-block" id="btn-this-month">今月を照会 <span class="glyphicon glyphicon-arrow-right"></span></button></div>'
        + '</div>'
        + '</form>'
        +'<div class="table-responsive">'
        + '<table class="table table-hover">'
        + '<thead>'
        + '<tr class="info">'
        + '<td>日付</td>'
        + '<td>出勤時間</td>'
        + '<td>退勤時間</td>'
        + '</tr>'
        + '</thead>'
        + '<tbody id="table-contents">'
        //+ '<tr>'
        //+ '<td>2017/06/01</td>'
        //+ '<td>09:30</td>'
        //+ '<td>18:45</td>'
        //+ '</tr>'
        //+ '<tr>'
        //+ '<td>2017/06/02</td>'
        //+ '<td>09:45</td>'
        //+ '<td>19:00</td>'
        //+ '</tr>'
        //+ '<tr>'
        //+ '<td>2017/06/03</td>'
        //+ '<td>10:00</td>'
        //+ '<td>19:45</td>'
        //+ '</tr>'
        //+ '<tr>'
        //+ '<td>2017/06/04</td>'
        //+ '<td>08:30</td>'
        //+ '<td>18:15</td>'
        //+ '</tr>'
        //+ '<tr>'
        //+ '<td>2017/06/05</td>'
        //+ '<td>09:30</td>'
        //+ '<td>18:30</td>'
        //+ '</tr>'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '<form class="form-horizontal">'
        + '<div class="form-group">'
        + '<!--Down load-->'
        + '<div class="col-sm-2"></div>'
        + '<div class="col-sm-8"><a class="btn btn-primary btn-lg btn-block" id="btn-download" href="#" download="mytimeTable.csv" onclick="handleDownload()">ダウンロード <span class="glyphicon glyphicon-floppy-save"></span></a></div>'
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
            this.tableContents = this.bodyContents.find('#table-contents');

            this.bindCrickHandle(this.bodyContents);
        }

        private bindCrickHandle = ($bodyContent: JQuery): void => {
            $bodyContent.find('#btn-last-month').bind('click', () => {
                //alert("click btn-last-month");
                var loginName = $('#login-name').text();
                var searchMonth = mytime.utils.getMMDDYYYY("last");
                //alert("loginName searchMonth " + loginName + " " + searchMonth);

                this.createTableView(loginName, searchMonth);
            });

            $bodyContent.find('#btn-this-month').bind('click', () => {
                //alert("click btn-this-month");
                var loginName = $('#login-name').text();
                var searchMonth = mytime.utils.getMMDDYYYY("now");
                //alert("loginName " + loginName+" searchMonth " + searchMonth);

                this.createTableView(loginName, searchMonth);
            });

            $bodyContent.find('#btn-download').bind('click', () => {
                //alert("click btn-download");

                var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
                var param: number[] = [10.0, 5.0, 5.0];
                var content = this.getTableText(this.tableContents, param);
                var blob = new Blob([bom, content], { "type": "text/csv" });

                //alert("mytimeTable.csv " + content);
                if (window.navigator.msSaveBlob) {
                    window.navigator.msSaveBlob(blob, "mytimeTable.csv");

                } else {
                    $('#btn-download').attr("href", window.URL.createObjectURL(blob));
                    //document.getElementById("download").href = window.URL.createObjectURL(blob);
                }
            });

            $bodyContent.find('#btn-goback-home').bind('click', () => {
                //alert("click btn-goback-home");
                home.loadHomeView(this.bodyContents);
            });
        };

        private createTableView = (loginName: string, searchMonth: string): void => {
            $.ajax({
                type: mytime.Const.POST,
                url: "/api/MytimeApi/",
                data: { actionType: mytime.Const.AC04_MONTH_DATA, email0: loginName, memoColumn: searchMonth }

            }).done((data: mytime.JesonCarrier, textStatus: string, jqXHR: JQueryXHR) => {

                if (data.actionResult == "processOK") {
                    //alert("data.actionResult " + data.actionResult);
                    //alert("data.monthlyList.length " + data.monthlyList.length);
                    var tableBody = "";
                    if (data.monthlyList.length == 0) {
                        alert("登録されたデータがありません");
                    }
                    for (var i = 0; i < data.monthlyList.length; i++) {
                        //alert("data.monthlyList[" + i + "] " + data.monthlyList[i]);
                        var items = data.monthlyList[i].split(" ");
                        var yyyymmdd = items[0].substring(4, 8) + "/" + items[0].substring(0, 2) + "/" + items[0].substring(2, 4);
                        var startTime = items[1].substring(8, 10) + ":" + items[1].substring(10, 12);
                        var endTime = items[2].substring(8, 10) + ":" + items[2].substring(10, 12);
                        var tableRow = ("<tr><td>" + yyyymmdd + "</td><td>" + startTime + "</td><td>" + endTime + "</td></tr>");
                        tableBody = tableBody + tableRow;
                        //alert("data.monthlyList[" + i + "] " + data.monthlyList[i] + "\r\n" + "<tr>" + "<td>" + yyyymmdd + "</td>" + "<td>" + startTime + "</td>" + "<td>" + endTime + "</td>" + "</tr>");
                    }
                    //alert(tableBody);
                    this.tableContents.empty().append(tableBody);
                } else {
                    alert("response is " + data.actionResult + " " + textStatus);
                }

            }).fail((jqXHR: JQueryXHR, textStatus: string, errorThrown) => {
                alert("error occured " + errorThrown);
            });
        }

        private getTableText = (tableBody: JQuery, unitRowInfo: number[]) => {
            var result = "";
            var columns = unitRowInfo.length - 1;
            var orgStr = tableBody.text();
            var count = 0;
            for (var i = 0; i < orgStr.length;){
                if (count > columns) {
                    count = 0;
                }
                var colItem = orgStr.substring(i, i + unitRowInfo[count]);

                // unitRowInfo.length == 1のときはバグになるが．．．
                if (Math.abs(columns - count) < 1) {
                    result = result + "," + colItem + "\r\n";
                } else {
                    result = result + "," + colItem;
                }
                i = i + unitRowInfo[count];
                count++;
            }
            return result;
        }
    }
    export var monthly = new Monthly();
}
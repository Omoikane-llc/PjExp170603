namespace mytime.Const {

    export const GET = "get";
    export const POST = "post";
    export const PUT = "put";
    export const DELETE = "delete";

    export const AC01_CHK_ID = "check_id";
    export const AC02_ST_TIME = "put_start";
    export const AC03_END_TIME = "put_end";
    export const AC04_MONTH_DATA = "get_monthly_data";
}
namespace mytime {

    class Utils {
        // stub 暫定の実装
        getNextDate = (mmddyyyy: string) => {
            var temp: string[] = mmddyyyy.split("/");
            var tempNext: number = Math.floor(Number(temp[1]) + 1);

            var nextDate: string;
            if (tempNext < 10) {
                nextDate = temp[0] + "0" + String(tempNext).substring(0, 1) + temp[2];
            } else {
                nextDate = temp[0] + String(tempNext).substring(0, 2) + temp[2];
            }            
            
            //alert(tempNext + " " + nextDate + " " + mmddyyyy);
            return nextDate;
        }

        validate = (type: string, inputVal: string) => {
            var result = "";
            switch (type) {
                case "MM/DD/YYYY":
                    var temp: string[] = inputVal.split("/");
                    var dt = new Date();
                    var year = Number(dt.getFullYear()) + 1;

                    var chk = (temp.length == 3)
                        && (Number(temp[0]) < 13)
                        && (Number(temp[1]) < 32)
                        && (Number(temp[2]) > 2000)
                        && (Number(temp[2]) < year);

                    if (chk) {
                        var month = Math.floor(Number(temp[0]));
                        var inputDate = new Date(month + "/" + temp[1] + "/" + temp[2]);

                        if (inputDate.getTime() > dt.getTime()) {
                            result = "fail";
                        }

                    } else {
                        result = "fail";
                    }

                    break;

                case "hh:mm":

                    break;

                case "emailAddress":

                    break;

                default:
                    result = "fail";
                    break;
            }
            return result;
        }
    }
    export var utils = new Utils();
}
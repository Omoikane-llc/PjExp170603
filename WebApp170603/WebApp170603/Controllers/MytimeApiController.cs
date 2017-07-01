using Newtonsoft.Json;
using System.Data.Entity.Migrations;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp170603.Models;
using WebApp170603.Utils;

namespace WebApp170603.Controllers {

    public class MytimeApiController : ApiController {
        private AppDbConnection appDb = new AppDbConnection();

        // GET: api/MytimeApi
        public IEnumerable<string> Get() {
            return new string[] { "value1", "value2" };
        }

        // GET: api/MytimeApi/5
        public IQueryable<string> Get(string userId) {
            var name = appDb.Tb01Id.Where(id => id.Tb01Name_Id == userId).Select(id => id.Tb01Name_Id);

            return name;
        }

        // POST: api/MytimeApi
        public JsonCarrier Post(JsonCarrier data) {
            var act = data.ActionType;
            var res = data;

            switch (act) {
                case ConstMytime.AC01_CHK_ID:
                    res = Ac01checkId(data);
                    break;

                case ConstMytime.AC02_ST_TIME:
                    res = Ac02putStartTime(data);
                    break;

                case ConstMytime.AC03_END_TIME:
                    res = Ac03putEndTime(data);
                    break;

                case ConstMytime.AC04_MONTH_DATA:
                    res = Ac04getMonthlyData(data);
                    break;

                default:
                    break;

            }

            return res;
        }

        // PUT: api/MytimeApi/5
        public void Put(int id, [FromBody]string value) {
        }

        // DELETE: api/MytimeApi/5
        public void Delete(int id) {
        }



        private JsonCarrier Ac01checkId(JsonCarrier data) {
            var result = "";
            var userId = data.Email0;
            var checkResult = appDb.Tb01Id.Where(id => id.Tb01Name_Id == userId).Count();

            if (checkResult == 1) {
                result = "checkOK";
            } else if (checkResult > 1) {
                result = "checkNG 正しくないメールアドレスです";
            } else {
                result = "checkNG メールアドレスの登録がありません";
            }

            return new JsonCarrier { GroupeName = data.GroupeName, Email0 = data.Email0, ActionResult = result };
        }

        private JsonCarrier Ac02putStartTime(JsonCarrier data) {
            var result = "";
            var tb01_Id = data.Email0;
            var tb02_YYYYMMDD = data.StartDateTime.Substring(0, 8);
            var tb02_Id = data.Email0 + tb02_YYYYMMDD;

            // なければinsert, あればupdat
            var recordTb02 = new Tb02DailyRecord_ {
                Tb02DailyRecord_Id = tb02_Id,
                Tb02DailyRecord_MMDDYYYY = tb02_YYYYMMDD,
                Tb02DailyRecord_StartTimeStamp = data.StartDateTime,
                Tb01Name_Id = tb01_Id
            };
            appDb.Tb02DailyRecord.AddOrUpdate(recordTb02);

            try {
                appDb.SaveChanges();
                result = "processOK";
            } catch (System.SystemException ex) {
                result = "processNG " + ex.Message;
            }

            return new JsonCarrier { Email0 = tb01_Id, ActionResult = result };
        }

        private JsonCarrier Ac03putEndTime(JsonCarrier data) {
            var result = "";
            var tb01_Id = data.Email0;
            var tb02_memo = data.MemoColumn;
            var tb02_MMDDYYYY = data.EndDateTime.Substring(0, 8);
            var tb02_Id = "";
            if (tb02_memo.Length > 0) {
                tb02_Id = data.Email0 + tb02_memo;
            } else {
                tb02_Id = data.Email0 + tb02_MMDDYYYY;
            }

            // 1レコードであればupdate
            var recordTb02 = appDb.Tb02DailyRecord.Where(t2 => t2.Tb02DailyRecord_Id == tb02_Id);

            try {
                var target = recordTb02.Single();
                var startTime = target.Tb02DailyRecord_StartTimeStamp;
                if(startTime != null && startTime.Length > 0) {
                    target.Tb02DailyRecord_EndTimeStamp = data.EndDateTime;
                    target.Tb02DailyRecord_Memo = data.MemoColumn;

                    appDb.SaveChanges();
                    result = "processOK";
                } else {
                    result = "processNG 開始時間の登録がありません";
                }


            } catch (System.SystemException ex) {
                result = tb02_Id + " processNG " + ex.Message;
            }

            return new JsonCarrier { Email0 = tb01_Id, ActionResult = result };
        }

        private JsonCarrier Ac04getMonthlyData(JsonCarrier data) {
            var result = "";
            var tb01_Id = data.Email0;
            var tb02_memo = data.MemoColumn;
            var searchKey = tb02_memo.Substring(2, 6);

            // 対象の月のレコードを返す
            
            try {
                var recordTb02 = appDb.Tb02DailyRecord
                                    .Where(t2 => t2.Tb01Name_Id == tb01_Id)
                                    .Where(t2 => t2.Tb02DailyRecord_MMDDYYYY.Substring(0, 2) == tb02_memo.Substring(0, 2))
                                    .Where(t2 => t2.Tb02DailyRecord_MMDDYYYY.Substring(4, 4) == tb02_memo.Substring(4, 4));

                var monthlyList = recordTb02.Select(t2 => (t2.Tb02DailyRecord_MMDDYYYY + " " + t2.Tb02DailyRecord_StartTimeStamp + " " + t2.Tb02DailyRecord_EndTimeStamp)).ToArray();

                result = "processOK";
                return new JsonCarrier { Email0 = tb01_Id, ActionResult = result, MonthlyList = monthlyList };
            } catch(System.SystemException ex) {
                result = tb01_Id + " processNG " + ex.Message;
            }

            return new JsonCarrier { Email0 = tb01_Id, ActionResult = result };
        }
    }

    /// <summary>
    /// JSONのデータの入れ物
    /// </summary>
    public class JsonCarrier {
        [JsonProperty(PropertyName = "actionType")]
        public string ActionType { get; set; }

        [JsonProperty(PropertyName = "groupeName")]
        public string GroupeName { get; set; }

        [JsonProperty(PropertyName = "email0")]
        public string Email0 { get; set; }

        [JsonProperty(PropertyName = "startDateTime")]
        public string StartDateTime { get; set; }

        [JsonProperty(PropertyName = "endDateTime")]
        public string EndDateTime { get; set; }

        [JsonProperty(PropertyName = "memoColumn")]
        public string MemoColumn { get; set; }

        [JsonProperty(PropertyName = "monthlyList")]
        public string[] MonthlyList { get; set; }

        [JsonProperty(PropertyName = "actionResult")]
        public string ActionResult { get; set; }
    }
}

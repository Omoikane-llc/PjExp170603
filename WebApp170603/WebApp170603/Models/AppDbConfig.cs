using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace WebApp170603.Models
{
    public class AppDbConfig: DbMigrationsConfiguration<AppDbConnection>
    {
        public AppDbConfig()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
            ContextKey = "AppDbConnection";
        }

        protected override void Seed(AppDbConnection context)
        {
            base.Seed(context);

            // テストデータをセット
            var listTb01 = new List<Tb01Name_>
            {
              new Tb01Name_ { Tb01Name_Id = "test01@test.com", Tb01Name_Name = "test01Name", Tb01Name_MailAddress1 = "test01@test.com", Tb01Name_MailAddress2 = "test02@test.com", Tb01Name_MailAddress3 = "test03@test.com" }
            };
            listTb01.ForEach(x => context.Tb01Id.AddOrUpdate(x));

            var listTb02 = new List<Tb02DailyRecord_>
            {
                new Tb02DailyRecord_{Tb02DailyRecord_Id="test01@test.com20170501",Tb02DailyRecord_YYYYMMDD="20170501",Tb02DailyRecord_StartTimeStamp = "0901",Tb02DailyRecord_EndTimeStamp = "1901",Tb02DailyRecord_Memo = "データ01",Tb01Name_Id = "test01@test.com"},
                new Tb02DailyRecord_{Tb02DailyRecord_Id="test01@test.com20170515",Tb02DailyRecord_YYYYMMDD="20170515",Tb02DailyRecord_StartTimeStamp = "0915",Tb02DailyRecord_EndTimeStamp = "1915",Tb02DailyRecord_Memo = "データ02",Tb01Name_Id = "test01@test.com"},
                new Tb02DailyRecord_{Tb02DailyRecord_Id="test01@test.com20170531",Tb02DailyRecord_YYYYMMDD="20170531",Tb02DailyRecord_StartTimeStamp = "0931",Tb02DailyRecord_EndTimeStamp = "1931",Tb02DailyRecord_Memo = "データ03",Tb01Name_Id = "test01@test.com"}
            };
            listTb02.ForEach(x => context.Tb02DailyRecord.AddOrUpdate(x));

            context.SaveChanges();
        }
    }
}
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
              new Tb01Name_ { Tb01Name_Id = "test01@test.com", Tb01Name_Name = "test01Name", Tb01Name_MailAddress1 = "test01@test.com", Tb01Name_MailAddress2 = "test02@test.com", Tb01Name_MailAddress3 = "test03@test.com" },
              new Tb01Name_ { Tb01Name_Id = "demo01@demo.com", Tb01Name_Name = "demo01Name", Tb01Name_MailAddress1 = "demo01@demo.com", Tb01Name_MailAddress2 = "demo02@demo.com", Tb01Name_MailAddress3 = "demo03@demo.com" }
            };
            listTb01.ForEach(x => context.Tb01Id.AddOrUpdate(x));

            var listTb02 = new List<Tb02DailyRecord_>
            {
                new Tb02DailyRecord_{Tb02DailyRecord_Id="test01@test.com20170601",Tb02DailyRecord_MMDDYYYY="06012017",Tb02DailyRecord_StartTimeStamp = "060120170901",Tb02DailyRecord_EndTimeStamp = "060120171901",Tb02DailyRecord_Memo = "データ01",Tb01Name_Id = "test01@test.com"},
                new Tb02DailyRecord_{Tb02DailyRecord_Id="test01@test.com20170615",Tb02DailyRecord_MMDDYYYY="06152017",Tb02DailyRecord_StartTimeStamp = "061520170915",Tb02DailyRecord_EndTimeStamp = "061520171915",Tb02DailyRecord_Memo = "データ02",Tb01Name_Id = "test01@test.com"},
                new Tb02DailyRecord_{Tb02DailyRecord_Id="test01@test.com20170630",Tb02DailyRecord_MMDDYYYY="06302017",Tb02DailyRecord_StartTimeStamp = "063020170931",Tb02DailyRecord_EndTimeStamp = "063020171931",Tb02DailyRecord_Memo = "データ03",Tb01Name_Id = "test01@test.com"},
                new Tb02DailyRecord_{Tb02DailyRecord_Id="test01@test.com20170701",Tb02DailyRecord_MMDDYYYY="07012017",Tb02DailyRecord_StartTimeStamp = "070120170901",Tb02DailyRecord_EndTimeStamp = "070120171901",Tb02DailyRecord_Memo = "データ04",Tb01Name_Id = "test01@test.com"},
                new Tb02DailyRecord_{Tb02DailyRecord_Id="demo01@demo.com20170601",Tb02DailyRecord_MMDDYYYY="06012017",Tb02DailyRecord_StartTimeStamp = "060120170901",Tb02DailyRecord_EndTimeStamp = "060120171901",Tb02DailyRecord_Memo = "データ01",Tb01Name_Id = "demo01@demo.com"},
                new Tb02DailyRecord_{Tb02DailyRecord_Id="demo01@demo.com20170615",Tb02DailyRecord_MMDDYYYY="06152017",Tb02DailyRecord_StartTimeStamp = "061520170915",Tb02DailyRecord_EndTimeStamp = "061520171915",Tb02DailyRecord_Memo = "データ02",Tb01Name_Id = "demo01@demo.com"},
                new Tb02DailyRecord_{Tb02DailyRecord_Id="demo01@demo.com20170630",Tb02DailyRecord_MMDDYYYY="06302017",Tb02DailyRecord_StartTimeStamp = "063020170931",Tb02DailyRecord_EndTimeStamp = "063020171931",Tb02DailyRecord_Memo = "データ03",Tb01Name_Id = "demo01@demo.com"},
                new Tb02DailyRecord_{Tb02DailyRecord_Id="demo01@demo.com20170701",Tb02DailyRecord_MMDDYYYY="07012017",Tb02DailyRecord_StartTimeStamp = "070120170901",Tb02DailyRecord_EndTimeStamp = "070120171901",Tb02DailyRecord_Memo = "データ04",Tb01Name_Id = "demo01@demo.com"}

            };
            listTb02.ForEach(x => context.Tb02DailyRecord.AddOrUpdate(x));

            context.SaveChanges();
        }
    }
}
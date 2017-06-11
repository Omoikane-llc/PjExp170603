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
              new Tb01Name_ { Tb01Name_Id = "test01Name", Tb01Name_MailAddress1 = "test01@test.com", Tb01Name_MailAddress2 = "test02@test.com", Tb01Name_MailAddress3 = "test03@test.com" }
            };
            listTb01.ForEach(x => context.Tb01Id.AddOrUpdate(x));
            context.SaveChanges();
        }
    }
}
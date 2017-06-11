using System.Data.Entity;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using WebApp170603.Models;
using WebApp170603.App_Start;

namespace WebApp170603
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start()
        {
            // Dbの再構成
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<AppDbConnection, AppDbConfig>());
            
            // MVCのエリアを登録する
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            //WebApiConfig.Register(GlobalConfiguration.Configuration);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
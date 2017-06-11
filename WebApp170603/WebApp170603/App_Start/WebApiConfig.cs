using System.Web.Http;

namespace WebApp170603
{
    public class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API ルート
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
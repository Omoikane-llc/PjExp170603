using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp170603.Models;

namespace WebApp170603.Controllers
{
    public class ValuesController : ApiController
    {
        private AppDbConnection appDb = new AppDbConnection();
        
        // GET: api/Values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Values/5 /api/Values?actid=1
        public IQueryable<string> Get(int actId)
        {
            var name = appDb.Tb01Id.Where(id => id.Tb01Name_Id == "test01Name").Select(id => id.Tb01Name_Id);

            return name;
        }

        // POST: api/Values
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Values/5
        public void Delete(int id)
        {
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApp170603.Models
{
    public class AppDbConnection:DbContext
    {
        public DbSet<Tb01Name_> Tb01Id { get; set; }
        public DbSet<Tb02DailyRecord_> Tb02DailyRecord { get; set; }
    }
}
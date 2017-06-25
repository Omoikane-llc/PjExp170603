using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp170603.Models {
    public class Tb02DailyRecord_ {
        public string Tb02DailyRecord_Id { get; set; }
        public string Tb02DailyRecord_YYYYMMDD { get; set; }
        public string Tb02DailyRecord_StartTimeStamp { get; set; }
        public string Tb02DailyRecord_EndTimeStamp { get; set; }
        public string Tb02DailyRecord_Memo { get; set; }
        public Byte[] Tb02DailyRecord_TimeStamp { get; set; }

        public string Tb01Name_Id { get; set; }
        public virtual Tb01Name_ Tb01Name_ { get; set; }
    }
}
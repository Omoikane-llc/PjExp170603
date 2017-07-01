using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp170603.Models {
    public class Tb01Name_ {
        public string Tb01Name_Id { get; set; }
        public string Tb01Name_Name { get; set; }
        public string Tb01Name_MailAddress1 { get; set; }
        public string Tb01Name_MailAddress2 { get; set; }
        public string Tb01Name_MailAddress3 { get; set; }

        //[Timestamp] 機能しない 原因不明 実装をペンディング
        public Byte[] Tb01Name_TimeStamp { get; set; }

        public virtual ICollection<Tb02DailyRecord_> Tb02DailyRecord_s { get; set; }

    }
}
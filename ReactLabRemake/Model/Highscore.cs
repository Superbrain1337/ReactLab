using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactLabRemake.Model
{
    public class Highscore
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public int Score { get; set; }
        public int UserId { get; set; }
        public UserClass User { get; set; }
    }
}

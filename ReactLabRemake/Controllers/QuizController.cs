using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactLabRemake.Model;
using System.Runtime.Serialization;
using Microsoft.EntityFrameworkCore;

namespace ReactLabRemake.Controllers
{
    [Produces("application/json")]
    [Route("api/quiz")]
    public class QuizController : Controller
    {
        public TheContext _context;
        private Random rnd = new Random();
        public static UserClass theUser = new UserClass();
        public static int elementsSkipped1 = 0;
        public static int elementsSkipped2 = 0;

        public QuizController(TheContext context)
        {
            _context = context;
        }

        [Route("GetUser")]
        [HttpGet]
        public IActionResult GetUser()
        {
            if (theUser != null)
            {
                return Ok(theUser);
            }
            return null;
        }

        [Route("GetQuestions")]
        [HttpGet]
        public IEnumerable<QuestionClass> GetQuestions()
        {
            return _context.Questions;
        }

        [Route("GetQuestion")]
        [HttpGet]
        public IActionResult GetQuestion(int id)
        {
            QuestionClass question = null;
            IEnumerable<QuestionClass> QList = _context.Questions;
            question = QList.ElementAt(id-1);
            /*while (question == null)
            {
                question = _context.Questions.SingleOrDefault(q => q.Id == (id + elementsSkipped1));
                if(question == null)
                {
                    elementsSkipped1++;
                }
            }*/

            //var question = new QuestionClass { Id = 1, Question = "Vad blir 1+1", CorrectAnswer = "2", WrongAnswer1 = "3", WrongAnswer2 = "4", WrongAnswer3 = "1", Score = 50 };
            return Ok(question);
        }

        [Route("GetNumberOfQuestions")]
        [HttpGet]
        public int getNumberOfQuestions()
        {
            return _context.Questions.Count();
        }

        [Route("GetTotalScore")]
        [HttpGet]
        public int getTotalScore()
        {
            int totalScore = 0;
            foreach(var Q in _context.Questions)
            {
                totalScore += Q.Score;
            }
            return totalScore;
        }

        [Route("GetAnswersShuffled")]
        [HttpGet]
        public IActionResult GetAnswersShuffled(int id)
        {
            //QuestionClass question = new QuestionClass { Id = 1, Question = "Vad blir 1+1", CorrectAnswer = "2", WrongAnswer1 = "3", WrongAnswer2 = "4", WrongAnswer3 = "1", Score = 50 };
            QuestionClass question = null;
            IEnumerable<QuestionClass> QList = _context.Questions;
            question = QList.ElementAt(id-1);
            /*while (question == null)
            {
                question = _context.Questions.SingleOrDefault(m => m.Id == (id + elementsSkipped2));
                if (question == null)
                {
                    elementsSkipped2++;
                }
            }*/
            
            List<string> answers = new List<string>();
            while (answers.Count < 4)
            {
                int answerToGet = rnd.Next(4);
                if (answerToGet == 0)
                {
                    if (!answers.Contains(question.CorrectAnswer))
                    {
                        answers.Add(question.CorrectAnswer);
                    }
                }
                else if (answerToGet == 1)
                {
                    if (!answers.Contains(question.WrongAnswer1))
                    {
                        answers.Add(question.WrongAnswer1);
                    }
                }
                else if (answerToGet == 2)
                {
                    if (!answers.Contains(question.WrongAnswer2))
                    {
                        answers.Add(question.WrongAnswer2);
                    }
                }
                else
                {
                    if (!answers.Contains(question.WrongAnswer3))
                    {
                        answers.Add(question.WrongAnswer3);
                    }
                }
            }
            AnswerList theAnswers = new AnswerList
            {
                Answer1 = answers.ElementAt(0),
                Answer2 = answers.ElementAt(1),
                Answer3 = answers.ElementAt(2),
                Answer4 = answers.ElementAt(3)
            };
            return Ok(theAnswers);

        }

        [Route("GetHighscore")]
        [HttpGet]
        public int GetHighscore(string name)
        {
            if (name != null)
            {
                var theUser = _context.Users.SingleOrDefault(u => u.Name == name);

                if (theUser != null)
                {
                    return theUser.Highscore;
                }
            }
            return 0;
        }

        [Route("GetAllHighscore")]
        [HttpGet]
        public IEnumerable<Highscore> GetAllHighscore(string username)
        {
            if (username == null)
            {
                username = "Admin";
            }

            var HigscoreList = _context.Highscores.Include(u => u.User);
            foreach (var H in HigscoreList)
            {
                if (H.User == null)
                {
                    UserClass U = _context.Users.SingleOrDefault(u => u.Id == H.UserId);
                    H.User = U;
                }
            }
            return HigscoreList;
        }

        [Route("SaveHighscore")]
        [HttpGet]
        public void SaveHighscore(int score, string username, int oldScore)
        {
            var theUser = _context.Users.SingleOrDefault(n => n.Name == username);
            var highscore = new Highscore { Score = score, Time = DateTime.Now, User = theUser };
            _context.Highscores.Add(highscore);
            if (score > oldScore)
            {
                _context.Users.Single(U => U.Name == username).Highscore = score;
            }
            _context.SaveChanges();
            elementsSkipped1 = 0;
            elementsSkipped2 = 0;
        }

        [Route("GetUserList")]
        [HttpGet]
        public IEnumerable<UserClass> GetUserList()
        {
            return _context.Users;
        }

        [Route("CreateUser")]
        [HttpGet]
        public void CreateUser(string username, string password)
        {
            var thisUser = new UserClass { Name = username, Password = password };
            _context.Users.Add(thisUser);
            _context.SaveChanges();
            theUser = thisUser;
        }

        [Route("LoginUser")]
        [HttpGet]
        public void LoginUser(string username, string password)
        {
            var thisUser = _context.Users.Where(n => n.Name == username).SingleOrDefault();
            if (thisUser != null)
            {
                if (thisUser.Password == password)
                {
                    theUser = thisUser;
                }
            }
        }

        [Route("AddQuestion")]
        [HttpGet]
        public void AddQuestion(string question, string wrongAnswer1, string wrongAnswer2, string wrongAnswer3, string rightAnswer, int score)
        {
            if(question!=null && wrongAnswer1 != null && wrongAnswer2 != null && wrongAnswer3 != null && rightAnswer != null)
            {
                var thisQuestion = new QuestionClass
                {
                    Question = question,
                    CorrectAnswer = rightAnswer,
                    WrongAnswer1 = wrongAnswer1,
                    WrongAnswer2 = wrongAnswer2,
                    WrongAnswer3 = wrongAnswer3,
                    Score = score
                };
                _context.Questions.Add(thisQuestion);
                _context.SaveChanges();
            }
            
        }


        // PUT: api/Quizz/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
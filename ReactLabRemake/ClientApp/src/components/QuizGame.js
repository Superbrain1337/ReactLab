import * as React from 'react';

/*let userName = document.getElementById('react-app').textContent;
console.log('userName: ' + userName);*/

export class QuizGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            loggedIn: false,
            totalScore: 0,
            totalNrOfQuestions: 0,
            startTrue: false,
            actualQuestion: "",
            actualQuestionScore: 0,
            actualQuestionCorrect: "",
            actualQuestionAnswer1: "",
            actualQuestionAnswer2: "",
            actualQuestionAnswer3: "",
            actualQuestionAnswer4: "",
            actualAnswer: "",
            setAnswer: false,
            answerMessage: "",
            countQuestion: 1,
            nextQuestion: false,
            cancelQuestion: false,
            resultMessage: "",
            hasFetchedData: false,
            maxTotalScore: 8,
            currentHighscore: 0,
            showAllHighscore: false,
            hideHighscoreButton: false,
            showAddQuestion: false,
            hideAddQuestionButton: false,
            highscoreList: [],
            userlist: []
        };

        this.startQuizzGame = this.startQuizzGame.bind(this);
        this.getCurrentHighscore = this.getCurrentHighscore.bind(this);
        this.answerClick = this.answerClick.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.cancelGame = this.cancelGame.bind(this);
        this.gameComplete = this.gameComplete.bind(this);
        this.saveHighscore = this.saveHighscore.bind(this);
        this.showHighscore = this.showHighscore.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.showAddQuestion = this.showAddQuestion.bind(this);
        this.LoggIn = this.LoggIn.bind(this);
        this.CreateUser = this.CreateUser.bind(this);
        this.getNumberOfQuestions = this.getNumberOfQuestions.bind(this);
        this.getTotalScore = this.getTotalScore.bind(this);
        this.hideHighscore = this.hideHighscore.bind(this);
    }


    startQuizzGame() {
        this.setState({
            countQuestion: 1,
            cancelQuestion: true,
            startTrue: true,
            setAnswer: true,
            resultMessage: "",
            totalNrOfQuestions: 2,
            totalScore: 0,
            hideHighscoreButton: true,
            hideAddQuestionButton: true
        });
        this.getNumberOfQuestions();
        this.getTotalScore();
        this.getCurrentHighscore();
        this.handleQuestion('1');
    }

    getNumberOfQuestions() {
        fetch("api/quiz/GetNumberOfQuestions")
            .then(result => result.json())
            .then(json => {
                console.log(json);
                this.setState({
                    totalNrOfQuestions: json
                });
            });
    }

    getTotalScore() {
        fetch("api/quiz/GetTotalScore")
            .then(result => result.json())
            .then(json => {
                console.log(json);
                this.setState({
                    maxTotalScore: json
                });
            });
    }

    getCurrentHighscore() {
        fetch("api/quiz/GetHighscore?name=" + this.state.username)
            .then(result => result.json())
            .then(json => {
                console.log(json);
                this.setState({
                    currentHighscore: json
                });
            });
    }

    getAllHighscore() {
        fetch("api/quiz/GetAllHighscore?username=" + this.state.username)
            .then(result => result.json())
            .then(json => {
                console.log(json);
                const theHighscoreList = json.map((highscore) =>
                    (<ul>
                        <li>{highscore.time}</li>
                        <li>{highscore.score}</li>
                        <li>{highscore.user.name}</li>
                    </ul>)
                );
                this.setState({
                    highscoreList: theHighscoreList
                });
            });
    }

    answerClick(answer) {
        console.log("answerClick " + answer);
        this.setState({
            hasFetchedData: false,
            setAnswer: false

        });

        let theScore = this.state.totalScore + this.state.actualQuestionScore;
        if (answer === 1) {
            if (this.state.actualQuestionAnswer1 === this.state.actualQuestionCorrect) {
                console.log("Answer before setState " + this.state.totalScore + " " + theScore);
                this.setState({
                    answerMessage: "It's Correct!",
                    totalScore: theScore
                });
                console.log("Answer after setState " + this.state.totalScore + " " + theScore);
            }
            else {
                this.setState({
                    answerMessage: "Is's Wrong!"
                });
            }
        }
        else if (answer === 2) {
            if (this.state.actualQuestionAnswer2 === this.state.actualQuestionCorrect) {
                console.log("Answer before setState " + this.state.totalScore + " " + theScore);
                this.setState({
                    answerMessage: "It's Correct!",
                    totalScore: theScore
                });
                console.log("Answer after setState " + this.state.totalScore + " " + theScore);
            }
            else {
                this.setState({
                    answerMessage: "Is's Wrong!"
                });
            }
        }
        else if (answer === 3) {
            if (this.state.actualQuestionAnswer3 === this.state.actualQuestionCorrect) {
                console.log("Answer before setState " + this.state.totalScore + " " + theScore);
                this.setState({
                    answerMessage: "It's Correct!",
                    totalScore: theScore
                });
                console.log("Answer after setState " + this.state.totalScore + " " + theScore);
            }
            else {
                this.setState({
                    answerMessage: "Is's Wrong!"
                });
            }
        }
        else if (answer === 4) {
            if (this.state.actualQuestionAnswer4 === this.state.actualQuestionCorrect) {
                console.log("Answer before setState " + this.state.totalScore + " " + theScore);
                this.setState({
                    answerMessage: "It's Correct!",
                    totalScore: theScore
                });
                console.log("Answer after setState " + this.state.totalScore + " " + theScore);
            }
            else {
                this.setState({
                    answerMessage: "Is's Wrong!"
                });
            }
        }
        if (this.state.answerMessage === "It's Correct!" && this.state.totalScore !== theScore) {
            this.setState({
                totalScore: theScore
            });
        }
        console.log("TestingAnswer. Score var = " + theScore + " totalscore = " + this.state.totalScore);

        this.setState({
            nextQuestion: true
        });
    }



    handleQuestion(questionNumber) {
        console.log("handleQuestion " + questionNumber);
        this.setState({
            answerMessage: "",
            setAnswer: true
        });

        this.fetchQuestion(questionNumber)
            .then(json => {
                this.setState({
                    actualQuestion: json.question,
                    actualQuestionScore: json.score,
                    actualQuestionCorrect: json.correctAnswer
                });
                console.log('Question: ' + json.question);
                console.log('CorrectAnswer: ' + json.correctAnswer);
            });

        this.fetchAnswersShuffled(questionNumber)
            .then(json => {
                this.setState({
                    hasFetchedData: true,
                    actualQuestionAnswer1: json.answer1,
                    actualQuestionAnswer2: json.answer2,
                    actualQuestionAnswer3: json.answer3,
                    actualQuestionAnswer4: json.answer4

                });
                console.log('Get Answers Shuffled json: ', json);
            });

        this.setState({

            nextQuestion: false

        });
    }

    async fetchQuestion(fetchId) {
        let data = await fetch("api/quiz/GetQuestion?id=" + fetchId)
            .then(result => {
                console.log("result url: " + result.url);
                console.log("result status: " + result.status);
                console.log("result statustext: " + result.statusText);
                //console.log("result json: " + result.json());
                return result.json();
            });
        return data;
    }

    async fetchAnswersShuffled(fetchId) {
        let data = await fetch('api/quiz/GetAnswersShuffled?id=' + fetchId)
            .then(result => result.json());
        return data;
    }

    nextQuestion() {
        console.log("nextQuestion");
        let questionCount = this.state.countQuestion + 1;
        this.setState({
            countQuestion: questionCount
        });

        if (this.state.countQuestion < this.state.totalNrOfQuestions) {
            this.handleQuestion(questionCount);
        }

        else {
            this.gameComplete();
        }
    }

    cancelGame() {
        console.log("cancelGame");
        this.setState({
            startTrue: false,
            countQuestion: 0,
            actualQuestion: "",
            totalScore: 0,
            answerMessage: "",
            setAnswer: false,
            nextQuestion: false,
            actualQuestionScore: 0,
            cancelQuestion: false
        });
    }

    gameComplete() {
        console.log("gameComplete " + this.state.totalScore);
        this.setState({
            startTrue: false,
            cancelQuestion: false,
            nextQuestion: false,
            hideHighscoreButton: false,
            hideAddQuestionButton: false,
            resultMessage: "Congratulations! You got: " + this.state.totalScore + " score!. Press Start Quizz Game to play again...",
            actualQuestion: "",
            answerMessage: ""

        });
        this.saveHighscore();
    }

    saveHighscore() {
        console.log("saveHighscore " + this.state.totalScore + " " + this.state.username);
        fetch("api/quiz/SaveHighscore?username=" + this.state.username + "&score=" + this.state.totalScore + "&oldScore=" + this.state.currentHighscore);
    }

    showHighscore() {
        this.setState({
            hideHighscoreButton: true,
            showAllHighscore: true
        });
        this.getAllHighscore();
    }

    hideHighscore() {
        this.setState({
            hideHighscoreButton: false,
            showAllHighscore: false
        });
    }

    showAddQuestion() {
        this.setState({
            hideAddQuestionButton: true,
            showAddQuestion: true
        });
    }

    addQuestion(question, wrongAnswer1, wrongAnswer2, wrongAnswer3, rightAnswer, score) {
        console.log("addQuestion: Q = " + question + " WA1 = " + wrongAnswer1 + " WA2 = " + wrongAnswer2 + " WA3 = " + wrongAnswer3 + " score = " + score);
        fetch("api/quiz/addQuestion?question=" + question + "&wrongAnswer1=" + wrongAnswer1 + "&wrongAnswer2=" + wrongAnswer2 + "&wrongAnswer3=" + wrongAnswer3 + "&rightAnswer=" + rightAnswer + "&score=" + score);
        this.setState({
            hideAddQuestionButton: false,
            showAddQuestion: false
        });
    }

    async fetchLogin(theUsername, thePassword) {
        let data = await fetch("api/quiz/LoginUser?username=" + theUsername + "&password=" + thePassword)
            .then(result => result.json())
            .then(json => {
                console.log(json);
            });
        if (data === true) {
            return true;
        }

        return false;
    }

    LoggIn(theUsername, thePassword) {
        console.log(theUsername);
        console.log(thePassword);
        fetch("api/quiz/LoginUser?username=" + theUsername + "&password=" + thePassword);
    }

    CreateUser(theUsername, thePassword) {
        console.log(theUsername);
        console.log(thePassword);
        fetch("api/quiz/CreateUser?username=" + theUsername + "&password=" + thePassword);
    }

    testIfLoggedIn() {
        fetch("api/quiz/GetUser")
            .then(result => result.json())
            .then(json => {
                console.log(json);
                if (json.name !== null) {
                    this.setState({
                        username: json.name,
                        loggedIn: true,
                        currentHighscore: json.highscore
                    });
                    
                }
            });
        if (this.state.maxTotalScore === 8) {
            this.getTotalScore();
        }
    }

    renderQuizGame() {
        return (
            <div>
                <div className='container-fluid' hidden={this.state.showAllHighscore}>
                    <header>
                        <h1>Play Quizz Game</h1>
                    </header>
                    <br />
                    <p>{this.state.username}, Current Highscore: {this.state.currentHighscore}</p>
                    <br />

                    <p>Click here to start Quizz Game:</p>
                    <button className="btn btn-primary btn-lg" disabled={this.state.startTrue} onClick={this.startQuizzGame}><i className="glyphicon glyphicon-play-circle"></i> Start Quizz Game</button>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <h1>{this.state.actualQuestion}</h1>
                        </div>
                    </div>
                    <div className='row' hidden={!this.state.setAnswer}>
                        <div className='col'>
                            <button className='btn btn-primary' disabled={!this.state.hasFetchedData} onClick={() => this.answerClick(1)}> {this.state.actualQuestionAnswer1}</button>
                            <button className='btn btn-success' disabled={!this.state.hasFetchedData} onClick={() => this.answerClick(3)}> {this.state.actualQuestionAnswer3}</button>
                        </div>
                        <div className='col'>
                            <button className='btn btn-secondary' disabled={!this.state.hasFetchedData} onClick={() => this.answerClick(2)}> {this.state.actualQuestionAnswer2}</button>
                            <button className='btn btn-danger' disabled={!this.state.hasFetchedData} onClick={() => this.answerClick(4)}> {this.state.actualQuestionAnswer4}</button>
                        </div>
                    </div>
                    <p>{this.state.answerMessage}</p>

                    <br />
                    <p>Total score: {this.state.totalScore} (Max: {this.state.maxTotalScore})</p>
                    <br />

                    <p>Click here for next question or cancel:</p>
                    <br />
                    <button className="btn btn-primary btn-lg" disabled={!this.state.nextQuestion} onClick={this.nextQuestion}>
                        <i className="glyphicon glyphicon-forward"></i> Next Question</button>
                    <button className="btn btn-warning btn-lg" disabled={!this.state.cancelQuestion} onClick={this.cancelGame}><i className="glyphicon glyphicon-remove"></i> Cancel</button>
                    <button className="btn btn-primary btn-lg" disabled={this.state.hideHighscoreButton} onClick={this.showHighscore}><i className="glyphicon glyphicon-th-list"></i> Highscore</button>
                    <button className="btn btn-primary btn-lg" disabled={this.state.hideAddQuestionButton} onClick={this.showAddQuestion}><i className="glyphicon glyphicon-plus"></i> Add Question</button>
                    <br />
                    <br />
                    <p>{this.state.resultMessage}</p>
                </div>
                <div hidden={!this.state.showAllHighscore}>
                    {this.state.highscoreList}
                    <button className="btn btn-primary btn-lg" onClick={this.hideHighscore}> <i className="glyphicon glyphicon-backward"></i> Return </button>
                </div>
            </div>
        );
    }

    renderAddQuestion() {
        return (
            <div>
                <form name="userform">
                    <label className="form-label">Question</label>
                    <input className="form-control" type="text" name="question" id="Qinput" required />
                    <label className="form-label">Wrong Answer 1</label>
                    <input className="form-control" type="text" name="wrongAnswer1" id="WAinput1" required />
                    <label className="form-label">Wrong Answer 2</label>
                    <input className="form-control" type="text" name="wrongAnswer2" id="WAinput2" required />
                    <label className="form-label">Wrong Answer 3</label>
                    <input className="form-control" type="text" name="wrongAnswer3" id="WAinput3"  required />
                    <label className="form-label">Right Answer</label>
                    <input className="form-control" type="text" name="rightAnswer" id="RAinput" required />
                    <label className="form-label">Score</label>
                    <input className="form-control" type="number" name="score" id="Sinput" required />
                    <button type='submit' className='btn btn-success' onClick={() => this.addQuestion(document.getElementById("Qinput").value, document.getElementById("WAinput1").value, document.getElementById("WAinput2").value, document.getElementById("WAinput3").value, document.getElementById("RAinput").value, document.getElementById("Sinput").value)}> <i className="glyphicon glyphicon-ok"></i> Add Question</button>
                </form>
            </div>
        );
    }

    renderLogin() {
        return (
            <div>
                <form name="userform">
                    <label className="form-label">Username</label>
                    <input className="form-control" type="text" name="username" id="input1" required />
                    <label className="form-label">Password</label>
                    <input className="form-control" type="password" name="password" id="input2" required />
                    <button type='submit' className='btn btn-success' onClick={() => this.LoggIn(document.getElementById("input1").value, document.getElementById("input2").value)}> Login</button>
                    <button type='submit' className='btn btn-primary' onClick={() => this.CreateUser(document.getElementById("input1").value, document.getElementById("input2").value)}>Create account</button>
                </form>
            </div>
        );
    }

    render() {
        console.log("QuizzGame Render");
        if (this.state.loggedIn === false) {
            this.testIfLoggedIn();
        }
        return (
            <div>
                <div hidden={!this.state.loggedIn}>
                    <div hidden={this.state.showAddQuestion}>
                        {this.renderQuizGame()}
                    </div>
                    <div hidden={!this.state.showAddQuestion}>
                        {this.renderAddQuestion()}
                    </div>
                </div>
                <div hidden={this.state.loggedIn}>
                    {this.renderLogin()}
                </div>
            </div>
        );
    }

}
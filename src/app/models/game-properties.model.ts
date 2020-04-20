export class GameProperties {

    points: number;
    finalPoints: number;
    timer: number;
    timerStartTime: number;

    startDisabled: boolean;
    goDisabled: boolean;
    gameOver: boolean;

    constructor(_points: number, _finalPoints, _timer: number){
        this.points = _points,
        this.finalPoints = _finalPoints;
        this.timerStartTime = _timer;
    }

    startTimer(){

        this.timer = this.timerStartTime;

        this.points = 0;

        let x = setInterval(() => {this.timer -= 1
        
            if(this.timer == 0){
                clearInterval(x);
                this.finalPoints = this.points;
                this.startDisabled = true;
                this.goDisabled = true;
                this.points = 0;
                this.gameOver = true;
            }
        
        }, 1000);

        this.timer = this.timerStartTime;

    }

    restartGame(){
        this.gameOver = false;
        this.startDisabled = false;
        this.goDisabled = false; 
        this.points = 0;
        this.timer = this.timerStartTime;
    }
}
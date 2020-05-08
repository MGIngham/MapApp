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

    restartGame(){
        this.startDisabled = false;
        this.goDisabled = false; 
        this.points = 0;
        this.timer = this.timerStartTime;
    }
}
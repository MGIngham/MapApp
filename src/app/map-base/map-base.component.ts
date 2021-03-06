import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { CountriesData } from '../models/countries-data.model';
import { GameProperties } from '../models/game-properties.model';

@Component({
    selector: 'app-map-base',
    templateUrl: './map-base.component.html',
    styleUrls: ['./map-base.component.css']
})

export class MapBaseComponent implements OnInit {
    
    //Object contraining countries data.
    cntryData: CountriesData;

    //Object defining game scoring and timing properties. 
    gameProperties: GameProperties;
    
    @Output() gameStart: EventEmitter<boolean> = new EventEmitter();
    @Output() gameEnd: EventEmitter<number> = new EventEmitter();
    @Input() restart: boolean;

    //DOM manipulation and country data variables.
    isActive = false;
    countryName: string;
    currentId: string;
    currentIndex: number;

    gameOver: boolean = false;
    x: number = 20;
    y: number = 20;

    answer: string;
    isCorrect: boolean;
    isCorrectText: string;
    activeRadio: number;
    answerOptionsArray = [""];
    opts: any[];
    correctAnswer: string;
    wrongAnswerOne: string;
    wrongAnswerTwo: string;
    //Timer variables
    //timer: number;

    getCountry(){

        this.isCorrect = false;
        this.isCorrectText = "";
        this.opts = [];
        this.answerOptionsArray = [];
        this.countryName = "";

        let countries = this.cntryData.cntryObj['countries'];
        let rndNumOne = Math.floor(Math.random() * (countries.length-1+1)) + 1;
        let rndNumTwo = Math.floor(Math.random() * (countries.length-1+1)) + 1;
        let rdmCntryId = Math.floor(Math.random() * (220-1+1)) + 1;

        this.currentIndex = rdmCntryId;

        this.answerOptionsArray.push(countries[rndNumOne].Name);
        this.answerOptionsArray.push(countries[rndNumTwo].Name);
        this.answerOptionsArray.push(countries[this.currentIndex].Name);
        this.shuffle(this.answerOptionsArray);

        this.x = countries[this.currentIndex].Xpos + 5;
        this.y = countries[this.currentIndex].Ypos + 5;

        this.opts = this.answerOptionsArray;

    }

    shuffle(arr: any[]){
        let ctr = arr.length, temp, index;

        // While there are elements in the array
            while (ctr > 0) {
        // Pick a random index
                index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
                ctr--;
        // And swap the last element with it
                temp = arr[ctr];
                arr[ctr] = arr[index];
                arr[index] = temp;
            }
            return arr;
    }

    startTimer(){

        this.gameProperties.timer = this.gameProperties.timerStartTime;

        this.gameProperties.points = 0;

        let x = setInterval(() => {this.gameProperties.timer -= 1
        
            if(this.gameProperties.timer == 0){
                clearInterval(x);
                this.gameEnded(this.gameProperties.points);
                this.gameStarted(true);
                this.gameProperties.finalPoints = this.gameProperties.points;
                this.gameProperties.startDisabled = true;
                this.gameProperties.goDisabled = true;
                //this.gameProperties.gameOver = true;
                this.answerOptionsArray = [""];
                this.countryName = "";
                this.isCorrectText = "";
                this.opts = [];
            }
        
        }, 1000);

        this.gameProperties.timer = this.gameProperties.timerStartTime;

    }

    checkAnswer(event: any){

        this.isCorrect = false;

        this.countryName = this.cntryData.cntryObj['countries'][this.currentIndex].Name;

        if(event.target.value == this.countryName){
            this.isCorrectText = "CORRECT!!";
            this.gameProperties.points ++;
            this.isCorrect = true;
            this.correctAnswer = this.countryName;
        } else {
            this.isCorrectText = "WRONG!";          
        }

    }

    gameStarted(s: boolean){
        this.gameStart.emit(s);
    }

    gameEnded(finalScore: number){
        this.gameEnd.emit(finalScore);
    }

    ngOnInit(){
        this.cntryData = new CountriesData();
        this.gameProperties = new GameProperties(0,0,10);
    }

    ngOnChanges(){
        if(this.restart){
            this.gameProperties.restartGame();
        }
    }

}
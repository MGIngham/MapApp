import { Component, OnInit } from '@angular/core';
import { CountriesData } from '../countries-data.model';

@Component({
    selector: 'app-map-base',
    templateUrl: './map-base.component.html',
    styleUrls: ['./map-base.component.css']
})

export class MapBaseComponent implements OnInit {
    
    //Object contraining countries data.
    cntryData: CountriesData = new CountriesData();
    //DOM manipulation and country data variables.
    isActive = false;
    countryName: string;
    currentId: string;
    currentIndex: number;
    startDisabled = false;
    goDisabled = false;
    gameOver: boolean = false;
    x: number;
    y: number;
    //Scoring variables.
    points: number = 0;
    finalPoints: number;
    //Answers and options variables
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
    timer: number = 180;

    startTimer(){

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

        this.timer = 180;

    }

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

    checkAnswer(event: any){

        this.isCorrect = false;

        this.countryName = this.cntryData.cntryObj['countries'][this.currentIndex].Name;

        if(event.target.value == this.countryName){
            this.isCorrectText = "CORRECT!!";
            this.points ++;
            this.isCorrect = true;
            this.correctAnswer = this.countryName;
        } else {
            this.isCorrectText = "WRONG!";          
        }

    }

    restartGame(){
        this.gameOver = false;
        this.startDisabled = false;
        this.goDisabled = false; 
        this.points = 0;
        this.timer = 180;
    }

    constructor(){

    }

    ngOnInit(){
        
    }

}
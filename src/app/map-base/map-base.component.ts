import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Countries } from '../app.countries.model';
import { CountriesData } from '../countries-data.model';
//import { NameMe } from './name-me.model';

@Component({
    selector: 'app-map-base',
    templateUrl: './map-base.component.html',
    styleUrls: ['./map-base.component.css']
})

export class MapBaseComponent implements OnInit {

    isActive = false;
    countryName: string;
    currentId: string;
    currentIndex: number;
    answer: string;
    isCorrect: boolean;
    isCorrectText: string;
    points: number = 0;
    finalPoints: number;
    timer: number = 180;
    //finalAnswer: string;
    activeRadio: number;
    d: any;
    cntryData: CountriesData = new CountriesData();
    cd: CountriesData[] = [];
    

    
 
    ac: any[] = new Countries().allCountries;
    answerOptionsArray = [""];
    opts: any[];

    correctAnswer: string;
    wrongAnswerOne: string;
    wrongAnswerTwo: string;
    

    startDisabled = false;
    goDisabled = false;
    gameOver: boolean = false;

    //nameMe: NameMe = new NameMe(0,180)

    selectCountry(event: any){

        let startString: string;
        let subString: string;
        let allCountries;

        let cntryIndex;
        
        if(this.currentId){
            document.getElementById(this.currentId).classList.remove('active');
        }
        event.target.classList.add('active');
        this.countryName = event.target.getAttribute('data-name');
        this.currentId = event.target.getAttribute('id');

       // cntryIndex = this.cntryData.cntryObj["countries"].indexOf('Germany')

        //alert(this.cntryData.cntryObj["countries"][0].Xpos);

        allCountries = document.getElementsByClassName("country");

       for(let i = 0; i < allCountries.length; i ++){

            let cData = new CountriesData();
            let countryId;
            let startingXpos;
            let startingYpos;
            let countryName;

            startString = allCountries[i].getAttribute('d');
            countryId = allCountries[i].getAttribute('id');
            countryName = allCountries[i].getAttribute('data-name');
            subString = startString.substring(2,15);
            startingXpos = subString.substring(0,subString.indexOf(','));
            startingYpos = subString.substring(subString.indexOf(',') + 1,subString.indexOf(' '));
            
            cData.countryName = "{'Name': " + "'" + countryName + "',";
            cData.countryId = "'Id': " + "'" + countryId + "',";
            cData.dataId = "'DataId': " + i + ",";
            cData.xStartPos = "'Xpos': " + startingXpos + ",";
            cData.yStartPos = "'Ypos': " + startingYpos + ",";
            cData.pathData = "'PData': " + '"' + startString + '"},';

            this.cd.push(cData);
        }

    }


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
        let c = document.getElementsByClassName("country");
        let d = document.getElementById(this.currentId);
        let arrLength = this.ac.length;
        let rndNumOne = Math.floor(Math.random() * (arrLength-1+1)) + 1;
        let rndNumTwo = Math.floor(Math.random() * (arrLength-1+1)) + 1;
        let rdmCntryId = Math.floor(Math.random() * (220-1+1)) + 1;

        if(this.currentId){
            d.classList.remove('active');
        }

        if(this.currentIndex){
            c[this.currentIndex].classList.remove('active');
        }

        c[rdmCntryId].classList.add('active');

        this.currentIndex = rdmCntryId;
        this.currentId = c[rdmCntryId].id;

        this.answerOptionsArray.push(this.ac[rndNumOne]);
        this.answerOptionsArray.push(this.ac[rndNumTwo]);
        this.answerOptionsArray.push(document.getElementById(this.currentId).getAttribute('data-name'));
        this.shuffle(this.answerOptionsArray);

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

        this.countryName = document.getElementById(this.currentId).getAttribute('data-name');

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
        //document.getElementById("end-game-container").style.display = "none";  
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
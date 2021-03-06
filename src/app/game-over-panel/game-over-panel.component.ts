import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-over-panel',
  templateUrl: './game-over-panel.component.html',
  styleUrls: ['./game-over-panel.component.css']
})
export class GameOverPanelComponent implements OnInit {

  @Input() fScore: number;
  @Output() restartGame: EventEmitter<void> = new EventEmitter();

  constructor() { }

  rGame(){
    this.restartGame.emit();
  }

  ngOnInit(): void {
  }

}

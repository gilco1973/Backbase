import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-backbase-radio',
  templateUrl: './backbase-radio.component.html',
  styleUrls: ['./backbase-radio.component.scss']
})
export class BackbaseRadioComponent implements OnInit {
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}

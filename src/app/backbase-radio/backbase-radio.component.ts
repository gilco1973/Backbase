import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-backbase-radio',
  templateUrl: './backbase-radio.component.html',
  styleUrls: ['./backbase-radio.component.scss']
})
export class BackbaseRadioComponent implements OnInit {
  @Input() text: string;
  @Output() sort = new EventEmitter<any>()
  private sortOrder: string;
  constructor() { }

  ngOnInit(): void {
  }

  sendSorting($event) {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    this.sort.emit({sortBy: this.text, sortOrder: this.sortOrder});
  }
}

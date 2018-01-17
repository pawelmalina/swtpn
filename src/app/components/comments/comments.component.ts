import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from '../../model/project';
import {Constants} from '../../model/constants';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input()
  messages: Message[];

  @Output() addCommentEmitter: EventEmitter<string> = new EventEmitter<string>();

  newCommentText: string = '';

  dateFormat: string = Constants.MESSAGE_DATE_FORMAT;

  constructor() {
  }

  addComment() {
    if (this.newCommentText !== '') {
      this.addCommentEmitter.emit(this.newCommentText);
      this.newCommentText = '';
    }
  }

  ngOnInit() {
  }

}

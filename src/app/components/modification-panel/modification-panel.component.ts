import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {UpdateObject} from '../../model/project';

@Component({
  selector: 'app-modification-panel',
  templateUrl: './modification-panel.component.html',
  styleUrls: ['./modification-panel.component.css']
})
export class ModificationPanelComponent implements OnInit {


  protected displayDialog: boolean;

  @Output() accept: EventEmitter<UpdateObject> = new EventEmitter<UpdateObject>();

  @Input()
  titleText: string;

  @Input()
  titleValue: string = '';

  @Input()
  descriptionText: string;

  @Input()
  descriptionValue: string = '';

  @Input()
  objectId: number = null;

  @Input()
  acceptButtonText: string;

  @Input()
  fileId: number;



  constructor() {
  }

  acceptAction() {
    this.close();
    const object: UpdateObject = new UpdateObject(this.objectId, this.titleValue, this.descriptionValue)
    this.accept.emit(object);
  }

  public show() {
    this.displayDialog = true;
  }

  public close() {
    this.displayDialog = false;
  }

  abort() {
    this.displayDialog = false;
  }

  ngOnInit() {
  }

}

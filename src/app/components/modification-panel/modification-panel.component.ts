import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {UpdateObject} from '../../model/project';
import {MessageService} from "primeng/components/common/messageservice";

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



  constructor(private messageService: MessageService) {
  }

  acceptAction() {
    if(this.titleValue === ''){
      this.messageService.add({
        severity: 'warn',
        summary: 'Powiadomienie',
        detail: this.titleText + ' nie może być puste.'
      });

      return;
    }
    if(this.descriptionValue === ''){
      this.messageService.add({
        severity: 'warn',
        summary: 'Powiadomienie',
        detail: this.descriptionText + ' nie może być puste.'
      })
      return;
    }

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

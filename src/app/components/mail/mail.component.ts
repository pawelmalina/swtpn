import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from 'primeng/components/common/messageservice';
import {Message} from 'primeng/primeng';
import {isUndefined} from 'util';
import {MailService} from '../../services/mail/mail.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  displayDialog: boolean = false;

  msgs: Message[] = [];

  @Input()
  mail: string;
  subject: string = '';
  content: string = '';

  constructor(private mailService: MailService,
              private messageService: MessageService) {
  }

  ngOnInit() {
  }

  openMD() {
    this.displayDialog = true;
  }

  closeMD() {
    this.displayDialog = false;
  }

  sendMail() {
    if (this.subject === '') {
      this.messageService.add({severity: 'warning', summary: 'Informacja', detail: 'Wiadomosć musi zawierać temat.'});
    } else if (this.content === '') {
      this.messageService.add({
        severity: 'warning',
        summary: 'Informacja',
        detail: 'Wiadomosć musi posiadać zawartość.'
      });
    } else {
      this.closeMD();
      this.mailService.send(this.mail, this.subject, this.content).then((res) => {
        if (res === "OK") {
          this.messageService.add({severity: 'success', summary: 'Mail', detail: 'Wiadomość została wysłana.'});
        } else {
          this.messageService.add({severity: 'error', summary: 'Mail', detail: 'Problem z wysłaniem wiadomości.'});
        }
      });
      this.clearMailFields();
    }
  }

  clearMailFields() {
    this.subject = '';
    this.content = '';
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {



  constructor() { }

  ngOnInit() {
  }











data =  {
  "clientProfileType": "GROUP",
  "clientRepresentativesDTO": [
    {
      "mandate": true,
      "client": {
        "idn": "983",
        "name": "Wendy ",
        "surname": "Wu",
        "birthDate": null
      },
      "representatives": [
        {
          "idn": "989",
          "name": "Kimberly",
          "surname": "Kardash",
          "birthDate": null
        },
        {
          "idn": "990",
          "name": "Patricia",
          "surname": "Calinelo",
          "birthDate": null
        }
        ]
    },
    {
      "mandate": true,
      "client": {
        "idn": "984",
        "name": "Jasmin",
        "surname": "Sera",
        "birthDate": null
      },
      "representatives": [
        {
          "idn": "995",
          "name": "Penelope",
          "surname": "Ruz",
          "birthDate": null
        }
        ]
    },
    {
      "mandate": false,
      "client": {
        "idn": "985",
        "name": "Justin",
        "surname": "Briber",
        "birthDate": null
      },
      "representatives": [
        {
          "idn": "992",
          "name": "Richard",
          "surname": "Levy",
          "birthDate": null
        },
        {
          "idn": "997",
          "name": "Celine ",
          "surname": "Dinetto",
          "birthDate": null
        },
        {
          "idn": "991",
          "name": "Michele",
          "surname": "Krutz",
          "birthDate": null
        },
        {
          "idn": "993",
          "name": "Herman",
          "surname": "Rich",
          "birthDate": null
        }
        ]
    }
    ]
};



}

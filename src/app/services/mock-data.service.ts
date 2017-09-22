import { Injectable } from '@angular/core';
import {mockData} from '../data/mock-data';
import {Data} from '../model/data';
import {someAncestor} from 'tslint';

@Injectable()
export class MockDataService {

  data: any;
  some: Data[];
  constructor() {
    this.data = JSON.parse(mockData);
    this.some = this.data.map(r => <Data[]>r as Data[]);

    // debugger;
    console.log(this.some[0].email);
  }





}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() label!: string;
  @Input() selectedValue!: any;
  @Output() openModal: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  async triggerSelectModal() {
    await Haptics.impact({ style: ImpactStyle.Light });
    this.openModal.emit();
  }
}

import { CategoriesService } from './../../services/categories.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private categoriesService: CategoriesService
  ) {}

  async ngOnInit() {
    this.categories = (await this.categoriesService.getCategories()).data;
  }

  closeModal() {
    this.modalCtrl.dismiss(1);
  }
}

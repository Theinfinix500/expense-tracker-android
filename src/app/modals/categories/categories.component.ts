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
  isSubcategory: boolean = false;
  pageTitle = 'Category';
  primaryTitle = 'most frequent';
  secondaryTitle = 'all categories';
  parent;

  constructor(
    private modalCtrl: ModalController,
    private categoriesService: CategoriesService
  ) {}

  async ngOnInit() {
    if (!this.isSubcategory) {
      const { data: categories } = await this.categoriesService.getCategories();
      if (categories) {
        this.categories = categories;
      }
    }
  }

  closeModal() {
    this.modalCtrl.dismiss(1);
  }

  async showSubCategories(category) {
    if (this.isSubcategory) {
      this.modalCtrl.dismiss(category);
      return;
    }

    const modal = await this.modalCtrl.create({
      component: CategoriesComponent,
      componentProps: {
        isSubcategory: true,
        categories: category.subCategories || [],
        parent: category,
        pageTitle: category.name,
        primaryTitle: 'general',
        secondaryTitle: 'subcategories',
      },
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      console.log(data);
      this.modalCtrl.dismiss(data, '', 'categoryModal');
    }
  }
}

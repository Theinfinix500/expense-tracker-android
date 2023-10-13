import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-attachements',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './attachements.component.html',
  styleUrls: ['./attachements.component.scss'],
})
export class AttachementsComponent implements OnInit {
  imageElement;

  constructor() {}

  ngOnInit() {}

  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      // allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    let imageUrl = image.webPath;

    // Can be set to the src of an image now
    this.imageElement = imageUrl;
  }
}

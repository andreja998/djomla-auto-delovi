import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PocetnaComponent implements OnInit {

  searchGroup: FormGroup;
  marks: string[];
  niz: string[];

  constructor(private carService: CarService, private ref: ChangeDetectorRef) {
   
   }

  ngOnInit() {
    this.carService.getMarks().subscribe(marks => {
      console.log(marks);
      this.marks = marks;
    });
  }

  onMarkChange(value: any) {
    this.carService.getModels('a').subscribe(models => {
      console.log('Radim u pocetnoj :D');
      // this.models.push({ model: 'Astra'});
      // this.models.push({ model: 'Corsa'});
      this.marks.push('Asd');
      this.niz = models;
      console.log(this.niz);
    });
  }

}

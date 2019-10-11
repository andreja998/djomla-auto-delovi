import { Component, OnInit } from "@angular/core";
import { CarService } from "src/app/services/car.service";
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  private marks: string[] = [];
  private models: string[] = [];
  private categories: string[] = [];
  private selectedModel: string;
  private selectedMark: string;

  searchForm: FormGroup;

  constructor(private carService: CarService, private formBuilder: FormBuilder) {
    
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      marka: [''],
      model: new FormControl(''),
      name: ['']
    });
    
    this.carService.getMarks().subscribe(marks => {
      this.marks = marks;
    });
  }

  private onMarkChange(value: any) {
    this.selectedMark = value;
    console.log("RAZLICITOO");
    this.carService.getModels('asd').subscribe(models => {
      this.models.push(models[0]);
      console.log(this.models);
    });
  }

  private onModelChange(value: any) {
    this.selectedModel = value;
    if (value !== "Izaberite model") {
      this.carService
        .getCategories(this.selectedMark, this.selectedModel)
        .subscribe(categories => {
          this.categories = categories;
        });
    }
  }

  //disable categories on search
  private onSearch() {}
}

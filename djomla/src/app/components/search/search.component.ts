import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CarService } from "src/app/services/car.service";
import { Observable, of } from "rxjs";
import Stepper from "bs-stepper";
import { SearchItem, getViewport } from "src/app/models/utils";
import { Router, ActivatedRoute } from "@angular/router";
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})

// Home to parts and keep the search data
// parts to part and keep the search data
// part back to parts and keep the search data
export class SearchComponent implements OnInit {
  @Input() searchMode: string;
  @Input() searchName: string;

  @Output() search: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() categoryChange: EventEmitter<string> = new EventEmitter<string>();

  marks: SearchItem[];
  models: SearchItem[];
  categories: SearchItem[];
  subCategories: SearchItem[];

  selectedMark: string = null;
  selectedModel: string = null;
  selectedCategory: string = null;
  selectedSubCategory: string = null;

  searchDisabled = true;

  stepper: Stepper;

  constructor(private carService: CarService, private searchService: SearchService, private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.carService.getMarks().subscribe(marks => {
      console.log(marks);
      this.marks = marks;
      this.detailedInit();
    });
  }

  detailedInit() {
    if (this.searchMode === 'detailed') {

      this.selectedMark = this.searchService.selectedMark;

      this.carService.getModels(this.selectedMark).subscribe(models => {
        this.models = models;
        this.selectedModel = this.searchService.selectedModel;
        this.carService.getCategories().subscribe(categories => {
          this.categories = categories;
          this.selectedCategory = this.searchService.selectedCategory;
        });
      });

      this.stepper = new Stepper(document.querySelector('#search-stepper'), {
        linear: false,
        animation: true
      });
    }
  }

  onMarkChange(value: any) {
    console.log(this.selectedMark);
    this.carService.getModels(this.selectedMark).subscribe(models => {
      console.log("Radim u pocetnoj :D");
      this.models = models;
      this.selectedModel = null;
      this.handleSearchButton();
    });
  }

  onModelChange(value: any) {
    this.carService
      .getCategories(this.selectedModel, this.selectedMark)
      .subscribe(categories => {
        this.categories = categories;
        this.handleSearchButton();
      });
  }

  onCategoryClick(value: any) {
    this.carService.getSubCategories(value).subscribe(subCategories => {
      this.subCategories = subCategories;
    });
    this.selectedCategory = value;
    this.stepper.next();
  }

  onSearch() {
    this.searchService.selectedCategory = this.selectedCategory;
    this.searchService.selectedMark = this.selectedMark;
    this.searchService.selectedModel = this.selectedModel;
    this.search.emit({});
  }

  handleSearchButton() {
    if (this.selectedMark === null) {
      this.searchDisabled = true;
    } else {
      this.searchDisabled = null;
    }
  }
}

import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Part } from "src/app/models/utils";
import { SearchComponent } from "../search/search.component";
import { CarService } from "src/app/services/car.service";

@Component({
  selector: "app-delovi",
  templateUrl: "./delovi.component.html",
  styleUrls: ["./delovi.component.css"]
})
export class DeloviComponent implements OnInit, AfterViewInit {
  searchName = "Detaljna pretraga";
  searchMode = "detailed";
  parts: Array<any>;
  pageOfItems: Array<any>;

  @ViewChild("searchComp", { static: false }) searchComponent: SearchComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.carService
      .getPartsByModel(
        this.searchComponent.selectedModel,
        this.searchComponent.selectedMark
      )
      .subscribe((parts: Part[]) => {
        this.parts = parts;
        console.log(parts);
      });
  }

  onSearch(event: any) {
    this.carService.getPartsByModel(
      this.searchComponent.selectedModel,
      this.searchComponent.selectedMark,
      this.searchComponent.selectedCategory,
      this.searchComponent.selectedSubCategory).subscribe((parts: Part[]) => {
        this.parts = parts;
      });
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}

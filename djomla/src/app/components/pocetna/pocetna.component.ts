import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { CarService } from "src/app/services/car.service";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl
} from "@angular/forms";
import { SearchItem } from "src/app/models/utils";
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-pocetna",
  templateUrl: "./pocetna.component.html",
  styleUrls: ["./pocetna.component.css"],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PocetnaComponent implements OnInit {

  searchName = 'Brza pretraga';
  searchMode = 'simple';

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit() {
  }

  onSearch(event: any) {
    this.router.navigate(['delovi']);
  }

}

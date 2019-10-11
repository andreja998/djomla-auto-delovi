import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CarService {
  constructor(private http: HttpClient) {}

  getMarks(): Observable<string[]> {
    return this.http.get("https://reqres.in/api/users?page=2", {}).pipe(
      map((res: Response) => {
        console.log(res["data"].length);
        const marks: string[] = [];
        marks.push("Opel");
        marks.push("BMW");
        marks.push("Honda");

        return marks;
      })
    );
  }

  getModels(mark: string): Observable<string[]> {
    return this.http.get("https://reqres.in/api/users?page=1", {}).pipe(
      map((res: Response) => {
        const models: string[] = [];
        models.push('Astra');
        models.push('Corsa');

        return models;
      })
    );
  }

  getParts(model: string, mark: string): Observable<Object[]> {
    let parts = new Array(0);

    return of(parts);
  }

  getPart(partId: number): Observable<Object> {
    let part = {};

    return of(part);
  }

  getCategories(model?: string, mark?: string): Observable<string[]> {
     return this.http.get("https://reqres.in/api/users?page=2", {}).pipe(
      map((res: Response) => {
        const categories = new Array(0);
        categories.push('Svecica');
        categories.push('Nisdad');

        return categories;
      })
    );
  }

  createPart(part: Object): Observable<any> {
    return of(undefined);
  }

  removePart(partId: number): Observable<any> {
    return of(undefined);
  }

  updatePart(part: Object): Observable<any> {
    return of(part);
  }

  createModel(modelId: number): Observable<any> {
    return of(undefined);
  }

  removeModel(modelId: number, markId: number): Observable<any> {
    return of(undefined);
  }

  createMark(name: string): Observable<any> {
    return of(undefined);
  }
}

import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { IListItem } from "./IListItem.interface";

@Component({
  selector: "app-search-select",
  templateUrl: "./search-select.component.html",
  styleUrls: ["./search-select.component.css"],
})
export class SearchSelectComponent implements OnChanges {
  arrFiltered: any = [];
  @Input() multiple: boolean = false;
  @Input() arrToFilter: IListItem[] = [];
  @Input() value: string = "";
  @Input() placeholder: string = "Selecione";
  @Input() ngValue: any = "";
  @Output() ngValueChange = new EventEmitter<any>();
  @Input() disabled: boolean = false;

  ngOnChanges(): void {
    this.arrFiltered = this.arrToFilter;
  }

  filterMyOptions(filter: any) {
    if (filter == "") {
      this.arrFiltered = this.arrToFilter;
      return;
    }

    this.arrFiltered = this.arrToFilter.filter((element: any) => {
      return element.label
        ? element.label.toLowerCase().includes(filter.toLowerCase())
        : String(element).toLowerCase().includes(String(filter).toLowerCase());
    });
  }
}

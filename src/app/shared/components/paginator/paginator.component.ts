import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.css"],
})
export class PaginatorComponent {
  @Input() itemsPerPage: number = 0;
  @Input() totalItems: number = 0;
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
}

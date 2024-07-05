import { Component, Input } from "@angular/core";

@Component({
  selector: "app-label-clue",
  templateUrl: "./label-clue.component.html",
  styleUrls: ["./label-clue.component.scss"],
})
export class LabelClue {
  @Input() isHover: boolean = false;
  @Input() position: "left" | "right" = "right";
}

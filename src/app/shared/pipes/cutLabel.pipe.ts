import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cutLabel",
})
export class CutLabelPipe implements PipeTransform {
  transform(value: string, size: number) {
    if (value?.length > size) {
      return value?.substring(0, size) + "...";
    }
    return value;
  }
}

import { bindable } from "aurelia-framework";
import ReactElement from "aurelia-react-element";
import {ColorPicker} from "office-ui-fabric-react";


export class AuColorPicker extends ReactElement {

    @bindable props = {};
  component: any = ColorPicker;
  
  @bindable color: string = "#ffffff";

  bind() {
    this.syncProps();
  }

  syncProps() {
    this.props = { color: this.color, onColorChanged: color => { this.colorChanged(color); } };
  }

  colorChanged(color) {
      this.color = color;
    this.syncProps();
  }
}
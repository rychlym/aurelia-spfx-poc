declare var fabric: any;
export class myapp {
  
  public color = "#abcdef";

  protected togglePanel() {
    this.panelOpen = !this.panelOpen;
  }
  public panelOpen = false;

  protected resetPropertyPaneValue() {
    this.propertyPanelValue = '';
  }
  public propertyPanelValue = '';
}
  
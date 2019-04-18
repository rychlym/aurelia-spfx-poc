import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import { Aurelia } from 'aurelia-framework';
  import { PLATFORM } from "aurelia-pal";
  import * as Bluebird from 'bluebird';




import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  constructor() {
    super();
    Bluebird.config({ warnings: { wForgottenReturn: false } });
  }

  public render() {
    this.domElement.innerHTML = `<div id="${this.instanceId}" class="${this.instanceId}">Loading...</div>`;

    require(['aurelia-bootstrapper'], au => {
      au.bootstrap(aurelia => {
          aurelia.use
            .standardConfiguration()
            .developmentLogging();

          var el = document.getElementById(this.instanceId);
          aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('webparts/helloWorld/myapp'), el));
        }
      );
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

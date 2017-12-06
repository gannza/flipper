/* SystemJS module definition */
declare var nodeModule: NodeModule;
declare var JQuery: any;
interface NodeModule {
  id: string;
}

declare var window: Window;
interface Window {
  process: any;
  require: any;
}

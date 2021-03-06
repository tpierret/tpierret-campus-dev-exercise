/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppHistory {
        "pageSize": number;
    }
    interface AppResults {
        "loading": boolean;
        "page": number;
        "pageSize": number;
        "results": any;
    }
    interface AppRoot {
    }
    interface AppSearch {
        "apiKey": string;
        "apiUrl": string;
        "pageSize": number;
    }
}
declare global {
    interface HTMLAppHistoryElement extends Components.AppHistory, HTMLStencilElement {
    }
    var HTMLAppHistoryElement: {
        prototype: HTMLAppHistoryElement;
        new (): HTMLAppHistoryElement;
    };
    interface HTMLAppResultsElement extends Components.AppResults, HTMLStencilElement {
    }
    var HTMLAppResultsElement: {
        prototype: HTMLAppResultsElement;
        new (): HTMLAppResultsElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLAppSearchElement extends Components.AppSearch, HTMLStencilElement {
    }
    var HTMLAppSearchElement: {
        prototype: HTMLAppSearchElement;
        new (): HTMLAppSearchElement;
    };
    interface HTMLElementTagNameMap {
        "app-history": HTMLAppHistoryElement;
        "app-results": HTMLAppResultsElement;
        "app-root": HTMLAppRootElement;
        "app-search": HTMLAppSearchElement;
    }
}
declare namespace LocalJSX {
    interface AppHistory {
        "pageSize"?: number;
    }
    interface AppResults {
        "loading"?: boolean;
        "page"?: number;
        "pageSize"?: number;
        "results"?: any;
    }
    interface AppRoot {
    }
    interface AppSearch {
        "apiKey"?: string;
        "apiUrl"?: string;
        "pageSize"?: number;
    }
    interface IntrinsicElements {
        "app-history": AppHistory;
        "app-results": AppResults;
        "app-root": AppRoot;
        "app-search": AppSearch;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-history": LocalJSX.AppHistory & JSXBase.HTMLAttributes<HTMLAppHistoryElement>;
            "app-results": LocalJSX.AppResults & JSXBase.HTMLAttributes<HTMLAppResultsElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "app-search": LocalJSX.AppSearch & JSXBase.HTMLAttributes<HTMLAppSearchElement>;
        }
    }
}

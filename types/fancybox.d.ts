declare module '@fancyapps/ui/dist/fancybox/fancybox.esm.js' {
  export class Fancybox {
    static bind(container: any, selector: string, options?: any): void
    static unbind(container: any): void
    static close(): void
    static destroy(): void
  }
}

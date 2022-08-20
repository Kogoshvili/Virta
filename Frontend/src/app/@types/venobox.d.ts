declare module 'venobox' {
    export default new function constructor(options?: VenoBoxOptions){};
}

interface VenoBoxOptions {
    selector: string, //'.venobox',
    autoplay : boolean,
    bgcolor: string, //'#fff',
    border: string, //'0',
    customClass: boolean,
    infinigall: boolean,
    maxWidth: string, // '100%',
    navigation: boolean,
    navKeyboard: boolean,
    navTouch: boolean,
    navSpeed: number, //300,
    numeration: boolean,
    overlayClose: boolean,
    overlayColor: string, // 'rgba(23,23,23,0.95)',
    popup: boolean,
    ratio: '1x1' | '4x3' | '16x9' | '21x9'
    share: boolean,
    shareStyle: 'pill' | 'bar' | 'block' | 'transparent'
    spinner: 'bounce' | 'plane' | 'chase' | 'wave' | 'pulse' | 'flow' | 'swing' | 'circle' | 'circle-fade' | 'grid' | 'fold' | 'wander'
    spinColor : string, //'#d2d2d2',
    titleattr: string, //'title',
    titlePosition: 'top' | 'bottom',
    titleStyle: 'bar' | 'block' | 'pill' | 'transparent',
    toolsBackground: string, //'#1C1C1C', // 'transparent'
    toolsColor: string, // '#d2d2d2',
    onPreOpen: () => boolean, // Return the selected object - set return false to prevent opening
    onPostOpen: () => void, // Return: current_item, gallIndex, thenext, theprev
    onPreClose: () => boolean, // Return: current_item, gallIndex, thenext, theprev - set return false to prevent closing
    onNavComplete: () => void, // Return: current_item, gallIndex, thenext, theprev
    onContentLoaded: () => void, // Return: newcontent
    onInit: () => void, // Return: plugin obj
    jQuerySelectors: false
}


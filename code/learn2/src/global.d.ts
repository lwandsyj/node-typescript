export type str = string | null | undefined;

export type middleWare =(...args)=>Promise<any>;

export as namespace global;
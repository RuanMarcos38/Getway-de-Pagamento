import type { ReactNode } from 'react';
export function Modal({title,close,children}:{title:string;close:()=>void;children:ReactNode}){return <div className="overlay" onMouseDown={close}><div className="modal" onMouseDown={e=>e.stopPropagation()}><div className="modalHead"><h2>{title}</h2><button onClick={close}>×</button></div>{children}</div></div>}

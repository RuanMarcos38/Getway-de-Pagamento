const API=import.meta.env.VITE_API_URL||'http://localhost:3333';
export const token=()=>localStorage.getItem('getway_token');
export async function api<T>(path:string,init:RequestInit={}):Promise<T>{const r=await fetch(`${API}${path}`,{...init,headers:{'Content-Type':'application/json',...(token()?{Authorization:`Bearer ${token()}`}:{}) ,...init.headers}});const body=await r.json().catch(()=>({}));if(!r.ok)throw new Error(body.error||'Erro na requisição');return body as T}

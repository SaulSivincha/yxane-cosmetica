import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, CreditCard, MapPin, Store, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { Product } from "../../data/products";
import { Button } from "../ui/Button";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  cart: Product[];
};

type CheckoutStep = 1 | 2 | 3;

export function CartDrawer({ isOpen, onClose, cart }: CartDrawerProps) {
  const [step, setStep] = useState<CheckoutStep>(1);

  const subtotal = cart.reduce((acc, item) => {
    const priceStr = item.price.replace("S/ ", "").trim();
    return acc + parseFloat(priceStr);
  }, 0);
  
  const shipping = 10.0;
  const total = subtotal + shipping;

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-[480px] bg-[#faf9f8] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between px-6 py-6 pb-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-yxane-ink">Mi Pedido</h2>
            <p className="mt-1 text-sm text-stone-500">Paso {step} de 3</p>
          </div>
          <button
            className="focus-ring rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-200/50 hover:text-stone-700"
            onClick={handleClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-stone-200/60">
          <div className="flex items-center gap-2 mb-2">
            {/* Step 1 */}
            <button 
              className={`flex-1 flex flex-col items-start gap-2 focus-ring rounded-sm ${step >= 1 ? "cursor-pointer hover:opacity-80" : "cursor-default"}`} 
              onClick={() => step > 1 && setStep(1)}
              disabled={step === 1}
              aria-label="Ir a Carrito"
            >
              <div className={`w-full rounded-full transition-all duration-300 ${step === 1 ? "h-[3.5px] bg-yxane-ink" : step > 1 ? "h-[2px] bg-emerald-700/30" : "h-[2px] bg-stone-200"}`}></div>
              <span className={`text-[12px] font-medium ${step >= 1 ? "text-yxane-ink" : "text-stone-400"}`}>Carrito</span>
            </button>

            {/* Step 2 */}
            <button 
              className={`flex-1 flex flex-col items-center gap-2 focus-ring rounded-sm ${step >= 2 ? "cursor-pointer hover:opacity-80" : "cursor-default"}`} 
              onClick={() => step > 2 && setStep(2)}
              disabled={step <= 2}
              aria-label="Ir a Datos"
            >
              <div className={`w-full rounded-full transition-all duration-300 ${step === 2 ? "h-[3.5px] bg-yxane-ink" : step > 2 ? "h-[2px] bg-emerald-700/30" : "h-[2px] bg-stone-200"}`}></div>
              <span className={`text-[12px] font-medium ${step >= 2 ? "text-yxane-ink" : "text-stone-400"}`}>Datos</span>
            </button>

            {/* Step 3 */}
            <button 
              className={`flex-1 flex flex-col items-end gap-2 focus-ring rounded-sm cursor-default`} 
              disabled={true}
              aria-label="Ir a Pago"
            >
              <div className={`w-full rounded-full transition-all duration-300 ${step === 3 ? "h-[3.5px] bg-yxane-ink" : "h-[2px] bg-stone-200"}`}></div>
              <span className={`text-[12px] font-medium ${step >= 3 ? "text-yxane-ink" : "text-stone-400"}`}>Pago</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-6">
              {cart.length === 0 ? (
                <p className="text-center text-stone-500 py-10">Tu carrito está vacío.</p>
              ) : (
                <ul className="space-y-6">
                  {cart.map((item, index) => (
                    <li key={`${item.id}-${index}`} className="flex gap-4 border-b border-stone-200/60 pb-6 last:border-0 last:pb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-20 rounded-lg object-cover border border-stone-200/50"
                      />
                      <div className="flex-1 flex flex-col pt-1">
                        <div className="flex justify-between">
                          <h3 className="font-serif text-[15px] font-bold text-yxane-ink pr-4">{item.name}</h3>
                          <button className="text-stone-400 hover:text-red-500 transition-colors h-fit"><Trash2 size={16} /></button>
                        </div>
                        <p className="text-xs text-stone-500 mb-3">{item.category} • {item.size}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="font-medium text-stone-700">{item.price}</span>
                          <div className="flex items-center gap-3 rounded-full border border-stone-200 px-3 py-1">
                            <button className="text-stone-400 hover:text-yxane-ink cursor-pointer">-</button>
                            <span className="text-sm w-4 text-center">1</span>
                            <button className="text-stone-400 hover:text-yxane-ink cursor-pointer">+</button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step === 2 && (
             <div className="space-y-8 animate-in fade-in duration-300">
               <div>
                  <h3 className="text-[15px] font-medium text-yxane-ink mb-4">Datos personales</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 block">Nombre completo</label>
                      <input type="text" placeholder="Ej. Camila Rojas" className="w-full border-b border-stone-200 bg-transparent py-2 text-[15px] text-yxane-ink placeholder:text-stone-400 focus:border-yxane-ink focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 block">DNI / CE</label>
                      <input type="text" placeholder="Documento de identidad" className="w-full border-b border-stone-200 bg-transparent py-2 text-[15px] text-yxane-ink placeholder:text-stone-400 focus:border-yxane-ink focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 block">WhatsApp</label>
                      <input type="tel" placeholder="+51 999 999 999" className="w-full border-b border-stone-200 bg-transparent py-2 text-[15px] text-yxane-ink placeholder:text-stone-400 focus:border-yxane-ink focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 block">Email</label>
                      <input type="email" placeholder="tucorreo@ejemplo.com" className="w-full border-b border-stone-200 bg-transparent py-2 text-[15px] text-yxane-ink placeholder:text-stone-400 focus:border-yxane-ink focus:outline-none" />
                    </div>
                  </div>
               </div>

               <div>
                  <h3 className="text-[15px] font-medium text-yxane-ink mb-4">Método de pago</h3>
                  <div className="rounded-lg border border-yxane-ink bg-white p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-3 items-center">
                        <CreditCard size={18} className="text-yxane-ink" />
                        <span className="text-[14px] text-yxane-ink font-medium">Tarjeta de crédito / débito</span>
                      </div>
                      <div className="h-4 w-4 rounded-full border-4 border-yxane-ink"></div>
                    </div>
                    
                    <div className="pt-2 border-t border-stone-100 space-y-4">
                       <div>
                         <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1 block">Número de tarjeta</label>
                         <input type="text" placeholder="0000 0000 0000 0000" className="w-full border-b border-stone-200 bg-transparent py-1 text-[14px] text-yxane-ink placeholder:text-stone-300 focus:border-yxane-ink focus:outline-none font-mono" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1 block">Vencimiento</label>
                          <input type="text" placeholder="MM/AA" className="w-full border-b border-stone-200 bg-transparent py-1 text-[14px] text-yxane-ink placeholder:text-stone-300 focus:border-yxane-ink focus:outline-none font-mono" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1 block">CVV</label>
                          <input type="text" placeholder="123" className="w-full border-b border-stone-200 bg-transparent py-1 text-[14px] text-yxane-ink placeholder:text-stone-300 focus:border-yxane-ink focus:outline-none font-mono" />
                        </div>
                       </div>
                    </div>
                  </div>
               </div>
             </div>
          )}

          {step === 3 && (
             <div className="space-y-8 animate-in fade-in duration-300">
               <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-yxane-ink mb-3">Método de entrega</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center justify-center gap-2 rounded-xl border border-yxane-ink bg-white py-4 text-center transition-colors">
                      <MapPin size={22} className="text-yxane-ink" />
                      <span className="text-[13px] font-medium text-yxane-ink">Delivery</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 rounded-xl border border-stone-200 bg-transparent py-4 text-center transition-colors hover:border-yxane-ink/50 text-stone-400">
                      <Store size={22} />
                      <span className="text-[13px] font-medium">Recojo</span>
                    </button>
                  </div>
               </div>

               <div className="space-y-5">
                  <div>
                    <input type="text" placeholder="Dirección de envío" className="w-full border-b border-stone-200 bg-transparent py-2.5 text-[15px] text-yxane-ink placeholder:text-stone-500 focus:border-yxane-ink focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Distrito" className="w-full border-b border-stone-200 bg-transparent py-2.5 text-[15px] text-yxane-ink placeholder:text-stone-500 focus:border-yxane-ink focus:outline-none" />
                    <input type="text" placeholder="Ciudad" className="w-full border-b border-stone-200 bg-transparent py-2.5 text-[15px] text-yxane-ink placeholder:text-stone-500 focus:border-yxane-ink focus:outline-none" />
                  </div>
                  <div>
                    <input type="text" placeholder="Instrucciones especiales (Opcional)" className="w-full border-b border-stone-200 bg-transparent py-2.5 text-[15px] text-yxane-ink placeholder:text-stone-500 focus:border-yxane-ink focus:outline-none" />
                  </div>
               </div>

               <div className="rounded-xl bg-[#f2f1f0] p-5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-4">Resumen del pedido</h4>
                  <ul className="space-y-4 mb-5 border-b border-stone-200/60 pb-5">
                    {cart.map((item, index) => (
                      <li key={`summary-${item.id}-${index}`} className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-200/50">
                          <CheckCircle2 size={16} className="text-stone-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] text-yxane-ink leading-tight pr-4">{item.name}</p>
                          <p className="text-[12px] text-stone-500">1 x {item.size}</p>
                        </div>
                        <span className="text-[13px] text-stone-700">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2 text-[13px] text-stone-500">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>S/ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span>S/ {shipping.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between pt-4 border-t border-stone-200/60">
                    <span className="font-serif text-xl font-bold text-yxane-ink">Total</span>
                    <span className="font-serif text-xl text-yxane-ink">S/ {total.toFixed(2)}</span>
                  </div>
               </div>
             </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-stone-200 bg-[#faf9f8] p-6 pb-8 shrink-0">
            {step === 1 && (
               <>
                 <div className="space-y-3 mb-6 text-[14px]">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal</span>
                      <span>S/ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Envío estimado</span>
                      <span>S/ {shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-stone-200">
                      <span className="font-serif text-xl text-yxane-ink font-bold">Total</span>
                      <span className="font-serif text-xl text-yxane-ink font-bold">S/ {total.toFixed(2)}</span>
                    </div>
                 </div>
                 <Button className="w-full flex items-center justify-center gap-2 py-6 text-[15px]" onClick={() => setStep(2)}>
                   Continuar con datos
                   <ArrowRight size={18} />
                 </Button>
               </>
            )}
            
            {step === 2 && (
               <>
                 <div className="space-y-2 mb-6 text-[14px]">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal</span>
                      <span>S/ {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-3">
                      <span className="text-[16px] text-yxane-ink">Total</span>
                      <span className="font-serif text-xl text-yxane-ink font-bold">S/ {total.toFixed(2)}</span>
                    </div>
                 </div>
                 <div className="flex gap-3">
                   <Button variant="secondary" className="px-5" onClick={() => setStep(1)}>
                     Regresar
                   </Button>
                   <Button className="flex-1 flex items-center justify-center gap-2 py-6 text-[15px]" onClick={() => setStep(3)}>
                     Siguiente paso
                     <ArrowRight size={18} />
                   </Button>
                 </div>
               </>
            )}

            {step === 3 && (
               <div className="flex gap-3">
                 <Button variant="secondary" className="px-5" onClick={() => setStep(2)}>
                   Regresar
                 </Button>
                 <Button className="flex-1 flex items-center justify-center gap-2 py-6 text-[15px]" onClick={() => alert("¡Compra Finalizada!")}>
                   Finalizar compra
                   <CheckCircle2 size={18} />
                 </Button>
               </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
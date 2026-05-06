"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import LeadModal from "./LeadModal";
import type { ModalVariant, TriggerSource } from "../lib/leadCapture";
import { variantForTrigger } from "../lib/leadCapture";

type ModalState = {
  open: boolean;
  variant: ModalVariant;
  leadId: number | null;
  trigger: TriggerSource | null;
};

type ContextValue = {
  open: (args: { trigger: TriggerSource; leadId: number | null }) => void;
  setLeadId: (args: { trigger: TriggerSource; leadId: number }) => void;
  close: () => void;
};

const LeadModalContext = createContext<ContextValue | null>(null);

const CLOSED: ModalState = {
  open: false,
  variant: "early_access",
  leadId: null,
  trigger: null,
};

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState>(CLOSED);

  const open = useCallback<ContextValue["open"]>(({ trigger, leadId }) => {
    setState({
      open: true,
      variant: variantForTrigger(trigger),
      leadId,
      trigger,
    });
  }, []);

  const setLeadId = useCallback<ContextValue["setLeadId"]>(({ trigger, leadId }) => {
    // Only patch in the lead_id if the modal is still open for the same
    // click. If the user already closed it, drop the update on the floor.
    setState((s) => {
      if (!s.open || s.trigger !== trigger) return s;
      return { ...s, leadId };
    });
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  useEffect(() => {
    if (!state.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [state.open, close]);

  const ctx = useMemo<ContextValue>(
    () => ({ open, setLeadId, close }),
    [open, setLeadId, close],
  );

  return (
    <LeadModalContext.Provider value={ctx}>
      {children}
      <LeadModal
        open={state.open}
        variant={state.variant}
        leadId={state.leadId}
        onClose={close}
      />
    </LeadModalContext.Provider>
  );
}

export function useLeadModal(): ContextValue {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used inside LeadModalProvider");
  }
  return ctx;
}

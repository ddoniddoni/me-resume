'use client';

import { type ReactNode, useEffect, useId, useRef } from 'react';

type BaseModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
};

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function BaseModal({
  isOpen,
  title,
  description,
  children,
  onClose,
}: BaseModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.setTimeout(() => {
      dialogRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute('disabled'));

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto overscroll-contain bg-[#10140c]/78 px-4 py-6 backdrop-blur-[2px] sm:items-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className="pixel-modal max-h-[min(760px,calc(100dvh-3rem))] w-full max-w-3xl overflow-y-auto overscroll-contain border-[4px] border-[#3f4b35] bg-[#24331f] p-5 text-[#f6edc8] shadow-[0_0_0_3px_#b99b65,0_0_0_6px_#1d2419,0_16px_0_rgba(19,27,15,0.38)] outline-none focus-visible:shadow-focus sm:p-7"
      >
        <div className="flex items-start justify-between gap-4 border-b-[3px] border-[#9d865c] pb-4">
          <h2
            id={titleId}
            className="text-3xl font-black text-[#fff4c7]"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 shrink-0 items-center justify-center border-[3px] border-[#5f3b22] bg-[#e5b76c] text-xl font-black leading-none text-[#2d1a0f] outline-none transition hover:-translate-y-0.5 hover:bg-[#f0ca7d] focus-visible:shadow-focus motion-reduce:hover:translate-y-0"
            aria-label="모달 닫기"
          >
            ×
          </button>
        </div>
        {description ? (
          <p id={descriptionId} className="sr-only">
            {description}
          </p>
        ) : null}
        <div className="pt-6">{children}</div>
      </div>
    </div>
  );
}

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryAction: () => void;
  onSecondaryAction?: () => void;
  primaryButtonVariant?: 'default' | 'destructive';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  primaryButtonText,
  secondaryButtonText = 'Cancelar',
  onPrimaryAction,
  onSecondaryAction,
  primaryButtonVariant = 'default'
}) => {
  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction();
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        </DialogHeader>
        
        <div className="py-4">
          {children}
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleSecondaryAction}
            className="text-gray-700 cursor-pointer"
          >
            {secondaryButtonText}
          </Button>
          <Button
            variant={primaryButtonVariant}
            onClick={onPrimaryAction}
            className={`text-white cursor-pointer ${primaryButtonVariant === 'default' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}>
            {primaryButtonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal; 
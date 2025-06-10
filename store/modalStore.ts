import {create} from 'zustand';

interface ModalState {
  inquiryOpen: boolean;
  openInquiry: () => void;
  closeInquiry: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  inquiryOpen: false,
  openInquiry: () => set({ inquiryOpen: true }),
  closeInquiry: () => set({ inquiryOpen: false })
}));

export default useModalStore;

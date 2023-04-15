import { create } from 'zustand';

interface IModalStorage {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
}

const useModalInfo = create<IModalStorage>(
  (set) => ({
    movieId: undefined,
    isOpen: false,
    openModal: (movieId: string) =>
      set({ isOpen: true, movieId }),
    closeModal: () =>
      set({ isOpen: false, movieId: undefined }),
  })
);

export default useModalInfo;
